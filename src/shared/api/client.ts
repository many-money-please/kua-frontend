/**
 * API 클라이언트
 * 백엔드 서버와 통신하는 간단한 함수
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Next.js cookies().set() 옵션 타입
 */
type CookieOptions = {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
};

/**
 * Set-Cookie 헤더를 파싱하는 헬퍼 함수
 */
function parseSetCookie(setCookieHeader: string): {
    name: string;
    value: string;
    options?: Record<string, string>;
} | null {
    const parts = setCookieHeader.split(";");
    const [nameValue] = parts;
    const [name, value] = nameValue.split("=").map((s) => s.trim());

    if (!name || !value) return null;

    const options: Record<string, string> = {};
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i].trim();
        const [key, val] = part.split("=").map((s) => s.trim());
        if (key) {
            options[key.toLowerCase()] = val || "true";
        }
    }

    return { name, value, options };
}

/**
 * 백엔드 API로 요청을 보내는 함수
 * @param endpoint API 엔드포인트
 * @param options fetch 옵션
 * @param cookieStore Next.js cookies() 객체 (서버 사이드에서 Set-Cookie 저장용)
 */
export async function apiClient<T = unknown>(
    endpoint: string,
    options: RequestInit = {},
    cookieStore?: {
        set: (name: string, value: string, options?: CookieOptions) => void;
    },
): Promise<T> {
    // 요청 URL 구성
    const url = endpoint.startsWith("http")
        ? endpoint
        : `${API_URL}${endpoint}`;

    // 헤더 설정
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // 응답 본문 확인
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");

        // 한글 인코딩 문제 해결: ArrayBuffer로 받아서 여러 인코딩 시도
        const arrayBuffer = await response.arrayBuffer();
        let text = "";

        // UTF-8로 먼저 시도
        try {
            const decoder = new TextDecoder("utf-8");
            text = decoder.decode(arrayBuffer);

            // 한글이 깨진 경우 다른 인코딩 시도
            if (text.includes("ì") || text.includes("ë")) {
                // EUC-KR 시도 (한국 서버에서 자주 사용)
                try {
                    const euckrDecoder = new TextDecoder("euc-kr");
                    text = euckrDecoder.decode(arrayBuffer);
                } catch {
                    // UTF-8 유지
                }
            }
        } catch {
            // 기본적으로 UTF-8 사용
            const decoder = new TextDecoder("utf-8");
            text = decoder.decode(arrayBuffer);
        }

        const hasBody = text.trim().length > 0;

        // 디버깅: 인코딩 문제 확인
        if (typeof window === "undefined" && hasBody) {
            console.log(
                "[API Client] Response text (first 100 chars):",
                text.substring(0, 100),
            );
            console.log("[API Client] Content-Type:", contentType);
        }

        // Set-Cookie 헤더 처리 (서버 사이드에서만)
        if (cookieStore && typeof window === "undefined") {
            // Node.js 18+ getSetCookie() 또는 폴백
            let setCookieHeaders: string[] = [];
            if (typeof response.headers.getSetCookie === "function") {
                setCookieHeaders = response.headers.getSetCookie();
            } else {
                // 폴백: set-cookie 헤더 직접 읽기
                const setCookieHeader = response.headers.get("set-cookie");
                if (setCookieHeader) {
                    setCookieHeaders = [setCookieHeader];
                }
            }

            for (const setCookieHeader of setCookieHeaders) {
                const parsed = parseSetCookie(setCookieHeader);
                if (parsed) {
                    // Next.js cookies().set() 형식으로 변환
                    const cookieOptions: CookieOptions = {};
                    if (parsed.options) {
                        if (parsed.options["max-age"]) {
                            cookieOptions.maxAge = parseInt(
                                parsed.options["max-age"],
                            );
                        }
                        if (parsed.options.expires) {
                            cookieOptions.expires = new Date(
                                parsed.options.expires,
                            );
                        }
                        if (parsed.options.path) {
                            cookieOptions.path = parsed.options.path;
                        }
                        if (parsed.options.domain) {
                            cookieOptions.domain = parsed.options.domain;
                        }
                        if (parsed.options.secure === "true") {
                            cookieOptions.secure = true;
                        }
                        if (parsed.options.httponly === "true") {
                            cookieOptions.httpOnly = true;
                        }
                        if (parsed.options.samesite) {
                            cookieOptions.sameSite =
                                parsed.options.samesite.toLowerCase() as
                                    | "strict"
                                    | "lax"
                                    | "none";
                        }
                    }
                    cookieStore.set(parsed.name, parsed.value, cookieOptions);
                }
            }
        }

        // 에러 응답 처리
        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

            if (hasBody && hasJsonContent) {
                try {
                    const error = JSON.parse(text);
                    errorMessage = error.message || error.error || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
            } else if (hasBody) {
                errorMessage = text;
            }

            throw new Error(errorMessage);
        }

        // 빈 응답 처리
        if (!hasBody) {
            return {} as T;
        }

        // JSON 파싱
        if (!hasJsonContent) {
            throw new Error(
                `예상치 못한 응답 형식: ${contentType || "unknown"}`,
            );
        }

        try {
            const data = JSON.parse(text);
            return data as T;
        } catch (parseError) {
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
}

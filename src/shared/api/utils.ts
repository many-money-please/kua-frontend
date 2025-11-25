/**
 * API 관련 공통 유틸리티 함수
 */

/**
 * ArrayBuffer를 텍스트로 디코딩 (한글 인코딩 문제 해결)
 * UTF-8 → EUC-KR → Latin1 순서로 시도
 */
export function decodeResponseText(arrayBuffer: ArrayBuffer): string {
    try {
        return new TextDecoder("utf-8").decode(arrayBuffer);
    } catch {
        try {
            return new TextDecoder("euc-kr").decode(arrayBuffer);
        } catch {
            return new TextDecoder("latin1").decode(arrayBuffer);
        }
    }
}

/**
 * 쿠키 문자열에서 특정 쿠키 값 추출
 */
export function extractCookieValue(
    cookieString: string,
    cookieName: string,
): string | null {
    if (!cookieString) return null;

    const cookies = cookieString.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name?.trim() === cookieName && value) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

/**
 * Set-Cookie 헤더에서 쿠키 name=value 추출
 */
export function extractCookieFromSetCookie(
    setCookieHeader: string,
): string | null {
    const parts = setCookieHeader.split(";");
    return parts[0]?.trim() || null;
}

/**
 * Set-Cookie 헤더 배열에서 특정 쿠키 값 추출
 */
export function extractTokenFromSetCookies(
    setCookieHeaders: string[],
    cookieName: string,
): string | null {
    for (const setCookieHeader of setCookieHeaders) {
        const cookiePair = extractCookieFromSetCookie(setCookieHeader);
        if (cookiePair?.startsWith(`${cookieName}=`)) {
            return cookiePair.split("=")[1];
        }
    }
    return null;
}

/**
 * 백엔드 에러 응답 파싱
 */
export function parseErrorResponse(
    text: string,
    hasJsonContent: boolean | undefined,
    status: number,
    statusText: string,
): string {
    let errorMessage = `HTTP ${status}: ${statusText}`;
    if (text && hasJsonContent) {
        try {
            const error = JSON.parse(text);
            errorMessage = error.message || error.error || errorMessage;
        } catch {
            errorMessage = text || errorMessage;
        }
    } else if (text) {
        errorMessage = text;
    }
    return errorMessage;
}

/**
 * Route Handler에서 백엔드 API 호출 시 사용하는 헬퍼 함수
 * 쿠키에서 access_token을 자동으로 추출하여 Authorization 헤더에 추가
 *
 * @param endpoint 백엔드 API 엔드포인트
 * @param request NextRequest 객체 (쿠키 추출용)
 * @param options 추가 fetch 옵션
 * @returns 백엔드 응답
 */
export async function fetchWithAuth(
    endpoint: string,
    request: { headers: { get: (name: string) => string | null } },
    options: RequestInit = {},
): Promise<Response> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const url = endpoint.startsWith("http")
        ? endpoint
        : `${API_URL}${endpoint}`;

    // 쿠키에서 access_token 추출
    const cookieString = request.headers.get("cookie") || "";
    const accessToken = extractCookieValue(cookieString, "access_token");

    // 헤더 설정 (Authorization 헤더 자동 추가)
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    // access_token이 있으면 Authorization 헤더에 추가
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    return fetch(url, {
        ...options,
        headers,
    });
}

/**
 * API 관련 공통 유틸리티 함수
 */

import { NextResponse } from "next/server";

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
 * 403 에러 발생 시 토큰 갱신 시도
 * /api/auth/me를 호출하여 새 토큰을 받아옴
 * 백엔드가 매 요청마다 새 토큰을 Set-Cookie로 보내므로, 이 요청으로 새 토큰을 받을 수 있음
 */
async function tryRefreshToken(request: {
    headers: { get: (name: string) => string | null };
}): Promise<{ success: boolean; newToken?: string }> {
    try {
        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        if (!accessToken) {
            return { success: false }; // 토큰이 없으면 갱신 불가
        }

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const refreshResponse = await fetch(`${API_URL}/api/v1/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (refreshResponse.ok) {
            // Set-Cookie에서 새 토큰 추출
            const setCookieHeaders =
                refreshResponse.headers.getSetCookie?.() || [];
            const newToken = extractTokenFromSetCookies(
                setCookieHeaders,
                "access_token",
            );
            return { success: true, newToken: newToken || undefined };
        }

        return { success: false };
    } catch {
        return { success: false };
    }
}

/**
 * 백엔드 응답의 Set-Cookie 헤더를 NextResponse에 전달
 */
export function forwardSetCookies(
    backendResponse: Response,
    nextResponse: NextResponse,
): void {
    const setCookieHeaders = backendResponse.headers.getSetCookie?.() || [];
    for (const setCookieHeader of setCookieHeaders) {
        nextResponse.headers.append("Set-Cookie", setCookieHeader);
    }
}

/**
 * Route Handler에서 백엔드 API 호출 시 사용하는 헬퍼 함수
 * 쿠키에서 access_token을 자동으로 추출하여 Authorization 헤더에 추가
 * 403 에러 발생 시 토큰 갱신을 시도하고 재요청
 *
 * @param endpoint 백엔드 API 엔드포인트
 * @param request NextRequest 객체 (쿠키 추출용)
 * @param options 추가 fetch 옵션
 * @param retryCount 재시도 횟수 (기본값: 0, 최대 1회만 재시도)
 * @returns 백엔드 응답
 */
export async function fetchWithAuth(
    endpoint: string,
    request: { headers: { get: (name: string) => string | null } },
    options: RequestInit = {},
    retryCount: number = 0,
): Promise<Response> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const url = endpoint.startsWith("http")
        ? endpoint
        : `${API_URL}${endpoint}`;

    // 쿠키에서 access_token 추출
    const cookieString = request.headers.get("cookie") || "";
    const accessToken = extractCookieValue(cookieString, "access_token");

    // 헤더 설정 (Authorization 헤더 자동 추가)
    // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 multipart/form-data 설정)
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    // FormData가 아닌 경우에만 Content-Type 설정
    if (!isFormData && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    // access_token이 있으면 Authorization 헤더에 추가
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // 403 에러이고 아직 재시도하지 않았으면 토큰 갱신 시도
    if (response.status === 403 && retryCount === 0) {
        const refreshResult = await tryRefreshToken(request);
        if (refreshResult.success) {
            // 토큰 갱신 성공 시 재요청
            // 쿠키가 갱신되었으므로 브라우저가 새 쿠키를 보냄
            return fetchWithAuth(endpoint, request, options, 1);
        }
    }

    return response;
}

/**
 * FormData에서 request 필드를 파싱하여 JSON 객체로 변환
 */
export async function parseFormDataRequest<T = Record<string, unknown>>(
    formData: FormData,
): Promise<{ body: T; files: File[] }> {
    const requestField = formData.get("request");

    if (!requestField) {
        throw new Error("요청 데이터가 필요합니다.");
    }

    const requestJson =
        typeof requestField === "string"
            ? requestField
            : await requestField.text();

    let body;
    try {
        body = JSON.parse(requestJson);
    } catch {
        throw new Error("요청 본문을 파싱할 수 없습니다.");
    }

    const files = formData.getAll("files") as File[];

    return { body, files };
}

/**
 * 게시글 필수 필드 검증
 */
export function validatePostFields(body: {
    title?: string;
    content?: string;
}): { isValid: boolean; error?: string } {
    if (!body.title || !body.content) {
        return {
            isValid: false,
            error: "제목과 내용은 필수입니다.",
        };
    }

    if (body.title.length > 200) {
        return {
            isValid: false,
            error: "제목은 200자를 초과할 수 없습니다.",
        };
    }

    return { isValid: true };
}

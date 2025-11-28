/**
 * 클라이언트 사이드에서 사용하는 fetch 래퍼
 * 403/401 에러 발생 시 토큰 갱신 시도 후 로그인 페이지로 리다이렉트
 */

/**
 * 403/401 에러 발생 시 토큰 갱신 시도
 */
async function tryRefreshTokenClient(): Promise<boolean> {
    try {
        // /api/auth/me를 호출하여 토큰 갱신 시도
        // 백엔드가 매 요청마다 새 토큰을 Set-Cookie로 보내므로, 이 요청으로 새 토큰을 받을 수 있음
        const response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
        });

        return response.ok;
    } catch {
        return false;
    }
}

/**
 * 클라이언트 사이드에서 사용하는 fetch 래퍼
 * 403/401 에러 발생 시 자동으로 토큰 갱신 시도 후 로그인 페이지로 리다이렉트
 */
export async function clientFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
): Promise<Response> {
    const response = await fetch(input, {
        ...init,
        credentials: "include", // 쿠키 포함
    });

    // 403 또는 401 에러 발생 시 처리
    if (response.status === 403 || response.status === 401) {
        // 토큰 갱신 시도
        const refreshed = await tryRefreshTokenClient();

        if (refreshed) {
            // 토큰 갱신 성공 시 원래 요청 재시도
            return fetch(input, {
                ...init,
                credentials: "include",
            });
        } else {
            // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
            if (typeof window !== "undefined") {
                // 현재 경로를 저장하여 로그인 후 돌아올 수 있도록
                const currentPath = window.location.pathname;
                const searchParams = window.location.search;
                const returnUrl = encodeURIComponent(
                    `${currentPath}${searchParams}`,
                );
                window.location.href = `/auth/login?returnUrl=${returnUrl}`;
            }
            // 리다이렉트 중이므로 응답 반환하지 않음 (하지만 타입을 위해 반환)
            return response;
        }
    }

    return response;
}

/**
 * API 엔드포인트 상수
 * 로그인과 회원가입만 사용
 */

export const API_ENDPOINTS = {
    auth: {
        login: "/api/v1/auth/login",
        register: "/api/v1/auth/register",
        me: "/api/v1/auth/me",
    },
    notice: {
        list: "/api/notices",
    },
} as const;

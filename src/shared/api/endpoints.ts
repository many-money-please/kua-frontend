/**
 * API 엔드포인트 상수
 */

export const API_ENDPOINTS = {
    auth: {
        login: "/api/v1/auth/login",
        register: "/api/v1/auth/register",
        me: "/api/v1/auth/me",
        logout: "/api/v1/auth/logout",
    },
    notice: {
        list: "/api/notices",
        detail: (id: number) => `/api/notices/${id}`,
        create: "/api/notices",
        delete: (id: number) => `/api/notices/${id}`,
    },
} as const;

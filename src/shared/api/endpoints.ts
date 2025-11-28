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
    category: {
        list: "/api/v1/categories",
        detail: (id: number) => `/api/v1/categories/${id}`,
        byBoardName: (boardName: string) =>
            `/api/v1/categories/board/${encodeURIComponent(boardName)}`,
        create: "/api/v1/categories",
        update: (id: number) => `/api/v1/categories/${id}`,
        delete: (id: number) => `/api/v1/categories/${id}`,
    },
    board: {
        list: "/api/boards",
        detail: (id: number) => `/api/boards/${id}`,
        create: "/api/boards",
        update: (id: number) => `/api/boards/${id}`,
        delete: (id: number) => `/api/boards/${id}`,
    },
} as const;

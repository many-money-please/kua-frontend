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
    popup: {
        // 관리자용 팝업 목록 조회 (관리 페이지에서 사용)
        list: "/api/popups/admin",
        // 특정 팝업 상세 조회
        detail: (id: string) => `/api/popups/${id}`,
        // 팝업 생성
        create: "/api/popups",
        // 팝업 수정
        update: (id: string) => `/api/popups/${id}`,
        // 팝업 삭제
        delete: (id: string) => `/api/popups/${id}`,
        // 팝업 노출 상태 토글 (PATCH 사용)
        toggle: (id: string) => `/api/popups/${id}/toggle`,
        // 활성 팝업 목록 조회 (현재 노출 중인 팝업)
        active: "/api/popups/active",
        // 표시용 팝업 목록 조회 (사용자 화면에 표시할 팝업)
        display: "/api/popups/display",
    },
} as const;

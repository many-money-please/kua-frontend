/**
 * API 타입 정의
 */

// 공통 사용자 프로필
export type UserProfile = {
    loginId: string;
    name: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    role: "USER" | "ADMIN";
};

// 로그인 요청/응답
export type LoginRequest = {
    loginId: string;
    password: string;
};

export type LoginResponse = {
    success: boolean;
    message?: string;
    data?: UserProfile;
};

// 회원가입 요청/응답
export type RegisterRequest = {
    loginId: string;
    name: string;
    password: string;
    phoneNumber: string;
    birthDate: string; // "YYYY-MM-DD" 형식
    email: string;
};

export type RegisterResponse = {
    success: boolean;
    message: string;
    data: UserProfile;
};

export type MeResponse = {
    success: boolean;
    message: string;
    data: UserProfile;
};

// 공지사항 관련 타입
export type Notice = {
    id: number;
    title: string;
    createdAt: string; // ISO 8601 형식: "2025-11-14T15:28:54"
    hit: number;
    hasFile: boolean;
    isNotice: boolean;
    isSecret: boolean;
};

// 페이지네이션 정보
export type Pagination = {
    totalCount: number;
    page: number;
    size: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

// 공지사항 목록 응답
export type NoticeListResponse = {
    notices: Notice[];
} & Pagination;

// 팝업 관련 타입 (백엔드 응답 형식)
export type Popup = {
    id: number;
    title: string;
    content: string;
    linkUrl: string;
    imagePath: string;
    imageFileName: string;
    startDate: string; // ISO 8601 형식: "2025-11-28T01:27:10.239Z"
    endDate: string; // ISO 8601 형식: "2025-11-28T01:27:10.239Z"
    isActive: boolean; // 노출 여부 (기존 isExposed)
    sortOrder: number; // 순서 (기존 order)
    isDisplayable: boolean; // 표시 가능 여부
    createdAt: string; // ISO 8601 형식
    updatedAt: string; // ISO 8601 형식
};

// 팝업 목록 응답 (GET /api/popups/admin는 배열을 직접 반환)
export type PopupListResponse = Popup[];

// 팝업 생성/수정 요청
export type PopupRequest = {
    title: string;
    content?: string;
    linkUrl?: string;
    imagePath?: string;
    imageFileName?: string;
    startDate: string; // ISO 8601 형식 또는 "YYYY-MM-DD"
    endDate: string; // ISO 8601 형식 또는 "YYYY-MM-DD"
    isActive: boolean;
    sortOrder?: number;
    isDisplayable?: boolean;
};

// 팝업 생성/수정 응답
export type PopupResponse = Popup;

// 팝업 순서 변경 요청
export type PopupReorderRequest = {
    popupIds: number[]; // 순서대로 정렬된 팝업 ID 배열
};
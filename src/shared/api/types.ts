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

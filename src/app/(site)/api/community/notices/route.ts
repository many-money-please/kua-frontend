import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    fetchWithAuth,
    parseErrorResponse,
} from "@/shared/api/utils";
import type { NoticeListResponse } from "@/shared/api/types";

/**
 * GET /api/community/notices - 공지사항 목록 조회
 *
 * 쿼리 파라미터:
 * - page: 페이지 번호 (기본값: 1)
 * - size: 페이지 크기 (기본값: 15)
 */
export async function GET(request: NextRequest) {
    try {
        // 1. 쿼리 파라미터 처리
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";
        const size = searchParams.get("size") || "15";

        // 2. 백엔드 API 호출 (인증 필요 - fetchWithAuth 사용)
        const response = await fetchWithAuth(
            `${API_ENDPOINTS.notice.list}?page=${page}&size=${size}`,
            request,
            {
                method: "GET",
            },
        );

        // 3. 응답 본문 읽기
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        // 4. 에러 처리
        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );
            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        // 5. 성공 응답 반환
        const data = hasJsonContent && text ? JSON.parse(text) : {};
        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "공지사항 목록을 가져오지 못했습니다.",
            },
            { status: 500 },
        );
    }
}

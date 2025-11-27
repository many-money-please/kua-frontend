import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    fetchWithAuth,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * 현재 로그인한 사용자 정보를 가져오는 Route Handler
 *
 * 역할:
 * 1. 브라우저 쿠키에서 access_token 자동 추출 및 Authorization 헤더 추가
 * 2. 백엔드에 요청 전달
 * 3. 사용자 정보 반환
 */
export async function GET(request: NextRequest) {
    try {
        // 1. fetchWithAuth를 사용하여 자동으로 Authorization 헤더 추가
        // fetchWithAuth 내부에서 쿠키에서 access_token을 추출하므로 별도 확인 불필요
        const response = await fetchWithAuth(API_ENDPOINTS.auth.me, request, {
            method: "GET",
        });

        // 2. 응답 본문 읽기 (한글 인코딩 처리)
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        // 3. 에러 응답 처리
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

        // 4. 성공 응답 반환
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
                        : "사용자 정보를 가져오지 못했습니다.",
            },
            { status: 500 },
        );
    }
}

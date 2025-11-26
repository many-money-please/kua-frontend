import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    fetchWithAuth,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * 로그아웃 Route Handler
 *
 * 역할:
 * 1. 브라우저 쿠키에서 access_token 자동 추출 및 Authorization 헤더 추가
 * 2. 백엔드에 로그아웃 요청 전달
 * 3. 쿠키 삭제 처리
 */
export async function POST(request: NextRequest) {
    try {
        // 1. fetchWithAuth를 사용하여 자동으로 Authorization 헤더 추가
        // fetchWithAuth 내부에서 쿠키에서 access_token을 추출하므로 별도 확인 불필요
        const response = await fetchWithAuth(
            API_ENDPOINTS.auth.logout,
            request,
            {
                method: "POST",
            },
        );

        // 3. 응답 본문 읽기 (한글 인코딩 처리)
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        // 4. 에러 응답 처리
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
        const nextResponse = NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        // 6. 백엔드에서 받은 Set-Cookie 헤더를 브라우저에 전달 (쿠키 삭제용)
        const setCookieHeaders = response.headers.getSetCookie?.() || [];
        for (const setCookieHeader of setCookieHeaders) {
            nextResponse.headers.append("Set-Cookie", setCookieHeader);
        }

        // 7. 클라이언트 측 쿠키 명시적으로 삭제 (백엔드 응답과 관계없이 항상 삭제)
        // 만료일을 과거로 설정하여 쿠키 삭제
        nextResponse.cookies.set("access_token", "", {
            expires: new Date(0), // 1970-01-01로 설정하여 즉시 만료
            path: "/",
        });

        return nextResponse;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "로그아웃에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

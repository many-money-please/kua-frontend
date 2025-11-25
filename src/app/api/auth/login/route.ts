import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type { LoginRequest } from "@/shared/api/types";
import {
    decodeResponseText,
    extractTokenFromSetCookies,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * 로그인 Route Handler
 *
 * 역할:
 * 1. 백엔드로 로그인 요청 전달
 * 2. Set-Cookie 헤더를 브라우저에 전달하여 쿠키 저장
 * 3. 로그인 성공 후 사용자 정보 조회하여 함께 반환
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginRequest;

        // 1. 백엔드로 로그인 요청
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.auth.login}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
        );

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

        // 4. 로그인 데이터 파싱
        const loginData = hasJsonContent && text ? JSON.parse(text) : {};

        // 5. Set-Cookie 헤더를 브라우저에 전달하기 위한 응답 생성
        const nextResponse = NextResponse.json(
            { success: true, data: loginData },
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            },
        );

        // 6. 백엔드에서 받은 Set-Cookie 헤더를 브라우저에 전달
        const setCookieHeaders = response.headers.getSetCookie?.() || [];
        for (const setCookieHeader of setCookieHeaders) {
            nextResponse.headers.append("Set-Cookie", setCookieHeader);
        }

        // 7. 로그인 성공 후 사용자 정보 조회
        // 백엔드는 Authorization 헤더에서만 토큰을 읽으므로, 쿠키의 토큰을 헤더로 변환
        if (setCookieHeaders.length > 0) {
            try {
                const accessToken = extractTokenFromSetCookies(
                    setCookieHeaders,
                    "access_token",
                );

                if (accessToken) {
                    const meResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.auth.me}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );

                    if (meResponse.ok) {
                        const meArrayBuffer = await meResponse.arrayBuffer();
                        const meText = decodeResponseText(meArrayBuffer);

                        let meData;
                        try {
                            meData = JSON.parse(meText);
                        } catch {
                            meData = {};
                        }

                        // 사용자 정보를 로그인 응답에 포함
                        return NextResponse.json(
                            {
                                success: true,
                                data: {
                                    ...loginData,
                                    user: meData.data,
                                },
                            },
                            {
                                headers: nextResponse.headers,
                            },
                        );
                    }
                }
            } catch {
                // 사용자 정보 조회 실패해도 로그인은 성공한 것으로 처리
            }
        }

        return nextResponse;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "로그인에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    fetchWithAuth,
    forwardSetCookies,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * GET /api/categories - 카테고리 목록 조회
 * POST /api/categories - 카테고리 생성
 */
export async function GET(request: NextRequest) {
    try {
        const response = await fetchWithAuth(
            API_ENDPOINTS.category.list,
            request,
            {
                method: "GET",
            },
        );

        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            if (response.status === 403 || response.status === 401) {
                const errorResponse = NextResponse.json(
                    {
                        success: false,
                        error: errorMessage,
                        requiresAuth: true,
                    },
                    {
                        status: response.status,
                        headers: {
                            "X-Requires-Auth": "true",
                        },
                    },
                );
                forwardSetCookies(response, errorResponse);
                return errorResponse;
            }

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        const data = hasJsonContent && text ? JSON.parse(text) : [];
        const nextResponse = NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        forwardSetCookies(response, nextResponse);
        return nextResponse;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "카테고리 목록을 가져오는데 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetchWithAuth(
            API_ENDPOINTS.category.create,
            request,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
        );

        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            if (response.status === 403 || response.status === 401) {
                const errorResponse = NextResponse.json(
                    {
                        success: false,
                        error: errorMessage,
                        requiresAuth: true,
                    },
                    {
                        status: response.status,
                        headers: {
                            "X-Requires-Auth": "true",
                        },
                    },
                );
                forwardSetCookies(response, errorResponse);
                return errorResponse;
            }

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        const data = hasJsonContent && text ? JSON.parse(text) : {};
        const nextResponse = NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        forwardSetCookies(response, nextResponse);
        return nextResponse;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "카테고리 생성에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

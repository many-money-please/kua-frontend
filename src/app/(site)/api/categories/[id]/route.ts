import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    fetchWithAuth,
    forwardSetCookies,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * GET /api/categories/[id] - 카테고리 상세 조회
 * PUT /api/categories/[id] - 카테고리 수정
 * DELETE /api/categories/[id] - 카테고리 삭제
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 카테고리 ID입니다." },
                { status: 400 },
            );
        }

        const response = await fetchWithAuth(
            API_ENDPOINTS.category.detail(Number(id)),
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
                        : "카테고리 조회에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 카테고리 ID입니다." },
                { status: 400 },
            );
        }

        const body = await request.json();

        const response = await fetchWithAuth(
            API_ENDPOINTS.category.update(Number(id)),
            request,
            {
                method: "PUT",
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
                        : "카테고리 수정에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 카테고리 ID입니다." },
                { status: 400 },
            );
        }

        const response = await fetchWithAuth(
            API_ENDPOINTS.category.delete(Number(id)),
            request,
            {
                method: "DELETE",
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
                        : "카테고리 삭제에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

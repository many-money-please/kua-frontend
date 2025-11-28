import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    extractCookieValue,
    parseErrorResponse,
} from "@/shared/api/utils";
import type { PopupRequest } from "@/shared/api/types";

/**
 * GET /api/admin/main/popup/[id] - 팝업 상세 조회
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const endpoint = API_ENDPOINTS.popup.detail(id);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${endpoint}`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers,
        });

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

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
        } catch (parseError) {
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }

        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("[팝업 상세 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "팝업 정보를 가져오지 못했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * PUT /api/admin/main/popup/[id] - 팝업 수정
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const body: PopupRequest = await request.json();

        if (!body.title || !body.startDate || !body.endDate) {
            return NextResponse.json(
                {
                    success: false,
                    error: "제목, 시작일, 종료일은 필수입니다.",
                },
                { status: 400 },
            );
        }

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${API_ENDPOINTS.popup.update(id)}`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        });

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

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
        } catch (parseError) {
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }

        revalidatePath("/admin/main/popup");

        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("[팝업 수정 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "팝업 수정에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * DELETE /api/admin/main/popup/[id] - 팝업 삭제
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const endpoint = API_ENDPOINTS.popup.delete(id);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${endpoint}`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

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

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
        } catch (parseError) {
            // 삭제 성공 시 빈 응답도 가능
            data = { success: true };
        }

        revalidatePath("/admin/main/popup");

        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("[팝업 삭제 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "팝업 삭제에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}


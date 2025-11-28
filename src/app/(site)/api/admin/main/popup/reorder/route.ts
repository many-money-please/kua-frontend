import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    extractCookieValue,
    parseErrorResponse,
} from "@/shared/api/utils";
import type { PopupReorderRequest } from "@/shared/api/types";

/**
 * POST /api/admin/main/popup/reorder - 팝업 순서 변경
 *
 * Request body: JSON
 * - popupIds: string[] (순서대로 정렬된 팝업 ID 배열)
 */
export async function POST(request: NextRequest) {
    try {
        const body: PopupReorderRequest = await request.json();

        if (!body.popupIds || !Array.isArray(body.popupIds)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "popupIds 배열이 필요합니다.",
                },
                { status: 400 },
            );
        }

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${API_ENDPOINTS.popup.reorder}`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        console.log("[팝업 순서 변경 API] 요청 URL:", url);
        console.log("[팝업 순서 변경 API] 요청 본문:", body);

        const response = await fetch(url, {
            method: "POST",
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
            data = hasJsonContent && text ? JSON.parse(text) : { success: true };
        } catch (parseError) {
            // 성공 시 빈 응답도 가능
            data = { success: true };
        }

        revalidatePath("/admin/main/popup");

        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("[팝업 순서 변경 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "팝업 순서 변경에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}


import { NextRequest, NextResponse } from "next/server";
import {
    decodeResponseText,
    extractCookieValue,
    forwardSetCookies,
    parseErrorResponse,
} from "@/shared/api/utils";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

/**
 * POST /api/gallery-posts/images - 포토갤러리 이미지 업로드
 *
 * Request body: multipart/form-data
 * - file: File (이미지 파일)
 *
 * Response:
 * {
 *   "id": 1,
 *   "fileName": "대회현장1.jpg",
 *   "filePath": "gallery/2025/11/14/대회현장1.jpg"
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "파일이 필요합니다." },
                { status: 400 },
            );
        }

        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${API_ENDPOINTS.gallery.uploadImage}`;

        const headers: Record<string, string> = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: uploadFormData,
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
                        : "이미지 업로드에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

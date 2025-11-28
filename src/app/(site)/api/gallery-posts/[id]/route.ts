import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    fetchWithAuth,
    forwardSetCookies,
    parseErrorResponse,
    parseFormDataRequest,
    validatePostFields,
} from "@/shared/api/utils";

/**
 * GET /api/gallery-posts/[id] - 포토갤러리 상세 조회
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 포토갤러리 ID입니다." },
                { status: 400 },
            );
        }

        const response = await fetchWithAuth(
            API_ENDPOINTS.gallery.detail(Number(id)),
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
                        : "포토갤러리 조회에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * PUT /api/gallery-posts/[id] - 포토갤러리 수정
 *
 * Request body: application/json
 * {
 *   "title": "string",
 *   "content": "string",
 *   "isTopFixed": 0,
 *   "isShow": 1,
 *   "addGalleryIds": [4, 5],
 *   "deleteGalleryIds": [1, 2]
 * }
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 포토갤러리 ID입니다." },
                { status: 400 },
            );
        }

        const formData = await request.formData();

        let body: {
            title: string;
            content: string;
            isTopFixed?: number;
            isShow?: number;
            addGalleryIds?: number[];
            deleteGalleryIds?: number[];
        };
        let files: File[];
        try {
            const parsed = await parseFormDataRequest<typeof body>(formData);
            body = parsed.body;
            files = parsed.files;
        } catch (error) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "요청 데이터 처리에 실패했습니다.",
                },
                { status: 400 },
            );
        }

        // 필수 필드 검증
        const validation = validatePostFields(body);
        if (!validation.isValid) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 },
            );
        }

        console.log("[포토갤러리 PUT API] 요청 데이터:", {
            id,
            body,
            filesCount: files.length,
        });

        const endpoint = API_ENDPOINTS.gallery.update(Number(id));

        const backendFormData = new FormData();
        backendFormData.append(
            "request",
            new Blob([JSON.stringify(body)], { type: "application/json" }),
        );
        for (const file of files) {
            backendFormData.append("files", file);
        }

        const response = await fetchWithAuth(endpoint, request, {
            method: "PUT",
            body: backendFormData,
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

        const data = hasJsonContent && text ? JSON.parse(text) : {};

        revalidatePath("/community/photo-gallery");
        revalidatePath(`/community/photo-gallery/${id}`);

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
                        : "포토갤러리 수정에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * DELETE /api/gallery-posts/[id] - 포토갤러리 삭제
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 포토갤러리 ID입니다." },
                { status: 400 },
            );
        }

        const response = await fetchWithAuth(
            API_ENDPOINTS.gallery.delete(Number(id)),
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

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        const data = hasJsonContent && text ? JSON.parse(text) : {};
        revalidatePath("/community/photo-gallery");

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
                        : "포토갤러리 삭제에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

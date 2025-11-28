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
 * GET /api/gallery-posts - 포토갤러리 목록 조회
 *
 * 쿼리 파라미터:
 * - page: 페이지 번호 (기본값: 1)
 * - title: 검색어 (제목으로 검색, 선택사항)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";
        const title = searchParams.get("title");

        let endpoint = `${API_ENDPOINTS.gallery.list}?page=${page}`;
        if (title && title.trim()) {
            endpoint += `&title=${encodeURIComponent(title.trim())}`;
        }

        const response = await fetchWithAuth(endpoint, request, {
            method: "GET",
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
                        : "포토갤러리 목록을 가져오는데 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * POST /api/gallery-posts - 포토갤러리 생성
 *
 * Request body: application/json
 * {
 *   "title": "string",
 *   "content": "string",
 *   "isTopFixed": 0,
 *   "isShow": 1,
 *   "galleryIds": [1, 2, 3]
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        let body: {
            title: string;
            content: string;
            isTopFixed?: number;
            isShow?: number;
            galleryIds?: number[];
        };
        let files: File[];
        try {
            const parsed = await parseFormDataRequest<
                typeof body & { galleryIds?: number[] }
            >(formData);
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
        const backendFormData = new FormData();
        backendFormData.append(
            "request",
            new Blob([JSON.stringify(body)], { type: "application/json" }),
        );
        for (const file of files) {
            backendFormData.append("files", file);
        }

        const response = await fetchWithAuth(
            API_ENDPOINTS.gallery.create,
            request,
            {
                method: "POST",
                body: backendFormData,
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
                        : "포토갤러리 생성에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

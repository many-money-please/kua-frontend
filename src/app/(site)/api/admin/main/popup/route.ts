import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    extractCookieValue,
    fetchWithAuth,
    parseErrorResponse,
} from "@/shared/api/utils";
import type { PopupReorderRequest } from "@/shared/api/types";

/**
 * GET /api/admin/main/popup - 팝업 목록 조회
 *
 * 쿼리 파라미터:
 * - title: 검색어 (제목으로 검색, 선택사항)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get("title");

        let endpoint = API_ENDPOINTS.popup.list;
        if (title && title.trim()) {
            endpoint += `?title=${encodeURIComponent(title.trim())}`;
        }

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const backendUrl = `${API_URL}${endpoint}`;

        console.log("[팝업 API] 백엔드 요청 URL:", backendUrl);
        console.log("[팝업 API] 엔드포인트:", endpoint);

        const response = await fetchWithAuth(endpoint, request, {
            method: "GET",
        });

        console.log(
            "[팝업 API] 응답 상태:",
            response.status,
            response.statusText,
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

            console.error("[팝업 API] 에러 발생:", {
                status: response.status,
                statusText: response.statusText,
                errorMessage,
            });

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
        } catch (parseError) {
            console.error("[팝업 API] JSON 파싱 실패:", parseError);
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
        console.error("[팝업 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "팝업 목록을 가져오지 못했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * POST /api/admin/main/popup - 팝업 생성
 *
 * Request body: multipart/form-data
 * - request: JSON string (필수)
 *   {
 *     "title": "string",
 *     "content": "string",
 *     "linkUrl": "string",
 *     "startDate": "2025-11-28T02:30:35.767Z",
 *     "endDate": "2025-11-28T02:30:35.767Z",
 *     "sortOrder": 0
 *   }
 * - image: File (선택, 이미지 파일)
 */
export async function POST(request: NextRequest) {
    try {
        console.log("[팝업 생성 API] 요청 시작");

        const formData = await request.formData();
        const requestJson = formData.get("request") as string;
        const image = formData.get("image") as File | null;

        if (!requestJson) {
            return NextResponse.json(
                {
                    success: false,
                    error: "request 데이터가 필요합니다.",
                },
                { status: 400 },
            );
        }

        let requestData;
        try {
            requestData = JSON.parse(requestJson);
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    error: "request 데이터 형식이 올바르지 않습니다.",
                },
                { status: 400 },
            );
        }

        if (
            !requestData.title ||
            !requestData.startDate ||
            !requestData.endDate
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "제목, 시작일, 종료일은 필수입니다.",
                },
                { status: 400 },
            );
        }

        console.log("[팝업 생성 API] 파싱된 데이터:", {
            title: requestData.title,
            startDate: requestData.startDate,
            endDate: requestData.endDate,
            sortOrder: requestData.sortOrder,
            hasImage: !!image,
        });

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${API_ENDPOINTS.popup.create}`;

        // 백엔드로 전송할 FormData 생성
        const backendFormData = new FormData();
        const requestBlob = new Blob([JSON.stringify(requestData)], {
            type: "application/json",
        });
        backendFormData.append("request", requestBlob);

        if (image) {
            backendFormData.append("image", image);
            console.log("[팝업 생성 API] 이미지 파일:", {
                name: image.name,
                size: image.size,
                type: image.type,
            });
        }

        const headers: Record<string, string> = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn("[팝업 생성 API] ⚠️ access_token이 없습니다!");
        }

        console.log("[팝업 생성 API] 백엔드 요청 URL:", url);

        const response = await fetch(url, {
            method: "POST",
            headers,
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
        console.error("[팝업 생성 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "팝업 생성에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    extractCookieValue,
    forwardSetCookies,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * PUT /api/community/notices/[id] - 공지사항 수정
 *
 * 경로 파라미터:
 * - id: 공지사항 ID
 *
 * Request body: multipart/form-data
 * - title: string (필수, 최대 200자)
 * - content: string (필수, HTML)
 * - isTopFixed: number (상단 고정 여부)
 * - isShow: number (공개 여부, 0:비공개, 1:공개)
 * - files: File[] (첨부파일)
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 공지사항 ID입니다." },
                { status: 400 },
            );
        }

        console.log("[공지사항 수정 API] 요청 시작, ID:", id);

        const formData = await request.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const isTopFixed = formData.get("isTopFixed");
        const isShow = formData.get("isShow");
        const files = formData.getAll("files") as File[];

        console.log("[공지사항 수정 API] 파싱된 데이터:", {
            title,
            contentLength: content?.length || 0,
            isTopFixed,
            isShow,
            filesCount: files.length,
        });

        // 3. 필수 필드 검증
        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: "제목과 내용은 필수입니다." },
                { status: 400 },
            );
        }

        if (title.length > 200) {
            return NextResponse.json(
                { success: false, error: "제목은 200자를 초과할 수 없습니다." },
                { status: 400 },
            );
        }

        const { createNoticeRequestData } = await import(
            "@/shared/api/noticeUtils"
        );
        const requestData = createNoticeRequestData(
            title,
            content,
            isTopFixed as string | null,
            isShow as string | null,
        );

        const backendFormData = new FormData();
        const requestBlob = new Blob([JSON.stringify(requestData)], {
            type: "application/json",
        });
        backendFormData.append("request", requestBlob);

        for (const file of files) {
            backendFormData.append("files", file);
        }

        console.log("[공지사항 수정 API] request 데이터:", requestData);
        console.log("[공지사항 수정 API] 파일 개수:", files.length);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const endpoint = API_ENDPOINTS.notice.detail(Number(id));
        const url = `${API_URL}${endpoint}`;

        const headers: Record<string, string> = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
            console.log("[공지사항 수정 API] Authorization 헤더: 있음");
        } else {
            console.warn("[공지사항 수정 API] ⚠️ access_token이 없습니다!");
        }

        console.log("[공지사항 수정 API] 백엔드 요청 URL:", url);

        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: backendFormData,
        });

        console.log(
            "[공지사항 수정 API] 응답 상태:",
            response.status,
            response.statusText,
        );

        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log("[공지사항 수정 API] 응답 본문 길이:", text.length);
        console.log("[공지사항 수정 API] 응답 본문 전체:", text);

        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            console.error("[공지사항 수정 API] 에러 발생:", {
                status: response.status,
                statusText: response.statusText,
                errorMessage,
                responseText: text,
            });

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
            console.log("[공지사항 수정 API] 성공 - 데이터 파싱 완료");
            console.log(
                "[공지사항 수정 API] 파싱된 데이터:",
                JSON.stringify(data, null, 2),
            );
        } catch (parseError) {
            console.error("[공지사항 수정 API] JSON 파싱 실패:", parseError);
            console.error("[공지사항 수정 API] 파싱 실패한 텍스트:", text);
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }

        revalidatePath("/community/notices");
        revalidatePath(`/community/notices/${id}`);

        const nextResponse = NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        // 백엔드 응답의 Set-Cookie 헤더를 브라우저에 전달 (토큰 갱신용)
        forwardSetCookies(response, nextResponse);

        return nextResponse;
    } catch (error) {
        console.error("[공지사항 수정 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
            stack: error instanceof Error ? error.stack : undefined,
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "공지사항 수정에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * GET /api/community/notices/[id] - 공지사항 상세 조회
 *
 * 경로 파라미터:
 * - id: 공지사항 ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 공지사항 ID입니다." },
                { status: 400 },
            );
        }

        const endpoint = API_ENDPOINTS.notice.detail(Number(id));
        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${endpoint}`;
        console.log("[공지사항 상세 API] 요청 URL:", url);

        const response = await fetch(url, {
            method: "GET",
        });

        console.log(
            "[공지사항 상세 API] 응답 상태:",
            response.status,
            response.statusText,
        );
        console.log(
            "[공지사항 상세 API] 응답 헤더:",
            Object.fromEntries(response.headers.entries()),
        );

        // 3. 응답 본문 읽기
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log("[공지사항 상세 API] 응답 본문 길이:", text.length);
        console.log("[공지사항 상세 API] 응답 본문 전체:", text);

        // 4. 에러 처리
        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            console.error("[공지사항 상세 API] 에러 발생:", {
                status: response.status,
                statusText: response.statusText,
                errorMessage,
                responseText: text,
            });

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        // 5. 성공 응답 반환
        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
            console.log("[공지사항 상세 API] 성공 - 데이터 파싱 완료");
            console.log(
                "[공지사항 상세 API] 파싱된 데이터:",
                JSON.stringify(data, null, 2),
            );
        } catch (parseError) {
            console.error("[공지사항 상세 API] JSON 파싱 실패:", parseError);
            console.error("[공지사항 상세 API] 파싱 실패한 텍스트:", text);
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }

        const nextResponse = NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        // 백엔드 응답의 Set-Cookie 헤더를 브라우저에 전달 (토큰 갱신용)
        forwardSetCookies(response, nextResponse);

        return nextResponse;
    } catch (error) {
        console.error("[공지사항 상세 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
            stack: error instanceof Error ? error.stack : undefined,
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "공지사항 상세 정보를 가져오지 못했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * DELETE /api/community/notices/[id] - 공지사항 삭제
 *
 * 경로 파라미터:
 * - id: 공지사항 ID
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, error: "유효하지 않은 공지사항 ID입니다." },
                { status: 400 },
            );
        }

        const endpoint = API_ENDPOINTS.notice.delete(Number(id));
        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}${endpoint}`;
        console.log("[공지사항 삭제 API] 요청 URL:", url);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const headers: Record<string, string> = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
            console.log("[공지사항 삭제 API] Authorization 헤더: 있음");
        } else {
            console.warn("[공지사항 삭제 API] ⚠️ access_token이 없습니다!");
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        console.log(
            "[공지사항 삭제 API] 응답 상태:",
            response.status,
            response.statusText,
        );

        // 3. 응답 본문 읽기
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log("[공지사항 삭제 API] 응답 본문 길이:", text.length);
        console.log("[공지사항 삭제 API] 응답 본문 전체:", text);

        // 4. 에러 처리
        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            console.error("[공지사항 삭제 API] 에러 발생:", {
                status: response.status,
                statusText: response.statusText,
                errorMessage,
                responseText: text,
            });

            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status },
            );
        }

        // 5. 성공 응답 반환
        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
            console.log("[공지사항 삭제 API] 성공 - 데이터 파싱 완료");
            console.log(
                "[공지사항 삭제 API] 파싱된 데이터:",
                JSON.stringify(data, null, 2),
            );
        } catch (parseError) {
            console.error("[공지사항 삭제 API] JSON 파싱 실패:", parseError);
            console.error("[공지사항 삭제 API] 파싱 실패한 텍스트:", text);
            data = {};
        }

        // 공지사항 목록 페이지 캐시 무효화
        revalidatePath("/community/notices");

        return NextResponse.json(
            { success: true, ...data },
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            },
        );
    } catch (error) {
        console.error("[공지사항 삭제 API] 예외 발생:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
            stack: error instanceof Error ? error.stack : undefined,
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "공지사항 삭제에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import {
    decodeResponseText,
    extractCookieValue,
    fetchWithAuth,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * GET /api/community/notices - 공지사항 목록 조회
 *
 * 쿼리 파라미터:
 * - page: 페이지 번호 (기본값: 1)
 * - size: 페이지 크기 (기본값: 15)
 * - title: 검색어 (제목으로 검색, 선택사항)
 */
export async function GET(request: NextRequest) {
    try {
        // 1. 쿼리 파라미터 처리
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";
        const size = searchParams.get("size") || "15";
        const title = searchParams.get("title");

        let endpoint = `${API_ENDPOINTS.notice.list}?page=${page}&size=${size}`;
        // title 파라미터가 있으면 추가 (제목 검색)
        if (title && title.trim()) {
            endpoint += `&title=${encodeURIComponent(title.trim())}`;
        }
        console.log("[공지사항 API] 요청 URL:", endpoint);

        // 2. 백엔드 API 호출 (인증 필요 - fetchWithAuth 사용)
        const response = await fetchWithAuth(endpoint, request, {
            method: "GET",
        });

        console.log(
            "[공지사항 API] 응답 상태:",
            response.status,
            response.statusText,
        );
        console.log(
            "[공지사항 API] 응답 헤더:",
            Object.fromEntries(response.headers.entries()),
        );

        // 3. 응답 본문 읽기
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log("[공지사항 API] 응답 본문 길이:", text.length);
        console.log("[공지사항 API] 응답 본문 전체:", text);

        // 4. 에러 처리
        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            console.error("[공지사항 API] 에러 발생:", {
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
            console.log("[공지사항 API] 성공 - 데이터 파싱 완료");
            console.log(
                "[공지사항 API] 파싱된 데이터:",
                JSON.stringify(data, null, 2),
            );
        } catch (parseError) {
            console.error("[공지사항 API] JSON 파싱 실패:", parseError);
            console.error("[공지사항 API] 파싱 실패한 텍스트:", text);
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
        console.error("[공지사항 API] 예외 발생:", {
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
                        : "공지사항 목록을 가져오지 못했습니다.",
            },
            { status: 500 },
        );
    }
}

/**
 * POST /api/community/notices - 공지사항 생성
 *
 * Request body: multipart/form-data
 * - title: string (필수, 최대 200자)
 * - content: string (필수, HTML)
 * - isTopFixed: number (상단 고정 여부)
 * - isShow: number (공개 여부, 0:비공개, 1:공개)
 * - files: File[] (첨부파일)
 */
export async function POST(request: NextRequest) {
    try {
        console.log("[공지사항 생성 API] 요청 시작");

        const formData = await request.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const isTopFixed = formData.get("isTopFixed");
        const isShow = formData.get("isShow");
        const files = formData.getAll("files") as File[];

        console.log("[공지사항 생성 API] 파싱된 데이터:", {
            title,
            contentLength: content?.length || 0,
            isTopFixed,
            isShow,
            filesCount: files.length,
        });

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

        console.log("[공지사항 생성 API] request 데이터:", requestData);
        console.log("[공지사항 생성 API] 파일 개수:", files.length);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const url = `${API_URL}${API_ENDPOINTS.notice.create}`;

        const headers: Record<string, string> = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn("[공지사항 생성 API] ⚠️ access_token이 없습니다!");
        }

        console.log("[공지사항 생성 API] 백엔드 요청 URL:", url);
        console.log(
            "[공지사항 생성 API] Authorization 헤더:",
            accessToken ? "있음" : "없음",
        );

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: backendFormData,
        });

        console.log(
            "[공지사항 생성 API] 응답 상태:",
            response.status,
            response.statusText,
        );

        // 6. 응답 본문 읽기
        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log("[공지사항 생성 API] 응답 본문 길이:", text.length);
        console.log("[공지사항 생성 API] 응답 본문 전체:", text);

        // 7. 에러 처리
        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            console.error("[공지사항 생성 API] 에러 발생:", {
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

        // 8. 성공 응답 반환
        let data;
        try {
            data = hasJsonContent && text ? JSON.parse(text) : {};
            console.log("[공지사항 생성 API] 성공 - 데이터 파싱 완료");
            console.log(
                "[공지사항 생성 API] 파싱된 데이터:",
                JSON.stringify(data, null, 2),
            );
        } catch (parseError) {
            console.error("[공지사항 생성 API] JSON 파싱 실패:", parseError);
            console.error("[공지사항 생성 API] 파싱 실패한 텍스트:", text);
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }

        // 공지사항 목록 페이지 캐시 무효화
        revalidatePath("/community/notices");

        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("[공지사항 생성 API] 예외 발생:", {
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
                        : "공지사항 생성에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

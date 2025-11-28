import { NextRequest, NextResponse } from "next/server";
import {
    decodeResponseText,
    extractCookieValue,
    forwardSetCookies,
    parseErrorResponse,
} from "@/shared/api/utils";

/**
 * POST /api/community/notices/images - 공지사항 이미지 업로드
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
        console.log("[공지사항 이미지 업로드 API] 요청 시작");

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "파일이 필요합니다." },
                { status: 400 },
            );
        }

        console.log("[공지사항 이미지 업로드 API] 파일 정보:", {
            name: file.name,
            size: file.size,
            type: file.type,
        });

        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const cookieString = request.headers.get("cookie") || "";
        const accessToken = extractCookieValue(cookieString, "access_token");

        const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const url = `${API_URL}/api/notices/images`;

        const headers: Record<string, string> = {};
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
            console.log(
                "[공지사항 이미지 업로드 API] Authorization 헤더: 있음",
            );
        } else {
            console.warn(
                "[공지사항 이미지 업로드 API] ⚠️ access_token이 없습니다!",
            );
        }

        console.log("[공지사항 이미지 업로드 API] 백엔드 요청 URL:", url);

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: uploadFormData,
        });

        console.log(
            "[공지사항 이미지 업로드 API] 응답 상태:",
            response.status,
            response.statusText,
        );

        const contentType = response.headers.get("content-type");
        const hasJsonContent = contentType?.includes("application/json");
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log(
            "[공지사항 이미지 업로드 API] 응답 본문 길이:",
            text.length,
        );
        console.log("[공지사항 이미지 업로드 API] 응답 본문 전체:", text);

        if (!response.ok) {
            const errorMessage = parseErrorResponse(
                text,
                hasJsonContent ?? false,
                response.status,
                response.statusText,
            );

            console.error("[공지사항 이미지 업로드 API] 에러 발생:", {
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
            console.log("[공지사항 이미지 업로드 API] 성공 - 데이터 파싱 완료");
            console.log(
                "[공지사항 이미지 업로드 API] 파싱된 데이터:",
                JSON.stringify(data, null, 2),
            );
        } catch (parseError) {
            console.error(
                "[공지사항 이미지 업로드 API] JSON 파싱 실패:",
                parseError,
            );
            console.error(
                "[공지사항 이미지 업로드 API] 파싱 실패한 텍스트:",
                text,
            );
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
        console.error("[공지사항 이미지 업로드 API] 예외 발생:", {
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
                        : "이미지 업로드에 실패했습니다.",
            },
            { status: 500 },
        );
    }
}

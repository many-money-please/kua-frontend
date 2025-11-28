import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { decodeResponseText, extractCookieValue } from "@/shared/api/utils";
import type { NoticeListResponse } from "@/shared/api/types";

/**
 * 공지사항 목록을 가져오는 함수
 * Server Component에서 사용
 *
 * @param page 페이지 번호 (기본값: 1)
 * @param size 페이지 크기 (기본값: 15)
 * @param title 검색어 (제목으로 검색, 선택사항)
 * @returns 공지사항 목록 및 페이지네이션 정보
 */
export async function getNotices(
    page: number = 1,
    size: number = 15,
    title?: string,
): Promise<NoticeListResponse> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!API_URL) {
            throw new Error("NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
        }

        // 쿠키에서 access_token 추출
        const cookieStore = await cookies();
        const cookieString = cookieStore.toString();
        const accessToken = extractCookieValue(cookieString, "access_token");

        let endpoint = `${API_ENDPOINTS.notice.list}?page=${page}&size=${size}`;
        // title 파라미터가 있으면 추가 (제목 검색)
        if (title && title.trim()) {
            endpoint += `&title=${encodeURIComponent(title.trim())}`;
        }
        const url = `${API_URL}${endpoint}`;

        // 헤더 설정 (인증 토큰 포함)
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn(
                "[getNotices] access_token이 없습니다. 인증되지 않은 요청입니다.",
            );
        }

        console.log("[getNotices] 요청 URL:", url);
        console.log(
            "[getNotices] Authorization 헤더:",
            accessToken ? "있음" : "없음",
        );

        const response = await fetch(url, {
            method: "GET",
            headers,
            next: { revalidate: 30 }, // 30초마다 재검증 (ISR)
        });

        if (!response.ok) {
            // 에러 응답 본문 읽기
            const errorArrayBuffer = await response.arrayBuffer();
            const errorText = decodeResponseText(errorArrayBuffer);

            console.error("[getNotices] 공지사항 목록 조회 실패:", {
                status: response.status,
                statusText: response.statusText,
                url,
                error: errorText,
                errorTextLength: errorText.length,
                errorTextPreview: errorText.substring(0, 500),
            });

            return {
                notices: [],
                totalCount: 0,
                page: 1,
                size: 15,
                totalPages: 0,
                hasNext: false,
                hasPrevious: false,
            };
        }

        // 응답 본문 읽기 (한글 인코딩 처리)
        const arrayBuffer = await response.arrayBuffer();
        const text = decodeResponseText(arrayBuffer);

        console.log("[getNotices] 응답 본문 길이:", text.length);
        console.log(
            "[getNotices] 응답 본문 (처음 500자):",
            text.substring(0, 500),
        );

        let data: NoticeListResponse;
        try {
            data = JSON.parse(text) as NoticeListResponse;
            console.log(
                "[getNotices] 성공 - 데이터 파싱 완료, 공지사항 개수:",
                data.notices?.length || 0,
            );
        } catch (parseError) {
            console.error("[getNotices] JSON 파싱 실패:", {
                error: parseError,
                text: text.substring(0, 1000),
            });
            throw new Error(
                `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : "알 수 없는 오류"}`,
            );
        }

        return data;
    } catch (error) {
        console.error("[getNotices] 공지사항 목록 조회 중 오류:", {
            error,
            message: error instanceof Error ? error.message : "알 수 없는 오류",
            stack: error instanceof Error ? error.stack : undefined,
        });
        return {
            notices: [],
            totalCount: 0,
            page: 1,
            size: 15,
            totalPages: 0,
            hasNext: false,
            hasPrevious: false,
        };
    }
}

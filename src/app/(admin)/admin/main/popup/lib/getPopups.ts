import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { extractCookieValue } from "@/shared/api/utils";
import type { PopupListResponse } from "@/shared/api/types";

/**
 * 팝업 목록을 가져오는 함수
 * Server Component에서 사용
 *
 * @param title 검색어 (제목으로 검색, 선택사항)
 * @returns 팝업 목록 배열
 */
export async function getPopups(title?: string): Promise<PopupListResponse> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
        console.error("[getPopups] NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
        return [];
    }

    // 쿠키에서 토큰 추출
    const cookieStore = await cookies();
    const accessToken = extractCookieValue(
        cookieStore.toString(),
        "access_token",
    );

    // 엔드포인트 구성
    let endpoint = API_ENDPOINTS.popup.list;
    if (title?.trim()) {
        endpoint += `?title=${encodeURIComponent(title.trim())}`;
    }

    const url = `${API_URL}${endpoint}`;
    console.log("[getPopups] 요청 URL:", url);
    console.log("[getPopups] 토큰:", accessToken ? "있음" : "없음");

    try {
        // 백엔드 호출
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
            cache: "no-store",
        });

        console.log(
            "[getPopups] 응답 상태:",
            response.status,
            response.statusText,
        );

        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            console.error("[getPopups] 요청 실패:", {
                status: response.status,
                statusText: response.statusText,
                error: errorText,
            });
            return [];
        }

        const data = await response.json();
        console.log(
            "[getPopups] 성공, 팝업 개수:",
            Array.isArray(data) ? data.length : 0,
        );
        return data;
    } catch (error) {
        console.error("[getPopups] 예외 발생:", error);
        return [];
    }
}

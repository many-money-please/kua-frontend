import type { Notice } from "@/shared/api/types";
import type { CommunityPostSummary } from "@/widgets/community";

/**
 * Notice 타입을 CommunityPostSummary 타입으로 변환
 *
 * @param notice API에서 받은 Notice 객체
 * @returns CommunityTableSection에서 사용할 수 있는 형태로 변환된 객체
 */
export function mapNoticeToPostSummary(notice: Notice): CommunityPostSummary {
    return {
        id: notice.id,
        title: notice.title,
        createdAt: notice.createdAt.split("T")[0], // "2025-11-14T15:28:54" -> "2025-11-14"
        views: notice.hit, // API의 hit 필드를 views로 매핑
    };
}

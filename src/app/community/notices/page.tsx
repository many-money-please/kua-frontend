import { CommunityTableSection } from "@/widgets/community";
import type { CommunityPostSummary } from "@/widgets/community";

const NOTICE_POSTS: CommunityPostSummary[] = [
    {
        id: 1,
        title: "2025년 정기 총회 안내",
        createdAt: "2025-01-15",
        views: 312,
    },
    {
        id: 2,
        title: "2025년 상반기 대회 일정 공지",
        createdAt: "2025-01-10",
        views: 545,
    },
    {
        id: 3,
        title: "협회 사무국 이전 안내",
        createdAt: "2025-01-05",
        views: 198,
    },
];

export default function CommunityNoticesPage() {
    return (
        <CommunityTableSection
            title="공지사항"
            data={NOTICE_POSTS}
            detailBasePath="/community/notices"
            searchOptions={["제목", "내용", "제목+내용"]}
        />
    );
}

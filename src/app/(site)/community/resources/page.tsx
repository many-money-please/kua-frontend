import { Suspense } from "react";
import { CommunityTableSection } from "@/widgets/community";
import type { CommunityPostSummary } from "@/widgets/community";

const RESOURCE_POSTS: CommunityPostSummary[] = [
    {
        id: 1,
        title: "2025년 선수 등록 양식",
        createdAt: "2025-01-12",
        views: 421,
    },
    {
        id: 2,
        title: "심판 매뉴얼 최신판 PDF",
        createdAt: "2025-01-08",
        views: 367,
    },
    {
        id: 3,
        title: "대회 운영 가이드라인",
        createdAt: "2025-01-02",
        views: 289,
    },
];

export default function CommunityResourcesPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <CommunityTableSection
                title="자료실"
                data={RESOURCE_POSTS}
                detailBasePath="/community/resources"
                searchOptions={["제목", "내용", "제목+내용"]}
            />
        </Suspense>
    );
}

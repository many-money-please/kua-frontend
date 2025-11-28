import { Suspense } from "react";
import type { Metadata } from "next";
import { CommunityTableSection } from "@/widgets/community";
import type { CommunityPostSummary } from "@/widgets/community";
import { getNotices } from "./lib/getNotices";
import { mapNoticeToPostSummary } from "./lib/mapNoticeToPostSummary";

export const metadata: Metadata = {
    title: "공지사항 | 커뮤니티 | 대한수중 핀수영협회",
    description:
        "대한수중핀수영협회의 공지사항을 확인하실 수 있습니다. 협회 소식, 대회 안내, 주요 공지사항 등을 제공합니다.",
};

export default async function CommunityNoticesPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        title?: string;
        searchOption?: string;
    }>;
}) {
    // searchParams는 Promise이므로 await 필요
    const params = await searchParams;

    // 쿼리 파라미터에서 페이지 번호 추출
    const page = parseInt(params.page || "1", 10);

    // 검색 옵션이 "제목"일 때만 title 파라미터 전달
    const title = params.searchOption === "제목" ? params.title : undefined;

    // 공지사항 데이터 가져오기
    const noticeData = await getNotices(page, 15, title);

    // Notice 타입을 CommunityPostSummary 타입으로 변환
    const posts: CommunityPostSummary[] = noticeData.notices.map(
        mapNoticeToPostSummary,
    );

    // 에러가 발생한 경우 (notices가 비어있고 totalCount가 0이면 에러 가능성)
    // TODO: 백엔드 에러 수정 후 제거
    if (noticeData.notices.length === 0 && noticeData.totalCount === 0) {
        console.warn(
            "[CommunityNoticesPage] 공지사항 데이터가 없습니다. 백엔드 에러를 확인하세요.",
        );
    }

    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <CommunityTableSection
                title="공지사항"
                data={posts}
                detailBasePath="/community/notices"
                searchOptions={["제목", "내용", "제목+내용"]}
                pageSize={15}
                initialPage={page}
                totalPages={noticeData.totalPages}
                totalCount={noticeData.totalCount}
            />
        </Suspense>
    );
}

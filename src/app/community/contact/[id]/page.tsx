"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "문의합니다.",
    registrationDate: "2025-11-12",
    views: 3948,
    content: `
        <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
    `,
    attachments: [],
});

const getDummyNavigation = (
    id: string,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentId = Number(id);
    return {
        prev:
            currentId > 1
                ? {
                      id: currentId - 1,
                      title: "2026년 제1차 핀수영 국가대표 선발전 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
        next:
            currentId < 20
                ? {
                      id: currentId + 1,
                      title: "제26회 문화체육관광부장관기 전국핀수영선수권대회 수중스포츠대회 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
    };
};

export default function ContactDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="문의하기"
            data={data}
            navigation={navigation}
            listUrl="/community/contact"
            detailUrlPattern={(id) => `/community/contact/${id}`}
        />
    );
}

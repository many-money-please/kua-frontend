"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "제28회 청양기 전국핀수영대회",
    registrationDate: "2025-12-20",
    views: 1234,
    content: `
        <h2>대회 개요</h2>
        <p>제28회 청양기 전국핀수영대회가 성황리에 개최되었습니다.</p>
        
        <h3>대회 일정</h3>
        <ul>
            <li>일시: 2025년 12월 20일</li>
            <li>장소: 청양 수영장</li>
            <li>참가자: 전국 핀수영 선수단</li>
        </ul>
        
        <p>많은 선수들이 참가하여 열띤 경기를 펼쳤습니다.</p>
    `,
    attachments: [
        { name: "대회결과.pdf", url: "#" },
        { name: "참가선수명단.xlsx", url: "#" },
    ],
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
                      title: "2025년 제1차 연수수당 강습회",
                      date: "2025-12-18",
                  }
                : null,
        next:
            currentId < 20
                ? {
                      id: currentId + 1,
                      title: "제목 기입란",
                      date: "2025-12-15",
                  }
                : null,
    };
};

export default function PhotoGalleryDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="포토갤러리"
            data={data}
            navigation={navigation}
            listUrl="/community/photo-gallery"
            detailUrlPattern={(id) => `/community/photo-gallery/${id}`}
        />
    );
}

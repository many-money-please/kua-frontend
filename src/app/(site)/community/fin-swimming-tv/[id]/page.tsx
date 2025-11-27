"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "2025 전국핀수영대회 하이라이트",
    registrationDate: "2025-12-20",
    views: 1234,
    content: `
        <h2>영상 소개</h2>
        <p>2025년 전국핀수영대회의 하이라이트 영상입니다.</p>
        
        <h3>주요 내용</h3>
        <ul>
            <li>결승전 주요 장면</li>
            <li>선수들의 열띤 경기</li>
            <li>시상식 현장</li>
        </ul>
        
        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
            <iframe 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                frameborder="0" 
                allowfullscreen
            ></iframe>
        </div>
        
        <p>더 많은 영상은 유튜브 채널에서 확인하실 수 있습니다.</p>
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
                      title: "핀수영 기본 기술 가이드",
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

export default function FinSwimmingTVDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="핀수영 TV"
            data={data}
            navigation={navigation}
            listUrl="/community/fin-swimming-tv"
            detailUrlPattern={(id) => `/community/fin-swimming-tv/${id}`}
        />
    );
}

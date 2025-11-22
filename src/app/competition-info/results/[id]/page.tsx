"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "2025년 제1차 핀수영 국가대표 선발전 결과",
    registrationDate: "2025-11-15",
    views: 2847,
    content: `
        <p>2025년 제1차 핀수영 국가대표 선발전이 성황리에 마무리되었습니다.</p>
        <br />
        <div>
            <div><strong>대회명</strong></div>
            <div>2025년 제1차 핀수영 국가대표 선발전</div>
        </div>
        <div>
            <div><strong>개최일</strong></div>
            <div>2025년 11월 10일(일)</div>
        </div>
        <div>
            <div><strong>장소</strong></div>
            <div>서울올림픽수영장</div>
        </div>
        <div>
            <div><strong>참가팀</strong></div>
            <div>총 15개 팀, 120명</div>
        </div>
        <br />
        <p>상세 결과는 첨부 파일을 참고해주세요.</p>
    `,
    attachments: [
        { name: "2025_제1차_국가대표_선발전_결과.pdf", url: "#" },
        { name: "기록표.xlsx", url: "#" },
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
                      title: "2024년 전국생활체육 수중스포츠대회 결과",
                      date: "2024-12-20",
                  }
                : null,
        next:
            currentId < 20
                ? {
                      id: currentId + 1,
                      title: "2025년 제2차 핀수영 국가대표 선발전 결과",
                      date: "2025-12-05",
                  }
                : null,
    };
};

export default function CompetitionResultDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="대회 결과"
            data={data}
            navigation={navigation}
            listUrl="/competition-info/results"
            detailUrlPattern={(id) => `/competition-info/results/${id}`}
        />
    );
}

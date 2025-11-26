"use client";

import { notFound, useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const NEW_RECORD_DETAIL_DATA: Record<number, DetailPageData> = {
    1: {
        id: 1,
        title: "2025년 프리다이빙 신기록",
        registrationDate: "2025-01-15",
        views: 312,
        content: `
            <p><strong>대회명:</strong> 2025년 전국프리다이빙선수권대회</p>
            <p><strong>종목:</strong> 프리다이빙 - 정적 잠영</p>
            <p><strong>기록:</strong> 5분 32초</p>
            <p><strong>선수명:</strong> 김철수</p>
            <p><strong>소속:</strong> 서울대학교</p>
            <p><strong>이전 기록:</strong> 5분 15초 (2024년)</p>
            <p><strong>기록 갱신일:</strong> 2025-01-15</p>
            <p><strong>상세 내용:</strong></p>
            <p>2025년 전국프리다이빙선수권대회에서 김철수 선수가 정적 잠영 종목에서 5분 32초의 신기록을 수립했습니다. 이는 기존 기록인 5분 15초를 17초나 단축한 놀라운 성과입니다.</p>
        `,
    },
    2: {
        id: 2,
        title: "2025년 핀수영 신기록",
        registrationDate: "2025-01-10",
        views: 545,
        content: `
            <p><strong>대회명:</strong> 2025년 전국핀수영선수권대회</p>
            <p><strong>종목:</strong> 핀수영 - 표면 400m</p>
            <p><strong>기록:</strong> 03:12.34</p>
            <p><strong>선수명:</strong> 이영희</p>
            <p><strong>소속:</strong> 연세대학교</p>
            <p><strong>이전 기록:</strong> 03:18.45 (2024년)</p>
            <p><strong>기록 갱신일:</strong> 2025-01-10</p>
            <p><strong>상세 내용:</strong></p>
            <p>2025년 전국핀수영선수권대회에서 이영희 선수가 표면 400m 종목에서 03:12.34의 신기록을 수립했습니다. 이는 기존 기록을 6초 이상 단축한 뛰어난 성과입니다.</p>
        `,
    },
    3: {
        id: 3,
        title: "2025년 수영 신기록",
        registrationDate: "2025-01-05",
        views: 198,
        content: `
            <p><strong>대회명:</strong> 2025년 전국수영선수권대회</p>
            <p><strong>종목:</strong> 수영 - 호흡잠영 200m</p>
            <p><strong>기록:</strong> 01:30.12</p>
            <p><strong>선수명:</strong> 박민수</p>
            <p><strong>소속:</strong> 고려대학교</p>
            <p><strong>이전 기록:</strong> 01:35.78 (2024년)</p>
            <p><strong>기록 갱신일:</strong> 2025-01-05</p>
            <p><strong>상세 내용:</strong></p>
            <p>2025년 전국수영선수권대회에서 박민수 선수가 호흡잠영 200m 종목에서 01:30.12의 신기록을 수립했습니다. 이는 기존 기록을 5초 이상 단축한 우수한 성과입니다.</p>
        `,
    },
};

const NEW_RECORD_IDS = Object.keys(NEW_RECORD_DETAIL_DATA)
    .map((key) => Number(key))
    .sort((a, b) => a - b);

const getDummyNavigation = (
    id: number,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentIndex = NEW_RECORD_IDS.indexOf(id);

    return {
        prev:
            currentIndex > 0
                ? {
                      id: NEW_RECORD_IDS[currentIndex - 1],
                      title: NEW_RECORD_DETAIL_DATA[
                          NEW_RECORD_IDS[currentIndex - 1]
                      ].title,
                      date: NEW_RECORD_DETAIL_DATA[
                          NEW_RECORD_IDS[currentIndex - 1]
                      ].registrationDate,
                  }
                : null,
        next:
            currentIndex < NEW_RECORD_IDS.length - 1
                ? {
                      id: NEW_RECORD_IDS[currentIndex + 1],
                      title: NEW_RECORD_DETAIL_DATA[
                          NEW_RECORD_IDS[currentIndex + 1]
                      ].title,
                      date: NEW_RECORD_DETAIL_DATA[
                          NEW_RECORD_IDS[currentIndex + 1]
                      ].registrationDate,
                  }
                : null,
    };
};

export default function NewRecordDetailPage() {
    const params = useParams<{ id: string }>();
    const numericId = Number(params.id);
    const data = NEW_RECORD_DETAIL_DATA[numericId];

    if (!data) {
        notFound();
    }

    const navigation = getDummyNavigation(numericId);

    return (
        <DetailPage
            pageTitle="신기록 현황"
            data={data}
            navigation={navigation}
            listUrl="/competition-info/new-records"
            detailUrlPattern={(id) => `/competition-info/new-records/${id}`}
        />
    );
}

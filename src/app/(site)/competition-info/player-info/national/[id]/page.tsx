"use client";

import { notFound, useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const NATIONAL_PLAYER_DETAIL_DATA: Record<number, DetailPageData> = {
    1: {
        id: 1,
        title: "김철수",
        registrationDate: "2025-01-15",
        views: 312,
        content: `
            <p><strong>소속:</strong> 서울체육고등학교</p>
            <p><strong>생년월일:</strong> 2005-03-15</p>
            <p><strong>주종목:</strong> 표면 400m</p>
            <p><strong>최고기록:</strong> 03:15.23</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 금메달</li>
                <li>2024년 세계청소년선수권대회 은메달</li>
            </ul>
        `,
    },
    2: {
        id: 2,
        title: "이영희",
        registrationDate: "2025-01-10",
        views: 545,
        content: `
            <p><strong>소속:</strong> 부산체육고등학교</p>
            <p><strong>생년월일:</strong> 2004-07-22</p>
            <p><strong>주종목:</strong> 표면 200m</p>
            <p><strong>최고기록:</strong> 01:32.45</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 금메달</li>
                <li>2023년 아시아선수권대회 금메달</li>
            </ul>
        `,
    },
    3: {
        id: 3,
        title: "박민수",
        registrationDate: "2025-01-05",
        views: 198,
        content: `
            <p><strong>소속:</strong> 대전체육고등학교</p>
            <p><strong>생년월일:</strong> 2005-11-08</p>
            <p><strong>주종목:</strong> 호흡잠영 400m</p>
            <p><strong>최고기록:</strong> 03:08.12</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 은메달</li>
            </ul>
        `,
    },
};

const NATIONAL_PLAYER_IDS = Object.keys(NATIONAL_PLAYER_DETAIL_DATA)
    .map((key) => Number(key))
    .sort((a, b) => a - b);

const getDummyNavigation = (
    id: number,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentIndex = NATIONAL_PLAYER_IDS.indexOf(id);

    return {
        prev:
            currentIndex > 0
                ? {
                      id: NATIONAL_PLAYER_IDS[currentIndex - 1],
                      title: NATIONAL_PLAYER_DETAIL_DATA[
                          NATIONAL_PLAYER_IDS[currentIndex - 1]
                      ].title,
                      date: NATIONAL_PLAYER_DETAIL_DATA[
                          NATIONAL_PLAYER_IDS[currentIndex - 1]
                      ].registrationDate,
                  }
                : null,
        next:
            currentIndex < NATIONAL_PLAYER_IDS.length - 1
                ? {
                      id: NATIONAL_PLAYER_IDS[currentIndex + 1],
                      title: NATIONAL_PLAYER_DETAIL_DATA[
                          NATIONAL_PLAYER_IDS[currentIndex + 1]
                      ].title,
                      date: NATIONAL_PLAYER_DETAIL_DATA[
                          NATIONAL_PLAYER_IDS[currentIndex + 1]
                      ].registrationDate,
                  }
                : null,
    };
};

export default function NationalPlayerDetailPage() {
    const params = useParams<{ id: string }>();
    const numericId = Number(params.id);
    const data = NATIONAL_PLAYER_DETAIL_DATA[numericId];

    if (!data) {
        notFound();
    }

    const navigation = getDummyNavigation(numericId);

    return (
        <DetailPage
            pageTitle="국가대표"
            data={data}
            navigation={navigation}
            listUrl="/competition-info/player-info/national"
            detailUrlPattern={(id) =>
                `/competition-info/player-info/national/${id}`
            }
        />
    );
}


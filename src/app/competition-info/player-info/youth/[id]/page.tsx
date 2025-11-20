"use client";

import { notFound, useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const YOUTH_PLAYER_DETAIL_DATA: Record<number, DetailPageData> = {
    1: {
        id: 1,
        title: "정수진",
        registrationDate: "2025-01-15",
        views: 245,
        content: `
            <p><strong>소속:</strong> 인천체육고등학교</p>
            <p><strong>생년월일:</strong> 2007-05-10</p>
            <p><strong>주종목:</strong> 표면 100m</p>
            <p><strong>최고기록:</strong> 37.45</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 금메달</li>
            </ul>
        `,
    },
    2: {
        id: 2,
        title: "최동현",
        registrationDate: "2025-01-10",
        views: 389,
        content: `
            <p><strong>소속:</strong> 광주체육고등학교</p>
            <p><strong>생년월일:</strong> 2006-09-20</p>
            <p><strong>주종목:</strong> 표면 200m</p>
            <p><strong>최고기록:</strong> 01:35.67</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 은메달</li>
            </ul>
        `,
    },
    3: {
        id: 3,
        title: "한지은",
        registrationDate: "2025-01-05",
        views: 167,
        content: `
            <p><strong>소속:</strong> 경기체육고등학교</p>
            <p><strong>생년월일:</strong> 2007-12-03</p>
            <p><strong>주종목:</strong> 호흡잠영 200m</p>
            <p><strong>최고기록:</strong> 01:28.90</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 동메달</li>
            </ul>
        `,
    },
};

const YOUTH_PLAYER_IDS = Object.keys(YOUTH_PLAYER_DETAIL_DATA)
    .map((key) => Number(key))
    .sort((a, b) => a - b);

const getDummyNavigation = (
    id: number,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentIndex = YOUTH_PLAYER_IDS.indexOf(id);

    return {
        prev:
            currentIndex > 0
                ? {
                      id: YOUTH_PLAYER_IDS[currentIndex - 1],
                      title: YOUTH_PLAYER_DETAIL_DATA[
                          YOUTH_PLAYER_IDS[currentIndex - 1]
                      ].title,
                      date: YOUTH_PLAYER_DETAIL_DATA[
                          YOUTH_PLAYER_IDS[currentIndex - 1]
                      ].registrationDate,
                  }
                : null,
        next:
            currentIndex < YOUTH_PLAYER_IDS.length - 1
                ? {
                      id: YOUTH_PLAYER_IDS[currentIndex + 1],
                      title: YOUTH_PLAYER_DETAIL_DATA[
                          YOUTH_PLAYER_IDS[currentIndex + 1]
                      ].title,
                      date: YOUTH_PLAYER_DETAIL_DATA[
                          YOUTH_PLAYER_IDS[currentIndex + 1]
                      ].registrationDate,
                  }
                : null,
    };
};

export default function YouthPlayerDetailPage() {
    const params = useParams<{ id: string }>();
    const numericId = Number(params.id);
    const data = YOUTH_PLAYER_DETAIL_DATA[numericId];

    if (!data) {
        notFound();
    }

    const navigation = getDummyNavigation(numericId);

    return (
        <DetailPage
            pageTitle="청소년대표"
            data={data}
            navigation={navigation}
            listUrl="/competition-info/player-info/youth"
            detailUrlPattern={(id) =>
                `/competition-info/player-info/youth/${id}`
            }
        />
    );
}


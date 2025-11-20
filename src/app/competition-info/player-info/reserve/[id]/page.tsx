"use client";

import { notFound, useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const RESERVE_PLAYER_DETAIL_DATA: Record<number, DetailPageData> = {
    1: {
        id: 1,
        title: "강민호",
        registrationDate: "2025-01-15",
        views: 178,
        content: `
            <p><strong>소속:</strong> 서울대학교</p>
            <p><strong>생년월일:</strong> 2003-02-14</p>
            <p><strong>주종목:</strong> 표면 400m</p>
            <p><strong>최고기록:</strong> 03:12.34</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 동메달</li>
            </ul>
        `,
    },
    2: {
        id: 2,
        title: "윤서연",
        registrationDate: "2025-01-10",
        views: 234,
        content: `
            <p><strong>소속:</strong> 연세대학교</p>
            <p><strong>생년월일:</strong> 2002-08-25</p>
            <p><strong>주종목:</strong> 표면 200m</p>
            <p><strong>최고기록:</strong> 01:30.12</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 은메달</li>
            </ul>
        `,
    },
    3: {
        id: 3,
        title: "임태영",
        registrationDate: "2025-01-05",
        views: 156,
        content: `
            <p><strong>소속:</strong> 고려대학교</p>
            <p><strong>생년월일:</strong> 2003-11-18</p>
            <p><strong>주종목:</strong> 호흡잠영 400m</p>
            <p><strong>최고기록:</strong> 03:05.78</p>
            <p><strong>주요 수상 경력:</strong></p>
            <ul>
                <li>2024년 전국체전 동메달</li>
            </ul>
        `,
    },
};

const RESERVE_PLAYER_IDS = Object.keys(RESERVE_PLAYER_DETAIL_DATA)
    .map((key) => Number(key))
    .sort((a, b) => a - b);

const getDummyNavigation = (
    id: number,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentIndex = RESERVE_PLAYER_IDS.indexOf(id);

    return {
        prev:
            currentIndex > 0
                ? {
                      id: RESERVE_PLAYER_IDS[currentIndex - 1],
                      title: RESERVE_PLAYER_DETAIL_DATA[
                          RESERVE_PLAYER_IDS[currentIndex - 1]
                      ].title,
                      date: RESERVE_PLAYER_DETAIL_DATA[
                          RESERVE_PLAYER_IDS[currentIndex - 1]
                      ].registrationDate,
                  }
                : null,
        next:
            currentIndex < RESERVE_PLAYER_IDS.length - 1
                ? {
                      id: RESERVE_PLAYER_IDS[currentIndex + 1],
                      title: RESERVE_PLAYER_DETAIL_DATA[
                          RESERVE_PLAYER_IDS[currentIndex + 1]
                      ].title,
                      date: RESERVE_PLAYER_DETAIL_DATA[
                          RESERVE_PLAYER_IDS[currentIndex + 1]
                      ].registrationDate,
                  }
                : null,
    };
};

export default function ReservePlayerDetailPage() {
    const params = useParams<{ id: string }>();
    const numericId = Number(params.id);
    const data = RESERVE_PLAYER_DETAIL_DATA[numericId];

    if (!data) {
        notFound();
    }

    const navigation = getDummyNavigation(numericId);

    return (
        <DetailPage
            pageTitle="상비군선수"
            data={data}
            navigation={navigation}
            listUrl="/competition-info/player-info/reserve"
            detailUrlPattern={(id) =>
                `/competition-info/player-info/reserve/${id}`
            }
        />
    );
}


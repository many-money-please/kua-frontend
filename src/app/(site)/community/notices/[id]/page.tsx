"use client";

import { notFound, useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const NOTICE_DETAIL_DATA: Record<number, DetailPageData> = {
    1: {
        id: 1,
        title: "2025년 정기 총회 안내",
        registrationDate: "2025-01-15",
        views: 312,
        content: `
            <p>대한수중핀수영협회 2025년 정기 총회 일정을 안내드립니다.</p>
            <ul>
                <li>일시: 2025년 2월 10일(월) 14:00</li>
                <li>장소: 협회 대회의실</li>
                <li>안건: 2024년 결산 및 2025년 사업 계획</li>
            </ul>
            <p>회원 여러분의 많은 관심과 참석 부탁드립니다.</p>
        `,
    },
    2: {
        id: 2,
        title: "2025년 상반기 대회 일정 공지",
        registrationDate: "2025-01-10",
        views: 545,
        content: `
            <p>2025년 상반기 협회 주최 대회 일정을 공지드립니다.</p>
            <p>세부 일정은 첨부 파일을 참고해주세요.</p>
        `,
        attachments: [{ name: "2025_상반기_대회일정.pdf", url: "#" }],
    },
    3: {
        id: 3,
        title: "협회 사무국 이전 안내",
        registrationDate: "2025-01-05",
        views: 198,
        content: `
            <p>협회 사무국이 2025년 1월 20일부터 새로운 주소에서 업무를 시작합니다.</p>
            <p>새 주소: 서울특별시 송파구 올림픽로 424, 5층</p>
        `,
    },
};

const NOTICE_IDS = Object.keys(NOTICE_DETAIL_DATA)
    .map((key) => Number(key))
    .sort((a, b) => a - b);

const getDummyNavigation = (
    id: number,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentIndex = NOTICE_IDS.indexOf(id);

    return {
        prev:
            currentIndex > 0
                ? {
                      id: NOTICE_IDS[currentIndex - 1],
                      title: NOTICE_DETAIL_DATA[NOTICE_IDS[currentIndex - 1]]
                          .title,
                      date: NOTICE_DETAIL_DATA[NOTICE_IDS[currentIndex - 1]]
                          .registrationDate,
                  }
                : null,
        next:
            currentIndex < NOTICE_IDS.length - 1
                ? {
                      id: NOTICE_IDS[currentIndex + 1],
                      title: NOTICE_DETAIL_DATA[NOTICE_IDS[currentIndex + 1]]
                          .title,
                      date: NOTICE_DETAIL_DATA[NOTICE_IDS[currentIndex + 1]]
                          .registrationDate,
                  }
                : null,
    };
};

export default function CommunityNoticeDetailPage() {
    const params = useParams<{ id: string }>();
    const numericId = Number(params.id);
    const data = NOTICE_DETAIL_DATA[numericId];

    if (!data) {
        notFound();
    }

    const navigation = getDummyNavigation(numericId);

    return (
        <DetailPage
            pageTitle="공지사항"
            data={data}
            navigation={navigation}
            listUrl="/community/notices"
            detailUrlPattern={(id) => `/community/notices/${id}`}
        />
    );
}

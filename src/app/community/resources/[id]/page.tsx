"use client";

import { notFound, useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const RESOURCE_DETAIL_DATA: Record<number, DetailPageData> = {
    1: {
        id: 1,
        title: "2025년 선수 등록 양식",
        registrationDate: "2025-01-12",
        views: 421,
        content: `
            <p>2025년도 선수 등록 양식입니다. 작성 후 협회 이메일로 제출해주세요.</p>
            <p>제출 기한: 2025년 2월 5일(수)</p>
        `,
        attachments: [{ name: "2025_선수등록양식.hwp", url: "#" }],
    },
    2: {
        id: 2,
        title: "심판 매뉴얼 최신판 PDF",
        registrationDate: "2025-01-08",
        views: 367,
        content: `
            <p>심판 매뉴얼 최신판을 공유합니다. 대회 운영 시 참고 부탁드립니다.</p>
        `,
        attachments: [{ name: "심판_매뉴얼_2025.pdf", url: "#" }],
    },
    3: {
        id: 3,
        title: "대회 운영 가이드라인",
        registrationDate: "2025-01-02",
        views: 289,
        content: `
            <p>대회 운영 가이드라인 문서를 공유드립니다.</p>
        `,
    },
};

const RESOURCE_IDS = Object.keys(RESOURCE_DETAIL_DATA)
    .map((key) => Number(key))
    .sort((a, b) => a - b);

const getDummyNavigation = (
    id: number,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentIndex = RESOURCE_IDS.indexOf(id);

    return {
        prev:
            currentIndex > 0
                ? {
                      id: RESOURCE_IDS[currentIndex - 1],
                      title: RESOURCE_DETAIL_DATA[
                          RESOURCE_IDS[currentIndex - 1]
                      ].title,
                      date: RESOURCE_DETAIL_DATA[RESOURCE_IDS[currentIndex - 1]]
                          .registrationDate,
                  }
                : null,
        next:
            currentIndex < RESOURCE_IDS.length - 1
                ? {
                      id: RESOURCE_IDS[currentIndex + 1],
                      title: RESOURCE_DETAIL_DATA[
                          RESOURCE_IDS[currentIndex + 1]
                      ].title,
                      date: RESOURCE_DETAIL_DATA[RESOURCE_IDS[currentIndex + 1]]
                          .registrationDate,
                  }
                : null,
    };
};

export default function CommunityResourceDetailPage() {
    const params = useParams<{ id: string }>();
    const numericId = Number(params.id);
    const data = RESOURCE_DETAIL_DATA[numericId];

    if (!data) {
        notFound();
    }

    const navigation = getDummyNavigation(numericId);

    return (
        <DetailPage
            pageTitle="자료실"
            data={data}
            navigation={navigation}
            listUrl="/community/resources"
            detailUrlPattern={(id) => `/community/resources/${id}`}
        />
    );
}

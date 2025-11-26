"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "제28회 청양기 전국핀수영대회 참여지원 2025년 제1차 연수수당 강습회 신청안",
    registrationDate: "2025-12-20",
    views: 1234,
    content: `
        <p>대한수중핀수영협회 회원 여러분께 안내드립니다.</p>
        <p>아래와 같이 제28회 청양기 전국핀수영대회가 개최되오니 많은 참여 바랍니다.</p>
        <br />
        <p>※ 참가 신청은 온라인으로만 접수 가능합니다.</p>
        <p>※ 참가비는 별도 안내 예정입니다.</p>
        <br />
        <div>
            <div><strong>대회명</strong></div>
            <div>제28회 청양기 전국핀수영대회</div>
        </div>
        <div>
            <div><strong>주최</strong></div>
            <div>대한수중핀수영협회</div>
        </div>
        <div>
            <div><strong>대회기간</strong></div>
            <div>2025. 12. 20.(금) - 22.(일) 3일간</div>
        </div>
        <div>
            <div><strong>장소</strong></div>
            <div>서울시립대학교 수영장</div>
        </div>
        <div>
            <div><strong>참가대상</strong></div>
            <div>대한수중핀수영협회 등록 선수 및 동호인</div>
        </div>
        <div>
            <div><strong>신청기간</strong></div>
            <div>2025. 11. 1.(금) 09:00 ~ 11. 30.(토) 18:00</div>
        </div>
        <div>
            <div><strong>문의처</strong></div>
            <div>대한수중핀수영협회 사무처 02-420-4293</div>
        </div>
    `,
    attachments: [
        { name: "대회 안내문.pdf", url: "#" },
        { name: "참가신청서.hwp", url: "#" },
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
                      title: "2025년 제2차 핀수영 강습회 개최 안내",
                      date: "2025-12-19",
                  }
                : null,
        next:
            currentId < 20
                ? {
                      id: currentId + 1,
                      title: "제목 기입란",
                      date: "2025-12-20",
                  }
                : null,
    };
};

export default function NewsAndActivitiesDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="소식 및 활동"
            data={data}
            navigation={navigation}
            listUrl="/community/news-and-activities"
            detailUrlPattern={(id) => `/community/news-and-activities/${id}`}
        />
    );
}


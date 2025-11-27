"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "2025년도 경영공시",
    registrationDate: "2025-11-12",
    views: 3948,
    content: `
        <p>자세한 내용은 아래 링크를 참조해주시기 바랍니다.</p>
        <br />
        <p>🔗 <a href="#">2025년도 경영공시 링크 클릭하기</a></p>
        <br />
        <div>
            <div><strong>공시 항목</strong></div>
            <div>
                1. 재무상태표<br />
                2. 손익계산서<br />
                3. 현금흐름표<br />
                4. 자본변동표<br />
                5. 주석
            </div>
        </div>
        <div>
            <div><strong>공시 기간</strong></div>
            <div>2025년 1월 1일 ~ 2025년 12월 31일</div>
        </div>
        <div>
            <div><strong>감사 의견</strong></div>
            <div>적정</div>
        </div>
        <div>
            <div><strong>감사인</strong></div>
            <div>한국공인회계사회</div>
        </div>
    `,
    attachments: [
        { name: "2025년도 경영공시.pdf", url: "#" },
        { name: "재무제표.pdf", url: "#" },
        { name: "감사보고서.pdf", url: "#" },
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
                      title: "2024년도 경영공시",
                      date: "2025-11-12",
                  }
                : null,
        next:
            currentId < 20
                ? {
                      id: currentId + 1,
                      title: "2023년도 경영공시",
                      date: "2025-11-12",
                  }
                : null,
    };
};

export default function DisclosureDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="경영공시"
            data={data}
            navigation={navigation}
            listUrl="/about/disclosure"
            detailUrlPattern={(id) => `/about/disclosure/${id}`}
        />
    );
}

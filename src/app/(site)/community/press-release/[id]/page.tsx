"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "대한핀수영협회, 2025년 새로운 도약 선언",
    registrationDate: "2025-12-20",
    views: 1234,
    content: `
        <h2>보도자료 내용</h2>
        <p>대한핀수영협회가 2025년을 맞아 새로운 비전과 목표를 발표했습니다.</p>
        
        <h3>주요 내용</h3>
        <ul>
            <li>국제 대회 유치 확대</li>
            <li>유소년 선수 육성 프로그램 강화</li>
            <li>전국 핀수영 클럽 네트워크 구축</li>
        </ul>
        
        <p>자세한 내용은 첨부파일을 참고하시기 바랍니다.</p>
    `,
    attachments: [
        { name: "보도자료.pdf", url: "#" },
        { name: "첨부자료.docx", url: "#" },
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
                      title: "제28회 청양기 전국핀수영대회 성료",
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

export default function PressReleaseDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="보도자료"
            data={data}
            navigation={navigation}
            listUrl="/community/press-release"
            detailUrlPattern={(id) => `/community/press-release/${id}`}
        />
    );
}

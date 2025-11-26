"use client";

import { useRouter } from "next/navigation";
import { NewsAndActivitiesSection } from "@/widgets/community";
import type { NewsAndActivityPost } from "@/widgets/community";

// 임시 목업 데이터
const PRESS_RELEASE: NewsAndActivityPost[] = [
    {
        id: 1,
        title: "대한핀수영협회, 2025년 새로운 도약 선언",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 2,
        title: "제28회 청양기 전국핀수영대회 성료",
        createdAt: "2025-12-18",
        thumbnail: undefined,
    },
    {
        id: 3,
        title: "국제핀수영연맹, 한국 개최 확정",
        createdAt: "2025-12-15",
        thumbnail: undefined,
    },
    {
        id: 4,
        title: "유소년 핀수영 육성 프로그램 시작",
        createdAt: "2025-12-10",
        thumbnail: undefined,
    },
    {
        id: 5,
        title: "핀수영 국가대표 선발 결과 발표",
        createdAt: "2025-12-05",
        thumbnail: undefined,
    },
    {
        id: 6,
        title: "2024년 핀수영 성과 보고서 발간",
        createdAt: "2025-11-28",
        thumbnail: undefined,
    },
    {
        id: 7,
        title: "핀수영 지도자 자격증 제도 개편",
        createdAt: "2025-11-25",
        thumbnail: undefined,
    },
    {
        id: 8,
        title: "전국 핀수영 클럽 연합회 창립",
        createdAt: "2025-11-20",
        thumbnail: undefined,
    },
    {
        id: 9,
        title: "아시아 핀수영 대회 우수 성적 달성",
        createdAt: "2025-11-15",
        thumbnail: undefined,
    },
    {
        id: 10,
        title: "핀수영 안전관리 가이드라인 발표",
        createdAt: "2025-11-10",
        thumbnail: undefined,
    },
    {
        id: 11,
        title: "주니어 핀수영 캠프 성공적 개최",
        createdAt: "2025-11-05",
        thumbnail: undefined,
    },
    {
        id: 12,
        title: "대통령배 핀수영대회 사상 최대 규모",
        createdAt: "2025-10-28",
        thumbnail: undefined,
    },
    {
        id: 13,
        title: "핀수영 올림픽 정식종목 추진",
        createdAt: "2025-10-25",
        thumbnail: undefined,
    },
    {
        id: 14,
        title: "세계선수권대회 메달 획득",
        createdAt: "2025-10-20",
        thumbnail: undefined,
    },
    {
        id: 15,
        title: "핀수영 스포츠과학 연구센터 개소",
        createdAt: "2025-10-15",
        thumbnail: undefined,
    },
    {
        id: 16,
        title: "대학생 핀수영 리그 출범",
        createdAt: "2025-10-10",
        thumbnail: undefined,
    },
    {
        id: 17,
        title: "제목 기입란",
        createdAt: "2025-10-05",
        thumbnail: undefined,
    },
    {
        id: 18,
        title: "제목 기입란",
        createdAt: "2025-09-28",
        thumbnail: undefined,
    },
    {
        id: 19,
        title: "제목 기입란",
        createdAt: "2025-09-25",
        thumbnail: undefined,
    },
    {
        id: 20,
        title: "제목 기입란",
        createdAt: "2025-09-20",
        thumbnail: undefined,
    },
    {
        id: 21,
        title: "제목 기입란",
        createdAt: "2025-09-15",
        thumbnail: undefined,
    },
    {
        id: 22,
        title: "제목 기입란",
        createdAt: "2025-09-10",
        thumbnail: undefined,
    },
    {
        id: 23,
        title: "제목 기입란",
        createdAt: "2025-09-05",
        thumbnail: undefined,
    },
    {
        id: 24,
        title: "제목 기입란",
        createdAt: "2025-08-28",
        thumbnail: undefined,
    },
    {
        id: 25,
        title: "제목 기입란",
        createdAt: "2025-08-25",
        thumbnail: undefined,
    },
    {
        id: 26,
        title: "제목 기입란",
        createdAt: "2025-08-20",
        thumbnail: undefined,
    },
    {
        id: 27,
        title: "제목 기입란",
        createdAt: "2025-08-15",
        thumbnail: undefined,
    },
    {
        id: 28,
        title: "제목 기입란",
        createdAt: "2025-08-10",
        thumbnail: undefined,
    },
    {
        id: 29,
        title: "제목 기입란",
        createdAt: "2025-08-05",
        thumbnail: undefined,
    },
    {
        id: 30,
        title: "제목 기입란",
        createdAt: "2025-07-28",
        thumbnail: undefined,
    },
];

export default function PressReleasePage() {
    const router = useRouter();

    const handleEdit = (id: number) => {
        console.log("Edit:", id);
        router.push(`/community/press-release/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        console.log("Delete:", id);
        // 삭제 확인 모달 표시 후 삭제 처리
    };

    const handleRegister = () => {
        console.log("Register");
        router.push("/community/press-release/create");
    };

    return (
        <NewsAndActivitiesSection
            title="보도자료"
            data={PRESS_RELEASE}
            detailBasePath="/community/press-release"
            searchOptions={["제목", "내용", "제목+내용"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRegister={handleRegister}
        />
    );
}

"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { NewsAndActivitiesSection } from "@/widgets/community";
import type { NewsAndActivityPost } from "@/widgets/community";

// 임시 목업 데이터
const NEWS_AND_ACTIVITIES: NewsAndActivityPost[] = [
    {
        id: 1,
        title: "제28회 청양기 전국핀수영대회 참여지원 2025년 제1차 연수수당 강습회 신청안",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 2,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 3,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 4,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 5,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 6,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 7,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 8,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 9,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 10,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 11,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 12,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 13,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 14,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 15,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 16,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 17,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 18,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 19,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 20,
        title: "제목 기입란",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
];

export default function NewsAndActivitiesPage() {
    const router = useRouter();

    const handleEdit = (id: number) => {
        console.log("Edit:", id);
        router.push(`/community/news-and-activities/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        console.log("Delete:", id);
        // 삭제 확인 모달 표시 후 삭제 처리
    };

    const handleRegister = () => {
        console.log("Register");
        router.push("/community/news-and-activities/create");
    };

    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <NewsAndActivitiesSection
                title="소식 및 활동"
                data={NEWS_AND_ACTIVITIES}
                detailBasePath="/community/news-and-activities"
                searchOptions={["제목", "내용", "제목+내용"]}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRegister={handleRegister}
            />
        </Suspense>
    );
}

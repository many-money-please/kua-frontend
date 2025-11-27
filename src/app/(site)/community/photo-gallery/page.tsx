"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { NewsAndActivitiesSection } from "@/widgets/community";
import type { NewsAndActivityPost } from "@/widgets/community";

// 임시 목업 데이터
const PHOTO_GALLERY: NewsAndActivityPost[] = [
    {
        id: 1,
        title: "제28회 청양기 전국핀수영대회",
        createdAt: "2025-12-20",
        thumbnail: undefined,
    },
    {
        id: 2,
        title: "2025년 제1차 연수수당 강습회",
        createdAt: "2025-12-18",
        thumbnail: undefined,
    },
    {
        id: 3,
        title: "국제핀수영연맹 총회 참석",
        createdAt: "2025-12-15",
        thumbnail: undefined,
    },
    {
        id: 4,
        title: "유소년 핀수영 교실 개강식",
        createdAt: "2025-12-10",
        thumbnail: undefined,
    },
    {
        id: 5,
        title: "2024 한일 친선 핀수영대회",
        createdAt: "2025-12-05",
        thumbnail: undefined,
    },
    {
        id: 6,
        title: "제27회 전국체전 핀수영 경기",
        createdAt: "2025-11-28",
        thumbnail: undefined,
    },
    {
        id: 7,
        title: "핀수영 지도자 워크숍",
        createdAt: "2025-11-25",
        thumbnail: undefined,
    },
    {
        id: 8,
        title: "아시아 핀수영 선수권대회",
        createdAt: "2025-11-20",
        thumbnail: undefined,
    },
    {
        id: 9,
        title: "전국 동호인 핀수영대회",
        createdAt: "2025-11-15",
        thumbnail: undefined,
    },
    {
        id: 10,
        title: "핀수영 심판 강습회",
        createdAt: "2025-11-10",
        thumbnail: undefined,
    },
    {
        id: 11,
        title: "주니어 핀수영 캠프",
        createdAt: "2025-11-05",
        thumbnail: undefined,
    },
    {
        id: 12,
        title: "제26회 대통령배 핀수영대회",
        createdAt: "2025-10-28",
        thumbnail: undefined,
    },
    {
        id: 13,
        title: "핀수영 국가대표 선발전",
        createdAt: "2025-10-25",
        thumbnail: undefined,
    },
    {
        id: 14,
        title: "세계핀수영선수권대회 출전",
        createdAt: "2025-10-20",
        thumbnail: undefined,
    },
    {
        id: 15,
        title: "핀수영 안전교육 세미나",
        createdAt: "2025-10-15",
        thumbnail: undefined,
    },
    {
        id: 16,
        title: "대학생 핀수영 페스티벌",
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

export default function PhotoGalleryPage() {
    const router = useRouter();

    const handleEdit = (id: number) => {
        console.log("Edit:", id);
        router.push(`/community/photo-gallery/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        console.log("Delete:", id);
        // 삭제 확인 모달 표시 후 삭제 처리
    };

    const handleRegister = () => {
        console.log("Register");
        router.push("/community/photo-gallery/create");
    };

    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <NewsAndActivitiesSection
                title="포토갤러리"
                data={PHOTO_GALLERY}
                detailBasePath="/community/photo-gallery"
                searchOptions={["제목", "내용", "제목+내용"]}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRegister={handleRegister}
            />
        </Suspense>
    );
}

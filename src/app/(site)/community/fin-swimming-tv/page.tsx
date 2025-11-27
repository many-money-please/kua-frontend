"use client";

import { useRouter } from "next/navigation";
import { FinSwimmingTVSection } from "@/widgets/community";
import type { FinSwimmingTVPost } from "@/widgets/community";

// 임시 목업 데이터
const FIN_SWIMMING_TV: FinSwimmingTVPost[] = [
    {
        id: 1,
        title: "2025 전국핀수영대회 하이라이트",
        createdAt: "2025-12-20",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 2,
        title: "핀수영 기본 기술 가이드",
        createdAt: "2025-12-18",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 3,
        title: "2024 국제핀수영대회 결승전",
        createdAt: "2025-12-15",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 4,
        title: "핀수영 선수 인터뷰 - 국가대표 김OO",
        createdAt: "2025-12-10",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 5,
        title: "서피스 핀수영 완벽 마스터",
        createdAt: "2025-12-05",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 6,
        title: "비핀수영 기술 분석",
        createdAt: "2025-11-28",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 7,
        title: "청소년 핀수영 교실",
        createdAt: "2025-11-25",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 8,
        title: "아시아 선수권대회 100m 결승",
        createdAt: "2025-11-20",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 9,
        title: "핀수영 장비 선택 가이드",
        createdAt: "2025-11-15",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 10,
        title: "전국체전 핀수영 경기 하이라이트",
        createdAt: "2025-11-10",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 11,
        title: "주니어 핀수영 캠프 영상",
        createdAt: "2025-11-05",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 12,
        title: "대통령배 핀수영대회 200m 결승",
        createdAt: "2025-10-28",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 13,
        title: "핀수영 국가대표 선발전 현장",
        createdAt: "2025-10-25",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 14,
        title: "세계선수권대회 메달리스트 인터뷰",
        createdAt: "2025-10-20",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 15,
        title: "핀수영 턴 기술 집중 분석",
        createdAt: "2025-10-15",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 16,
        title: "대학생 핀수영 페스티벌 스케치",
        createdAt: "2025-10-10",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 17,
        title: "제목 기입란",
        createdAt: "2025-10-05",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 18,
        title: "제목 기입란",
        createdAt: "2025-09-28",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 19,
        title: "제목 기입란",
        createdAt: "2025-09-25",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 20,
        title: "제목 기입란",
        createdAt: "2025-09-20",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 21,
        title: "제목 기입란",
        createdAt: "2025-09-15",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 22,
        title: "제목 기입란",
        createdAt: "2025-09-10",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 23,
        title: "제목 기입란",
        createdAt: "2025-09-05",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 24,
        title: "제목 기입란",
        createdAt: "2025-08-28",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 25,
        title: "제목 기입란",
        createdAt: "2025-08-25",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 26,
        title: "제목 기입란",
        createdAt: "2025-08-20",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 27,
        title: "제목 기입란",
        createdAt: "2025-08-15",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 28,
        title: "제목 기입란",
        createdAt: "2025-08-10",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 29,
        title: "제목 기입란",
        createdAt: "2025-08-05",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
    {
        id: 30,
        title: "제목 기입란",
        createdAt: "2025-07-28",
        youtubeUrl: "https://www.youtube.com/watch?v=e1SSg_zexHE",
        youtubeVideoId: "e1SSg_zexHE",
    },
];

export default function FinSwimmingTVPage() {
    const router = useRouter();

    const handleEdit = (id: number) => {
        console.log("Edit:", id);
        router.push(`/community/fin-swimming-tv/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        console.log("Delete:", id);
        // 삭제 확인 모달 표시 후 삭제 처리
    };

    const handleRegister = () => {
        console.log("Register");
        router.push("/community/fin-swimming-tv/create");
    };

    return (
        <FinSwimmingTVSection
            title="핀수영 TV"
            data={FIN_SWIMMING_TV}
            searchOptions={["제목", "내용", "제목+내용"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRegister={handleRegister}
        />
    );
}

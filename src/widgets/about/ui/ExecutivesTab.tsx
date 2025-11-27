"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useUserRole } from "@/shared/lib/UserRoleContext";

type ExecutiveGroup = "회장" | "부회장" | "이사" | "감사";

type Executive = {
    id: number;
    name: string; // 이름
    title: string; // 직위
    affiliation: string; // 소속
    group: ExecutiveGroup; // 상위 구분
};

// 임원 데이터 (회장 / 부회장 / 이사 / 감사)
const executivesData: Executive[] = [
    // 회장
    {
        id: 1,
        name: "강철식",
        title: "회장",
        affiliation: "한밭운수 대표\n대한수중핀수영협회 제14대 회장",
        group: "회장",
    },
    // 부회장
    {
        id: 2,
        name: "이선해",
        title: "수석부회장",
        affiliation: "온양여고 교사\n前 충청남도수중핀수영협회 부회장",
        group: "부회장",
    },
    {
        id: 3,
        name: "김원식",
        title: "부회장",
        affiliation: "충청북도수중핀수영협회 회장",
        group: "부회장",
    },
    {
        id: 4,
        name: "강동호",
        title: "부회장",
        affiliation: "대전수중핀수영협회 부회장",
        group: "부회장",
    },
    {
        id: 5,
        name: "최상학",
        title: "부회장",
        affiliation: "㈜씨모닝 대표이사\nCMAS 스쿠버다이빙 트레이너",
        group: "부회장",
    },
    {
        id: 6,
        name: "서정길",
        title: "행정부회장",
        affiliation: "前 서울특별시체육회 부장",
        group: "부회장",
    },
    {
        id: 7,
        name: "이신현",
        title: "부회장",
        affiliation: "동아빌딩 대표\nCMAS 스쿠버다이빙 강사",
        group: "부회장",
    },
    {
        id: 8,
        name: "고윤하",
        title: "부회장",
        affiliation: "미래에셋 전무이사",
        group: "부회장",
    },
    // 이사
    {
        id: 9,
        name: "김세환",
        title: "이사",
        affiliation: "인덕대학교 교수",
        group: "이사",
    },
    {
        id: 10,
        name: "배효재",
        title: "이사",
        affiliation: "헬로맨크린 대표",
        group: "이사",
    },
    {
        id: 11,
        name: "김새한",
        title: "이사",
        affiliation: "법무법인 BH 대표변호사",
        group: "이사",
    },
    {
        id: 12,
        name: "김천대",
        title: "이사",
        affiliation: "한라실내수영장 담당자",
        group: "이사",
    },
    {
        id: 13,
        name: "이기성",
        title: "이사",
        affiliation: "㈜UWT 대표이사",
        group: "이사",
    },
    {
        id: 14,
        name: "이영준",
        title: "전무이사",
        affiliation: "숭실대학교 교수",
        group: "이사",
    },
    {
        id: 15,
        name: "박성원",
        title: "이사",
        affiliation: "CRS수영클럽 대표",
        group: "이사",
    },
    {
        id: 16,
        name: "염혜수",
        title: "이사",
        affiliation: "서울시청 핀수영감독",
        group: "이사",
    },
    {
        id: 17,
        name: "김일남",
        title: "이사",
        affiliation: "인천수중협회 부회장",
        group: "이사",
    },
    {
        id: 18,
        name: "왕현미",
        title: "이사",
        affiliation: "대전시청 핀수영감독",
        group: "이사",
    },
    {
        id: 19,
        name: "손은영",
        title: "이사",
        affiliation: "양파다이브리조트 대표",
        group: "이사",
    },
    {
        id: 20,
        name: "오나경",
        title: "이사",
        affiliation: "초등학교 체육교사",
        group: "이사",
    },
    {
        id: 21,
        name: "손지영",
        title: "이사",
        affiliation: "안양대학교 교수",
        group: "이사",
    },
    {
        id: 22,
        name: "홍혜선",
        title: "이사",
        affiliation: "광주체육고등학교 핀수영 코치",
        group: "이사",
    },
    {
        id: 23,
        name: "진건우",
        title: "이사",
        affiliation: "더베이스 대표",
        group: "이사",
    },
    {
        id: 24,
        name: "전아람",
        title: "이사",
        affiliation: "부산체육회 수영감독",
        group: "이사",
    },
    {
        id: 25,
        name: "이휘원",
        title: "이사",
        affiliation: "삼일PwC 컨설턴트",
        group: "이사",
    },
    // 감사
    {
        id: 27,
        name: "신혜철",
        title: "회계감사",
        affiliation: "고순세무회계 회계사",
        group: "감사",
    },
    {
        id: 28,
        name: "나필수",
        title: "행정감사",
        affiliation: "제주특별자치도수중핀수영협회 회장",
        group: "감사",
    },
];

const EXECUTIVE_GROUPS: { key: ExecutiveGroup; label: string }[] = [
    { key: "회장", label: "회장" },
    { key: "부회장", label: "부회장" },
    { key: "이사", label: "이사" },
    { key: "감사", label: "감사" },
];

export const ExecutivesTab = () => {
    const router = useRouter();
    const { isAdmin } = useUserRole();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setDeleteTargetId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        console.log("삭제:", deleteTargetId);
        // TODO: 실제 삭제 API 호출
        alert("삭제되었습니다.");
        setDeleteModalOpen(false);
        setDeleteTargetId(null);
    };

    const handleEdit = (id: number) => {
        router.push(`/about/executives/edit/${id}`);
    };

    const handleCreate = () => {
        router.push("/about/executives/create");
    };

    return (
        <div className="w-full bg-white px-5 pb-16 sm:px-0 sm:pb-[150px]">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-kua-black100 text-2xl font-bold sm:text-[32px]">
                        임원현황
                    </h2>
                    {isAdmin && (
                        <button
                            onClick={handleCreate}
                            className="bg-kua-main hover:bg-kua-blue600 cursor-pointer rounded-lg px-6 py-3 font-semibold text-white transition-colors"
                        >
                            추가
                        </button>
                    )}
                </div>

                {/* 임원 그룹별 카드 그리드 */}
                <div className="flex flex-col gap-10">
                    {EXECUTIVE_GROUPS.map((group) => {
                        const list = executivesData.filter(
                            (executive) => executive.group === group.key,
                        );

                        if (list.length === 0) return null;

                        return (
                            <section
                                key={group.key}
                                className="flex flex-col gap-5"
                            >
                                <h3 className="text-kua-black100 pb-3 text-xl font-bold sm:text-2xl">
                                    {group.label}
                                </h3>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                    {list.map((executive) => (
                                        <div
                                            key={executive.id}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="bg-kua-sky50 flex h-[396px] flex-col items-center rounded-[10px]">
                                                {/* 직위 */}
                                                <div className="border-kua-gray250 flex w-full flex-col items-center gap-2 border-b py-6">
                                                    <p className="text-kua-black100 text-center text-base font-bold sm:text-lg">
                                                        {executive.title}
                                                    </p>
                                                </div>

                                                {/* 이미지 */}
                                                <div className="flex items-center justify-center p-5">
                                                    <div className="bg-kua-gray300 flex h-[80px] w-[80px] items-center justify-center rounded-full sm:h-[120px] sm:w-[120px]">
                                                        <svg
                                                            width="60"
                                                            height="60"
                                                            viewBox="0 0 60 60"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M30 30C35.5228 30 40 25.5228 40 20C40 14.4772 35.5228 10 30 10C24.4772 10 20 14.4772 20 20C20 25.5228 24.4772 30 30 30Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M30 35C20 35 12 40 12 47.5V50H48V47.5C48 40 40 35 30 35Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* 이름 */}
                                                <h4 className="text-kua-black100 text-xl font-bold sm:text-2xl">
                                                    {executive.name}
                                                </h4>

                                                {/* 소속/설명 */}
                                                <p className="text-kua-black100 px-10 pt-3 pb-6 text-center text-sm leading-relaxed whitespace-pre-line sm:text-base">
                                                    {executive.affiliation}
                                                </p>
                                            </div>

                                            {/* 관리자 버튼 */}
                                            {isAdmin && (
                                                <div className="flex w-full justify-center gap-3 px-4 pt-2 pb-4 sm:pt-4">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                executive.id,
                                                            )
                                                        }
                                                        className="hover:bg-kua-sky300 hover:text-kua-white text-kua-sky300 border-kua-sky300 w-16 cursor-pointer rounded-md border py-2 text-sm font-medium transition-colors sm:text-[15px]"
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                executive.id,
                                                            )
                                                        }
                                                        className="hover:bg-kua-orange500 hover:text-kua-white text-kua-orange500 border-kua-orange500 w-16 cursor-pointer rounded-md border py-2 text-sm font-medium transition-colors sm:text-[15px]"
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>

            {/* 삭제 확인 모달 */}
            <ConfirmModal
                isOpen={deleteModalOpen}
                title="임원 삭제"
                message="정말로 이 임원 정보를 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
                confirmButtonClass="bg-kua-orange500 hover:bg-kua-orange600 text-white"
            />
        </div>
    );
};

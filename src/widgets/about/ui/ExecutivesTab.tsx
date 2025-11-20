"use client";

import { useState } from "react";
import { Pagination } from "@/shared/ui/Pagination";

type Executive = {
    id: number;
    name: string;
    position: string;
    description: string;
    image?: string;
};

// 임원 데이터
const executivesData: Executive[] = [
    {
        id: 1,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 2,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 3,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 4,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 5,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 6,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 7,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 8,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 9,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 10,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 11,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 12,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 13,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 14,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 15,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 16,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 17,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 18,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },

    {
        id: 19,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        id: 20,
        name: "정상엽",
        position: "경기력향상위원회",
        description: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
];

export const ExecutivesTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;
    const totalPages = Math.ceil(executivesData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentExecutives = executivesData.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    return (
        <div className="w-full bg-white pb-[150px]">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
                <h2 className="text-kua-black100 text-[32px] font-bold">
                    임원현황
                </h2>

                {/* 임원 카드 그리드 */}
                <div className="grid grid-cols-4 gap-5">
                    {currentExecutives.map((executive) => (
                        <div
                            key={executive.id}
                            className="bg-kua-sky50 flex flex-col items-center rounded-[10px]"
                        >
                            {/* 위원회명 */}
                            <div className="border-kua-gray250 flex w-full flex-col items-center gap-2 border-b py-6">
                                <p className="text-kua-black100 text-center text-lg font-bold">
                                    {executive.position}
                                </p>
                            </div>

                            {/* 이미지 */}
                            <div className="flex items-center justify-center p-5">
                                <div className="bg-kua-gray300 flex h-[120px] w-[120px] items-center justify-center rounded-full">
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
                            <h3 className="text-kua-black100 text-2xl font-bold">
                                {executive.name}
                            </h3>

                            {/* 설명 */}
                            <p className="text-kua-black100 px-10 pt-3 pb-6 text-center text-base leading-relaxed">
                                {executive.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

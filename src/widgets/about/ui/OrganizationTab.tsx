"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";

// 각종 위원회 데이터 타입
type Committee = {
    name: string;
    chairman: string;
    secretary: string;
    function: string;
};

// 시/도 지부 데이터 타입
type Branch = {
    name: string;
    president: string;
    phone: string;
    email: string;
};

// 각종 위원회 데이터
const committeeData: Committee[] = [
    {
        name: "스포츠공정위원회",
        chairman: "이OO",
        secretary: "엄서영 (윤흥남)",
        function: "각종 규정제정 및 개정, 표창 및 징계 결정",
    },
    {
        name: "경기력향상위원회",
        chairman: "정상엽",
        secretary: "김수오 (김광호)",
        function: "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
    },
    {
        name: "대회위원회",
        chairman: "정상훈",
        secretary: "김광호",
        function: "대회 시설 및 운영",
    },
    {
        name: "심판위원회",
        chairman: "김진우",
        secretary: "김광호 (정한걸)",
        function: "각종 경기대회의 심판업무에 관하여 검토 및 심의",
    },
    {
        name: "학교운동부지도자위원회",
        chairman: "김지혜",
        secretary: "정한걸",
        function: "학교 운동부 지도자 위원회",
    },
    {
        name: "선수위원회",
        chairman: "조종오",
        secretary: "김수오",
        function: "선수의 권익을 보호, 증진 및 페어플레이 정신 함양",
    },
    {
        name: "도핑위원회",
        chairman: "전영석",
        secretary: "이다정 (엄서영)",
        function: "선수 도핑 관련 위원회",
    },
    {
        name: "인사위원회",
        chairman: "오진형",
        secretary: "엄서영 (윤흥남)",
        function: "직원채용 및 직원 인사운영에 관한 주요 사항 검토 및 심의",
    },
    {
        name: "기술위원회 (스킨스쿠버)",
        chairman: "김성준",
        secretary: "고국현",
        function: "스킨스쿠버, 인명구조 강습회, 기술자문 등",
    },
    {
        name: "기술위원회 (프리다이빙)",
        chairman: "송원신",
        secretary: "정한걸 (김수오)",
        function: "프리다이빙 대회, 강습회, 기술자문 등",
    },
];

// 시/도 지부 데이터
const branchData: Branch[] = [
    {
        name: "서울특별시수중·핀수영협회",
        president: "구자균",
        phone: "02-490-2946",
        email: "finseoul401@naver.com",
    },
    {
        name: "부산광역시수중·핀수영협회",
        president: "채재익",
        phone: "-",
        email: "-",
    },
    {
        name: "대구광역시수중·핀수영협회",
        president: "김경인",
        phone: "-",
        email: "-",
    },
    {
        name: "인천광역시수중·핀수영협회",
        president: "김준호",
        phone: "-",
        email: "namth76@naver.com",
    },
    {
        name: "광주광역시수중·핀수영협회",
        president: "박성범",
        phone: "062-522-6070",
        email: "sea6070@hanmail.net",
    },
    {
        name: "대전광역시수중·핀수영협회",
        president: "김현태",
        phone: "-",
        email: "-",
    },
    {
        name: "울산광역시수중·핀수영협회",
        president: "정동호",
        phone: "-",
        email: "-",
    },
    {
        name: "경기도수중·핀수영협회",
        president: "-",
        phone: "-",
        email: "-",
    },
    {
        name: "강원특별자치도수중·핀수영협회",
        president: "서일민",
        phone: "033-645-6005",
        email: "kimjwlg@hanmail.net",
    },
    {
        name: "충청북도수중·핀수영협회",
        president: "김원식",
        phone: "-",
        email: "-",
    },
    {
        name: "충청남도수중·핀수영협회",
        president: "박상배",
        phone: "-",
        email: "-",
    },
    {
        name: "전라북도수중·핀수영협회",
        president: "조 준",
        phone: "-",
        email: "-",
    },
    {
        name: "전라남도수중·핀수영협회",
        president: "-",
        phone: "-",
        email: "-",
    },
    {
        name: "경상북도수중·핀수영협회",
        president: "이종우",
        phone: "-",
        email: "-",
    },
    {
        name: "경상남도수중·핀수영협회",
        president: "정연태",
        phone: "-",
        email: "gmdtc@hanmail.net",
    },
    {
        name: "제주특별자치도수중·핀수영협회",
        president: "나필수",
        phone: "-",
        email: "-",
    },
];

// 각종 위원회 컬럼 정의
const committeeColumns: Column<Committee>[] = [
    {
        key: "name",
        header: "위원회명",
        className: "w-[25%] bg-kua-sky50",
    },
    {
        key: "chairman",
        header: "위원장",
        className: "w-[15%]",
    },
    {
        key: "secretary",
        header: "간사",
        className: "w-[20%]",
    },
    {
        key: "function",
        header: "주요기능",
        className: "w-[40%]",
    },
];

// 시/도 지부 컬럼 정의
const branchColumns: Column<Branch>[] = [
    {
        key: "name",
        header: "지부명",
        className: "w-[30%] bg-kua-sky50",
    },
    {
        key: "president",
        header: "회장",
        className: "w-[15%]",
    },
    {
        key: "phone",
        header: "대표유선전화",
        className: "w-[20%]",
    },
    {
        key: "email",
        header: "대표메일주소",
        className: "w-[35%]",
    },
];

export const OrganizationTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentHash, setCurrentHash] = useState<string>("");
    const pageSize = 100;

    // URL hash 추적
    useEffect(() => {
        const updateHash = () => {
            setCurrentHash(window.location.hash.slice(1)); // '#' 제거
        };

        // 초기 hash 설정
        updateHash();

        // hash 변경 감지
        window.addEventListener("hashchange", updateHash);

        // 같은 페이지 내에서도 hash 변경을 감지하기 위한 polling
        const interval = setInterval(updateHash, 100);

        return () => {
            window.removeEventListener("hashchange", updateHash);
            clearInterval(interval);
        };
    }, []);

    // hash에 따라 탭 결정
    const activeTab = useMemo<"committee" | "branch">(() => {
        if (currentHash === "branches") {
            return "branch";
        }
        // 기본값 또는 "committees"일 때는 "committee"
        return "committee";
    }, [currentHash]);

    // hash에 따라 스크롤 처리
    useEffect(() => {
        if (currentHash === "committees") {
            // 탭 변경 후 스크롤 (약간의 지연으로 탭 전환 후 스크롤)
            setTimeout(() => {
                const element = document.getElementById("committees");
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 150);
        } else if (currentHash === "branches") {
            // 탭 변경 후 스크롤
            setTimeout(() => {
                const element = document.getElementById("branches");
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 150);
        } else if (currentHash === "organization") {
            const element = document.getElementById("organization");
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    }, [currentHash]);

    // 페이지네이션 계산 (각종 위원회만)
    const totalPages =
        activeTab === "committee"
            ? Math.ceil(committeeData.length / pageSize)
            : 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedCommitteeData =
        activeTab === "committee"
            ? committeeData.slice(startIndex, startIndex + pageSize)
            : committeeData;

    const handleTabChange = (tab: "committee" | "branch") => {
        // hash를 변경하여 탭 전환 (hash 변경이 activeTab을 자동으로 업데이트함)
        const hash = tab === "committee" ? "#committees" : "#branches";
        window.location.hash = hash;
        setCurrentPage(1);
    };

    return (
        <div className="w-full bg-white px-5 pb-16 sm:px-0 sm:pb-[150px]">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-20 sm:gap-50">
                {/* 협회 조직도 섹션 */}
                <div id="organization" className="flex w-full flex-col">
                    <h2 className="text-kua-darkblue800 text-2xl font-bold sm:text-[32px]">
                        협회 조직도
                    </h2>
                    <Image
                        src="/imgs/organization/organization-2.png"
                        alt="organization"
                        width={900}
                        height={1000}
                        className="block w-full sm:hidden"
                    />
                    <Image
                        src="/imgs/organization/organization.png"
                        alt="organization"
                        width={1200}
                        height={982}
                        className="hidden w-full sm:block"
                    />
                </div>

                {/* 탭 테이블 섹션 */}
                <div className="flex w-full flex-col gap-5 sm:gap-0">
                    {/* 커스텀 탭 */}
                    <div className="flex w-full gap-2 sm:gap-0">
                        <button
                            onClick={() => handleTabChange("committee")}
                            className={`flex h-[42px] w-[350px] cursor-pointer items-center justify-center rounded-t-[10px] rounded-b-[10px] text-lg font-semibold transition-colors sm:h-[60px] sm:rounded-b-none ${
                                activeTab === "committee"
                                    ? "bg-kua-main text-white"
                                    : "bg-kua-sky50 text-kua-gray600 border-kua-gray400 hover:bg-kua-main text-kua-main border hover:text-white"
                            }`}
                        >
                            각종 위원회 소개
                        </button>
                        <button
                            onClick={() => handleTabChange("branch")}
                            className={`flex h-[42px] w-[350px] cursor-pointer items-center justify-center rounded-t-[10px] rounded-b-[10px] text-lg font-semibold transition-colors sm:h-[60px] sm:rounded-b-none ${
                                activeTab === "branch"
                                    ? "bg-kua-main text-white"
                                    : "bg-kua-sky50 text-kua-gray600 border-kua-gray400 hover:bg-kua-main text-kua-main border hover:text-white"
                            }`}
                        >
                            시/도 지부 소개
                        </button>
                    </div>

                    {/* 테이블 */}
                    <div className="w-full">
                        {activeTab === "committee" ? (
                            <div id="committees">
                                <DataTable
                                    columns={committeeColumns}
                                    data={paginatedCommitteeData}
                                />
                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                )}
                            </div>
                        ) : (
                            <div id="branches">
                                <DataTable
                                    columns={branchColumns}
                                    data={branchData}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

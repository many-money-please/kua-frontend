import { CompetitionInfoContent } from "@/widgets/competition_info";

// 대회일정 데이터 타입
type CompetitionSchedule = {
    id: number;
    category: "국제" | "국내";
    title: string;
    location: string;
    competitionPeriod: string;
    applicationPeriod: string;
    status: string;
};

// 대회결과 데이터 타입
type CompetitionResult = {
    id: number;
    title: string;
    date: string;
    winner: string;
    category: string;
};

const scheduleData: CompetitionSchedule[] = Array.from(
    { length: 32 },
    (_, index) => ({
        id: index + 1,
        category: index % 2 === 0 ? "국내" : "국제",
        title:
            index % 2 === 0
                ? `제17회 전국해양스포츠제전 ${index + 1}`
                : "제17회 전국해양스포츠제전 겸 제14회 대한체육회장배 전국생활체육 장거리...",
        location:
            index % 3 === 0
                ? "경기도 시흥시 거북섬 앞"
                : "경기도 시흥시 거북섬 앞 수면(시화호)",
        competitionPeriod: "25-12-20 ~ 25-12-20",
        applicationPeriod: "25-12-20 ~ 25-12-20",
        status: "결과 발표",
    }),
);

const resultData: CompetitionResult[] = Array.from(
    { length: 20 },
    (_, index) => ({
        id: index + 1,
        title:
            index % 2 === 0
                ? "제8회 전국프리다이빙선수권대회"
                : "2024 KUA 오픈워터 챔피언십",
        date: "2024.10.15",
        winner: index % 2 === 0 ? "홍길동" : "김철수",
        category: index % 2 === 0 ? "남자 개인전" : "여자 개인전",
    }),
);

export default function CompetitionInfoPage() {
    return (
        <div className="bg-kua-white flex w-full justify-center">
            <main className="flex w-full max-w-[1200px] flex-col gap-8 px-16 py-12">
                <CompetitionInfoContent
                    scheduleData={scheduleData}
                    resultData={resultData}
                />
            </main>
        </div>
    );
}

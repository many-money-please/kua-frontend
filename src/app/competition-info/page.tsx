import { CompetitionInfoContent } from "@/widgets/competition-info";

// 대회일정 데이터 타입
type CompetitionSchedule = {
    id: number;
    category: "국제" | "국내";
    title: string;
    location: string;
    competitionPeriod: string;
    applicationPeriod: string;
    status: "모집중" | "신청 완료" | "대회 진행중" | "대회 종료";
};

// 대회결과 데이터 타입
type CompetitionResult = {
    id: number;
    category: "국제" | "국내";
    title: string;
    location: string;
    competitionPeriod: string;
    applicationPeriod: string;
    status: "결과 발표";
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
        status:
            index % 4 === 0
                ? "모집중"
                : index % 4 === 1
                  ? "신청 완료"
                  : index % 4 === 2
                    ? "대회 진행중"
                    : "대회 종료",
    }),
);

const resultData: CompetitionResult[] = Array.from(
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

import type { Metadata } from "next";
import {
    Community,
    CompanyCarousel,
    CompetitionNews,
    CompetitionSchedule,
    HeroCarousel,
    OurRole,
} from "@/widgets/main";

export const metadata: Metadata = {
    title: "홈 | 대한수중 핀수영협회",
    description:
        "대한수중핀수영협회 공식 홈페이지. 핀수영, 프리다이빙, 수중사진 등 다양한 수중 스포츠 정보와 대회 일정, 커뮤니티 소식을 제공합니다.",
    openGraph: {
        title: "대한수중 핀수영협회",
        description:
            "대한수중핀수영협회 공식 홈페이지. 핀수영, 프리다이빙, 수중사진 등 다양한 수중 스포츠 정보를 제공합니다.",
        type: "website",
    },
};

export default function Home() {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between gap-24 overflow-x-hidden">
                <HeroCarousel />
                <OurRole />
                <CompetitionSchedule />
                <Community />
                <CompetitionNews />
                <CompanyCarousel />
            </main>
        </div>
    );
}

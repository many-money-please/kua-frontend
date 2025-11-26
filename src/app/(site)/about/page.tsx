import type { Metadata } from "next";
import { PresidentSpeech, History, CI, FindUs } from "@/widgets/about";

export const metadata: Metadata = {
    title: "협회소개 | 대한수중 핀수영협회",
    description:
        "대한수중핀수영협회의 협회장 인사말, 연혁, CI 소개, 조직현황, 찾아오시는 길 등의 정보를 확인하실 수 있습니다.",
};

export default function AboutPage() {
    return (
        <>
            {/* 협회장 인사말 */}
            <PresidentSpeech />
            {/* 연혁 */}
            <History />
            {/* C.I 소개 */}
            <CI />
            {/* 찾아오시는 길 */}
            <FindUs />
        </>
    );
}

import { PresidentSpeech, History, CI, FindUs } from "@/widgets/about";

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

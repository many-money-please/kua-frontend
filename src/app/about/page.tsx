import { PageBanner } from "@/shared/ui/PageBanner";
import {
    AboutTabs,
    PresidentSpeech,
    History,
    CI,
    FindUs,
} from "@/widgets/about";

export default function About() {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <PageBanner
                    title="협회소개"
                    description="대한수중핀수영협회를 소개합니다."
                    breadcrumbs={["협회소개", "협회소개"]}
                />
                <AboutTabs />
                {/* 협회장 인사말 */}
                <PresidentSpeech />
                {/* 연혁 */}
                <History />
                {/* C.I 소개 */}
                <CI />
                {/* 찾아오시는 길 */}
                <FindUs />
            </main>
        </div>
    );
}

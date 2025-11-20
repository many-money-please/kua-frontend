import type { ReactNode } from "react";
import {
    CompetitionInfoBanner,
    CompetitionInfoTabs,
    PlayerInfoTabs,
} from "@/widgets/competition-info";

export default function CompetitionInfoLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <CompetitionInfoBanner />
                <CompetitionInfoTabs />
                <PlayerInfoTabs />
                {children}
            </main>
        </div>
    );
}

import type { ReactNode } from "react";
import {
    CompetitionInfoBanner,
    CompetitionInfoTabs,
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
                {children}
            </main>
        </div>
    );
}

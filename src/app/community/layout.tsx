import type { ReactNode } from "react";
import { CommunityBanner, CommunityTabs } from "@/widgets/community";

export default function CommunityLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <CommunityBanner />
                <CommunityTabs />
                {children}
            </main>
        </div>
    );
}

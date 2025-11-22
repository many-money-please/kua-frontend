import type { ReactNode } from "react";
import {
    AssociationBanner,
    CommunityBanner,
    CommunityTabs,
    AssociationNewsTabs,
} from "@/widgets/community";

export default function CommunityLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <CommunityBanner />
                <AssociationBanner />
                <CommunityTabs />
                <AssociationNewsTabs />
                {children}
            </main>
        </div>
    );
}

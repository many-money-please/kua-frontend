import type { ReactNode } from "react";
import {
    AssociationBanner,
    CommunityBanner,
    CommunityTabs,
    AssociationNewsTabs,
} from "@/widgets/community";

export default function CommunityLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
                <CommunityBanner />
                <AssociationBanner />
                <CommunityTabs />
                <AssociationNewsTabs />
                {children}
            </main>
        </div>
    );
}

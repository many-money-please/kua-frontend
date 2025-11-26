import type { ReactNode } from "react";
import { FreeDivingBanner, FreeDivingTabs } from "@/widgets/free-diving";

export default function FreeDivingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
                <FreeDivingBanner />
                <FreeDivingTabs />
                {children}
            </main>
        </div>
    );
}


import type { ReactNode } from "react";
import { ScubaDivingBanner, ScubaDivingTabs } from "@/widgets/scuba-diving";

export default function ScubaDivingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
                <ScubaDivingBanner />
                <ScubaDivingTabs />
                {children}
            </main>
        </div>
    );
}


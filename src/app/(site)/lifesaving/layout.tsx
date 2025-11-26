import type { ReactNode } from "react";
import { LifesavingBanner, LifesavingTabs } from "@/widgets/lifesaving";

export default function LifesavingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
                <LifesavingBanner />
                <LifesavingTabs />
                {children}
            </main>
        </div>
    );
}


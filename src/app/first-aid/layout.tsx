import type { ReactNode } from "react";
import { FirstAidBanner, FirstAidTabs } from "@/widgets/first-aid";

export default function FirstAidLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
                <FirstAidBanner />
                <FirstAidTabs />
                {children}
            </main>
        </div>
    );
}


import type { ReactNode } from "react";
import { FinSwimmingBanner, FinSwimmingTabs } from "@/widgets/fin-swimming";

export default function FinSwimmingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center overflow-x-hidden">
            <main className="flex w-full max-w-full flex-col items-center justify-between overflow-x-hidden">
                <FinSwimmingBanner />
                <FinSwimmingTabs />
                {children}
            </main>
        </div>
    );
}

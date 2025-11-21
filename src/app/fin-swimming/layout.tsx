import type { ReactNode } from "react";
import { FinSwimmingBanner, FinSwimmingTabs } from "@/widgets/fin-swimming";

export default function FinSwimmingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <FinSwimmingBanner />
                <FinSwimmingTabs />
                {children}
            </main>
        </div>
    );
}

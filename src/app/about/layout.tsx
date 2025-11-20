import type { ReactNode } from "react";
import { AboutBanner, AboutTabs } from "@/widgets/about";

export default function AboutLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <AboutBanner />
                <AboutTabs />
                {children}
            </main>
        </div>
    );
}

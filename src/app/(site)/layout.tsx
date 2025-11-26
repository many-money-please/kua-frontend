import type { ReactNode } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ScrollToTopButton } from "@/widgets/common";

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-kua-gray50 min-h-screen">
            <main className="mx-auto w-full max-w-[1200px] px-5 py-10">
                {children}
            </main>
        </div>
    );
}

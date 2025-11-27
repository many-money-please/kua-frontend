"use client";

import { Suspense } from "react";
import { HistoryManager } from "@/widgets/admin/about/history/HistoryManager";

export default function HistoryPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <HistoryManager />
        </Suspense>
    );
}


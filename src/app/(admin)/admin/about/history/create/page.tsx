"use client";

import { Suspense } from "react";
import { HistoryCreateForm } from "@/widgets/admin/about/history/HistoryCreateForm";

export default function HistoryCreatePage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <HistoryCreateForm />
        </Suspense>
    );
}

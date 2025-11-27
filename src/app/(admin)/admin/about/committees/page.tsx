"use client";

import { Suspense } from "react";
import { CommitteesManager } from "@/widgets/admin/about/committees/CommitteesManager";

export default function CommitteesPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <CommitteesManager />
        </Suspense>
    );
}


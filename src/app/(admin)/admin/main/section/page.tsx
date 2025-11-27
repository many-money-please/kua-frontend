"use client";

import { Suspense } from "react";
import { MainSectionManager } from "@/widgets/admin/main/MainSectionManager";

export default function SectionManagementPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <MainSectionManager />
        </Suspense>
    );
}

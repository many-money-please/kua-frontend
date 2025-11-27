"use client";

import { Suspense } from "react";
import { MainPopupManager } from "@/widgets/admin/main/MainPopupManager";

export default function PopupManagementPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <MainPopupManager />
        </Suspense>
    );
}


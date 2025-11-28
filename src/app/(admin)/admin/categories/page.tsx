"use client";

import { Suspense } from "react";
import { CategoriesManager } from "@/widgets/admin/categories/CategoriesManager";

export default function CategoriesManagementPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <CategoriesManager />
        </Suspense>
    );
}

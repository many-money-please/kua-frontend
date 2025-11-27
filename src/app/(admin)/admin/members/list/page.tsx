"use client";

import { Suspense } from "react";
import { MembersListManager } from "@/widgets/admin/members/MembersListManager";

export default function MembersListPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <MembersListManager />
        </Suspense>
    );
}


"use client";

import { Suspense } from "react";
import { WithdrawnMembersManager } from "@/widgets/admin/members/WithdrawnMembersManager";

export default function WithdrawnMembersPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <WithdrawnMembersManager />
        </Suspense>
    );
}


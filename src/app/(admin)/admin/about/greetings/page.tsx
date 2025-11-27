"use client";

import { Suspense } from "react";
import { GreetingsManager } from "@/widgets/admin/about/greetings/GreetingsManager";

export default function GreetingsPage() {
    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <GreetingsManager />
        </Suspense>
    );
}


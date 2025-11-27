import { Suspense } from "react";
import { DisclosureTab } from "@/widgets/about";

export default function DisclosurePage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <DisclosureTab />
        </Suspense>
    );
}

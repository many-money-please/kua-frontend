import { Suspense } from "react";
import { RegulationsTab } from "@/widgets/about";

export default function RegulationsPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <RegulationsTab />
        </Suspense>
    );
}

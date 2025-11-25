import type { Metadata } from "next";
import { OrganizationTab } from "@/widgets/about";

export const metadata: Metadata = {
    title: "조직현황 | 협회소개 | 대한수중 핀수영협회",
    description:
        "대한수중핀수영협회의 조직 구조와 부서별 업무를 확인하실 수 있습니다.",
};

export default function OrganizationPage() {
    return <OrganizationTab />;
}

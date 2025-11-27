"use client";

import { BaseTabs } from "@/shared/ui/Tabs";
import { usePathname } from "next/navigation";

const TABS_BASE_PATHS = [
    "/competition-info/registration/competition-application",
    "/competition-info/registration/athlete-registration",
    "/competition-info/registration/certificate-issuance",
];

const tabs = [
    {
        label: "대회 참가 신청",
        path: "/competition-info/registration/competition-application",
    },
    {
        label: "경기인 등록",
        path: "/competition-info/registration/athlete-registration",
    },
    {
        label: "증명서 발급",
        path: "/competition-info/registration/certificate-issuance",
    },
];

export const RegistrationTabs = () => {
    const pathname = usePathname();
    const shouldRender =
        pathname.startsWith("/competition-info/registration") &&
        (TABS_BASE_PATHS.includes(pathname) ||
            pathname === "/competition-info/registration");

    if (!shouldRender) {
        return null;
    }

    return <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px]" />;
};

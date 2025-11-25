import type { Metadata } from "next";
import { PageBanner } from "@/shared/ui/PageBanner";
import { AuthTabs, FindIdForm } from "@/widgets/auth";

export const metadata: Metadata = {
    title: "아이디 찾기 | 대한수중 핀수영협회",
    description: "등록된 이름과 이메일로 회원 아이디를 찾으실 수 있습니다.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function FindIdPage() {
    return (
        <div className="bg-kua-white flex items-center justify-center pb-[150px]">
            <main className="flex w-full flex-col items-center justify-between">
                <PageBanner
                    title="로그인"
                    description="로그인하시면 보다 편리하게 서비스 이용이 가능합니다."
                    breadcrumbs={["회원서비스", "로그인"]}
                />
                <div className="mx-auto w-full max-w-[1200px]">
                    <AuthTabs activeTab="login" />
                    <FindIdForm />
                </div>
            </main>
        </div>
    );
}

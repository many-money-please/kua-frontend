import type { Metadata } from "next";
import { PageBanner } from "@/shared/ui/PageBanner";
import { AuthTabs, FindPasswordForm } from "@/widgets/auth";

export const metadata: Metadata = {
    title: "비밀번호 찾기 | 대한수중 핀수영협회",
    description:
        "아이디, 이름, 이메일을 입력하여 임시 비밀번호를 발급받을 수 있습니다.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function FindPasswordPage() {
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
                    <FindPasswordForm />
                </div>
            </main>
        </div>
    );
}

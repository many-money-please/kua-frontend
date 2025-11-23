import { PageBanner } from "@/shared/ui/PageBanner";
import { AuthTabs, LoginForm } from "@/widgets/auth";

export default function LoginPage() {
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
                    <LoginForm />
                </div>
            </main>
        </div>
    );
}

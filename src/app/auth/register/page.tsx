import { PageBanner } from "@/shared/ui/PageBanner";
import { AuthTabs, RegisterForm } from "@/widgets/auth";

export default function RegisterPage() {
    return (
        <div className="bg-kua-white flex items-center justify-center pb-[150px]">
            <main className="flex w-full flex-col items-center justify-between">
                <PageBanner
                    title="회원가입"
                    description="로그인하시면 보다 편리하게 서비스 이용이 가능합니다."
                    breadcrumbs={["회원서비스", "회원가입"]}
                />
                <div className="mx-auto w-full max-w-[1200px]">
                    <AuthTabs activeTab="register" />
                    <RegisterForm />
                </div>
            </main>
        </div>
    );
}

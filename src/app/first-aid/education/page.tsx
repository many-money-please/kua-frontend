import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "교육 안내 | 종목소개 | 대한수중 핀수영협회",
    description:
        "응급처치 교육 과정 및 안내를 확인하실 수 있습니다.",
};

export default function EducationPage() {
    return (
        <div className="mx-auto mb-20 w-full max-w-[1200px] px-4">
            <div className="mx-auto flex w-full flex-col gap-16">
                <div className="flex flex-col gap-6">
                    <h2 className="text-[32px] font-bold">교육 과정 안내</h2>
                    <p className="text-lg">
                        응급처치 교육 과정에 대한 상세한 안내를 제공합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}


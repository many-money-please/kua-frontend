import Image from "next/image";
import { ReactNode } from "react";

type StepData = {
    stepNumber: string;
    title: string;
    description: ReactNode;
};

const steps: StepData[] = [
    {
        stepNumber: "01",
        title: "증명서 발급 신청서 제출",
        description: (
            <>
                · 신청서 작성 및 제출 (이메일: kua@kua.or.kr / 팩스:
                02-421-8898)
            </>
        ),
    },
    {
        stepNumber: "02",
        title: "협회(담당자) 접수 및 확인",
        description: (
            <>
                · 발급비용 입금: 1부당 3,000원 (계좌번호 : 하나은행
                252-890009-80004 대한수중핀수영협회)
                <br />· 발급비용 입금 후 담당자 통화 (접수 및 확인용,
                02-420-4293)
            </>
        ),
    },
    {
        stepNumber: "03",
        title: "증명서 발급 및 전송 (이메일, 메신저 등)",
        description: (
            <>
                · 증명서 발급 및 전송 (이메일, 메신저 등)
                <p className="text-kua-sky300">
                    ※ 발급소요시간의 경우 접수 후 2~3일 소요
                </p>
            </>
        ),
    },
];

type StepCardProps = {
    stepNumber: string;
    title: string;
    description: ReactNode;
    isLast?: boolean;
};

function StepCard({ stepNumber, title, description, isLast }: StepCardProps) {
    return (
        <>
            <div className="flex items-center gap-8">
                <div className="text-kua-main flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-[10px] bg-[#B3D3F3] font-bold">
                    <span className="text-xl">STEP</span>
                    <span className="text-[40px]">{stepNumber}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-kua-white text-3xl font-bold">
                        {title}
                    </h3>
                    <p className="text-kua-white">{description}</p>
                </div>
            </div>
            {!isLast && <div className="bg-kua-blue300/50 h-px w-full" />}
        </>
    );
}

export function CertificateIssuanceGuide() {
    return (
        <div className="bg-kua-main w-full">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 py-24">
                <h2 className="text-kua-white text-[40px] font-bold">
                    대한수중·핀수영협회 증명서 발급 안내
                </h2>
                <div className="flex w-full items-stretch gap-8">
                    <div className="relative w-full flex-1 overflow-hidden rounded-[10px]">
                        <Image
                            src="/imgs/competition-info/competition-info02.png"
                            alt="competition-info02"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex w-full flex-3 flex-col gap-12">
                        {steps.map((step, index) => (
                            <StepCard
                                key={index}
                                stepNumber={step.stepNumber}
                                title={step.title}
                                description={step.description}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

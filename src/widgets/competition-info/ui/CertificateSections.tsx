import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

export type CertificateCard = {
    icon: React.ReactNode;
    title: React.ReactNode;
    href?: string;
};

export type CertificateSection = {
    title: string;
    logo: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    };
    subtitle: string;
    cards: CertificateCard[];
    notice?: React.ReactNode;
};

type CertificateSectionCardProps = {
    section: CertificateSection;
};

function CertificateSectionCard({ section }: CertificateSectionCardProps) {
    return (
        <div className="flex w-full max-w-[1200px] flex-col gap-8">
            <h2 className="text-2xl font-bold sm:text-[32px]">
                {section.title}
            </h2>

            <div className="bg-kua-sky50 flex flex-col gap-4 rounded-[10px] p-6">
                {/* 서브타이틀 바 */}
                <div className="flex flex-col gap-2 rounded-[10px] sm:flex-row sm:items-center sm:gap-8">
                    <div
                        className="relative"
                        style={{
                            width: section.logo.width || 160,
                            height: section.logo.height || 80,
                        }}
                    >
                        <Image
                            src={section.logo.src}
                            alt={section.logo.alt}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="bg-kua-gray300 hidden h-12 w-px sm:block" />
                    <h3 className="text-kua-gray800 text-base font-bold sm:text-2xl">
                        {section.subtitle}
                    </h3>
                </div>

                {/* 증명서 카드 그리드 */}
                <div
                    className={`grid gap-6 ${
                        section.cards.length === 1
                            ? "sm:grid-cols-1"
                            : section.cards.length === 2
                              ? "sm:grid-cols-2"
                              : section.cards.length === 3
                                ? "sm:grid-cols-3"
                                : "sm:grid-cols-4"
                    }`}
                >
                    {section.cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-kua-white flex flex-col items-center justify-between gap-6 rounded-[10px] px-5 py-10 shadow-sm"
                        >
                            <div className="flex h-20 w-20 items-center justify-center">
                                {card.icon}
                            </div>
                            <h4 className="text-center text-base font-bold sm:text-2xl">
                                {card.title}
                            </h4>
                            <button className="bg-kua-white hover:bg-kua-sky100 border-kua-gray400 flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border px-8 py-2 text-base font-medium transition-colors sm:text-xl">
                                바로가기
                                <FaChevronRight className="text-sm" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* 안내 문구 */}
                {section.notice && (
                    <div className="text-kua-gray400 text-base sm:text-lg">
                        {section.notice}
                    </div>
                )}
            </div>
        </div>
    );
}

type CertificateSectionsProps = {
    sections: CertificateSection[];
};

export function CertificateSections({ sections }: CertificateSectionsProps) {
    return (
        <div className="flex w-full flex-col items-center gap-24 px-5 sm:px-0">
            {sections.map((section, index) => (
                <CertificateSectionCard key={index} section={section} />
            ))}
        </div>
    );
}

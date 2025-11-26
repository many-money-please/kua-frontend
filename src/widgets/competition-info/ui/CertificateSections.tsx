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
            <h2 className="text-[32px] font-bold">{section.title}</h2>

            <div className="bg-kua-sky50 flex flex-col gap-4 rounded-[10px] p-6">
                {/* 서브타이틀 바 */}
                <div className="flex items-center gap-8 rounded-[10px]">
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
                    <div className="bg-kua-gray300 h-12 w-px" />
                    <h3 className="text-kua-gray800 text-2xl font-bold">
                        {section.subtitle}
                    </h3>
                </div>

                {/* 증명서 카드 그리드 */}
                <div
                    className={`grid gap-6 ${
                        section.cards.length === 1
                            ? "grid-cols-1"
                            : section.cards.length === 2
                              ? "grid-cols-2"
                              : section.cards.length === 3
                                ? "grid-cols-3"
                                : "grid-cols-4"
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
                            <h4 className="text-center text-2xl font-bold">
                                {card.title}
                            </h4>
                            <button className="bg-kua-white hover:bg-kua-sky100 border-kua-gray400 flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border px-8 py-2 text-base font-medium transition-colors">
                                바로가기
                                <FaChevronRight className="text-sm" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* 안내 문구 */}
                {section.notice && (
                    <div className="text-kua-gray400 text-sm">
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
        <div className="flex w-full flex-col items-center gap-24">
            {sections.map((section, index) => (
                <CertificateSectionCard key={index} section={section} />
            ))}
        </div>
    );
}

import Image from "next/image";

interface PageBannerProps {
    title: string;
    description: string;
    breadcrumbs: string[];
}

export const PageBanner = ({
    title,
    description,
    breadcrumbs,
}: PageBannerProps) => {
    return (
        <div className="relative h-[250px] w-full overflow-hidden rounded-b-[20px] sm:h-[400px]">
            <div
                className="absolute inset-0 2xl:mx-[60px] 2xl:rounded-[20px] 2xl:px-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(36, 64, 143) 0%, rgba(64, 102, 159) 100%)",
                }}
            ></div>
            <Image
                src="/imgs/about/mask-group.svg"
                alt="page_banner_bg"
                width={1920}
                height={400}
                className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-start justify-center gap-6 px-5 text-white sm:px-0">
                <div className="flex items-center justify-center gap-5">
                    <Image
                        src="/imgs/about/home.svg"
                        alt="home"
                        width={20}
                        height={20}
                    />
                    {breadcrumbs.map((breadcrumb, index) => (
                        <div key={index} className="flex items-center gap-5">
                            <Image
                                src="/imgs/about/arrow-right.svg"
                                alt="arrow-right"
                                width={8}
                                height={12}
                            />
                            <p className="font-medium">{breadcrumb}</p>
                        </div>
                    ))}
                </div>
                <p className="text-3xl font-bold sm:text-[40px]">{title}</p>
                <p className="text-kua-gray300 text-sm sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
};

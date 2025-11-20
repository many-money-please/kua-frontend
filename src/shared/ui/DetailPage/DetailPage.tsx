"use client";

import { useRouter } from "next/navigation";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

export type DetailPageData = {
    id: number;
    title: string;
    registrationDate: string;
    views: number;
    content: string;
    attachments?: { name: string; url: string }[];
};

export type NavigationPost = {
    id: number;
    title: string;
    date: string;
};

type DetailPageProps = {
    pageTitle: string;
    data: DetailPageData;
    navigation: {
        prev: NavigationPost | null;
        next: NavigationPost | null;
    };
    listUrl: string;
    detailUrlPattern: (id: number) => string;
};

export const DetailPage = ({
    pageTitle,
    data,
    navigation,
    listUrl,
    detailUrlPattern,
}: DetailPageProps) => {
    const router = useRouter();

    const handleListClick = () => {
        router.push(listUrl);
    };

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 py-16">
            <h1 className="text-[40px] font-bold">{pageTitle}</h1>
            <div className="border-t-kua-main border-b-kua-gray300 flex flex-col gap-4 border-t-2 border-b py-4">
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <div className="flex items-center gap-4 text-lg">
                    <div>등록일: {data.registrationDate}</div>
                    <div>조회수 {data.views.toLocaleString()}</div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div
                    className="[&_a]:text-kua-blue300 min-h-[200px] text-xl [&_a]:underline [&_br]:mb-2 [&_div]:mb-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />

                {/* 첨부파일 */}
                {data.attachments && data.attachments.length > 0 && (
                    <div className="bg-kua-sky100 text-kua-main flex w-full flex-col gap-2 px-6 py-4 text-xs">
                        <div className="mb-1 font-semibold">첨부파일</div>
                        {data.attachments.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <span>📎</span>
                                <a
                                    href={file.url}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {file.name}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 이전글/다음글 */}
            <div className="flex flex-col">
                {navigation.prev && (
                    <div
                        className="border-kua-gray250 hover:bg-kua-sky50 flex w-full cursor-pointer items-center justify-between border-t border-b px-2 py-4 transition-colors"
                        onClick={() =>
                            router.push(detailUrlPattern(navigation.prev!.id))
                        }
                    >
                        <div className="flex items-center gap-8">
                            <FaChevronUp className="text-kua-gray800" />
                            <div className="text-lg font-bold">이전글</div>
                            <div className="text-kua-gray800 text-xl">
                                {navigation.prev.title}
                            </div>
                        </div>
                        <div className="text-kua-gray800 text-lg">
                            {navigation.prev.date}
                        </div>
                    </div>
                )}
                {navigation.next && (
                    <div
                        className={`border-kua-gray250 hover:bg-kua-sky50 flex w-full cursor-pointer items-center justify-between px-2 ${navigation.prev ? "border-b" : "border-t border-b"} py-4 transition-colors`}
                        onClick={() =>
                            router.push(detailUrlPattern(navigation.next!.id))
                        }
                    >
                        <div className="flex items-center gap-8">
                            <FaChevronDown className="text-kua-gray800" />
                            <div className="text-lg font-bold">다음글</div>
                            <div className="text-kua-gray800 text-xl">
                                {navigation.next.title}
                            </div>
                        </div>
                        <div className="text-kua-gray800 text-lg">
                            {navigation.next.date}
                        </div>
                    </div>
                )}
            </div>

            {/* 목록 버튼 */}
            <div className="flex w-full items-center justify-center py-8">
                <button
                    onClick={handleListClick}
                    className="border-kua-main hover:bg-kua-main mx-auto w-32 cursor-pointer rounded-sm border py-2 text-center transition-colors hover:text-white"
                >
                    목록
                </button>
            </div>
        </div>
    );
};

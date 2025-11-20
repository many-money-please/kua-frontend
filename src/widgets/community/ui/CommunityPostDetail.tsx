"use client";

import Link from "next/link";

export type CommunityPostDetailData = {
    id: string;
    title: string;
    createdAt: string;
    views: number;
    content: string;
    attachments?: { id: string; name: string; url: string }[];
};

type CommunityPostDetailProps = {
    post: CommunityPostDetailData;
    listHref: string;
};

export const CommunityPostDetail = ({
    post,
    listHref,
}: CommunityPostDetailProps) => {
    return (
        <article className="flex w-full max-w-[1200px] flex-col gap-6 rounded-2xl bg-white p-10 shadow-sm">
            <header className="border-kua-gray200 border-b pb-6">
                <h1 className="text-2xl font-bold text-kua-gray900">
                    {post.title}
                </h1>
                <div className="text-kua-gray500 mt-4 flex flex-wrap gap-4 text-sm">
                    <span>등록일 {post.createdAt}</span>
                    <span>조회 {post.views.toLocaleString()}</span>
                </div>
            </header>

            <section
                className="prose max-w-none prose-p:leading-relaxed prose-li:list-disc prose-li:marker:text-kua-main prose-ul:ml-5"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.attachments && post.attachments.length > 0 && (
                <section className="border-kua-gray200 rounded-2xl border p-6">
                    <h2 className="text-lg font-semibold text-kua-gray900">
                        첨부파일
                    </h2>
                    <ul className="mt-4 space-y-2 text-kua-blue500">
                        {post.attachments.map((file) => (
                            <li key={file.id}>
                                <Link
                                    href={file.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    {file.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="flex justify-end">
                <Link
                    href={listHref}
                    className="border-kua-gray300 text-kua-gray700 hover:bg-kua-sky50 rounded-xl border px-8 py-3 text-sm font-semibold transition-colors"
                >
                    목록
                </Link>
            </div>
        </article>
    );
};


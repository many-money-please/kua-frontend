"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="bg-kua-gray100 flex min-h-[calc(100vh-200px)] w-full items-center justify-center px-4 py-20">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 text-center">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-kua-main text-[120px] font-bold leading-none">
                        404
                    </h1>
                    <h2 className="text-kua-gray900 text-4xl font-bold">
                        페이지를 찾을 수 없습니다
                    </h2>
                    <p className="text-kua-gray600 text-lg">
                        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="bg-kua-main hover:bg-kua-blue300 text-kua-white rounded-lg px-8 py-3 font-semibold transition-colors"
                    >
                        홈으로 이동
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-kua-gray250 hover:bg-kua-gray300 text-kua-gray800 rounded-lg border border-kua-gray300 px-8 py-3 font-semibold transition-colors"
                    >
                        이전 페이지로
                    </button>
                </div>

                <div className="mt-12 grid w-full max-w-[600px] grid-cols-1 gap-4 sm:grid-cols-3">
                    <Link
                        href="/about"
                        className="text-kua-gray700 hover:text-kua-main rounded-lg border border-kua-gray200 bg-white p-4 transition-colors"
                    >
                        <div className="font-semibold">협회소개</div>
                    </Link>
                    <Link
                        href="/competition-info"
                        className="text-kua-gray700 hover:text-kua-main rounded-lg border border-kua-gray200 bg-white p-4 transition-colors"
                    >
                        <div className="font-semibold">대회정보</div>
                    </Link>
                    <Link
                        href="/community"
                        className="text-kua-gray700 hover:text-kua-main rounded-lg border border-kua-gray200 bg-white p-4 transition-colors"
                    >
                        <div className="font-semibold">커뮤니티</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


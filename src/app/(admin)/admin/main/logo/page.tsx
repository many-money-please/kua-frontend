"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LogoManagementPage() {
    const [headerLogo, setHeaderLogo] = useState<File | null>(null);
    const [headerLogoPreview, setHeaderLogoPreview] = useState<string | null>(
        null,
    );
    const [footerLogo, setFooterLogo] = useState<File | null>(null);
    const [footerLogoPreview, setFooterLogoPreview] = useState<string | null>(
        null,
    );

    const handleHeaderLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("이미지 용량은 5MB 이하로 제한됩니다.");
                return;
            }
            if (!file.type.match(/^image\/(png|jpg|jpeg|svg)$/)) {
                alert("파일 형식은 PNG, JPG, SVG만 가능합니다.");
                return;
            }
            setHeaderLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeaderLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFooterLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("이미지 용량은 5MB 이하로 제한됩니다.");
                return;
            }
            if (!file.type.match(/^image\/(png|jpg|jpeg|svg)$/)) {
                alert("파일 형식은 PNG, JPG, SVG만 가능합니다.");
                return;
            }
            setFooterLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFooterLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // TODO: 로고 업로드 로직
        console.log({
            headerLogo,
            footerLogo,
        });
        alert("로고가 업로드되었습니다.");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">메인 관리</h1>
            </div>

            <div className="border-b border-kua-gray300 flex gap-6">
                <Link
                    href="/admin/main/popup"
                    className="border-b-2 border-transparent px-4 pb-3 text-lg font-medium text-kua-gray500 hover:text-kua-gray800"
                >
                    팝업관리
                </Link>
                <Link
                    href="/admin/main/section"
                    className="border-b-2 border-transparent px-4 pb-3 text-lg font-medium text-kua-gray500 hover:text-kua-gray800"
                >
                    섹션 관리
                </Link>
                <Link
                    href="/admin/main/logo"
                    className="border-b-2 border-kua-main px-4 pb-3 text-lg font-medium text-kua-main"
                >
                    로고 관리
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-kua-gray200 p-6 flex flex-col gap-8">
                {/* 헤더 로고 */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">헤더 로고</h2>
                    <div className="flex gap-6">
                        <div className="bg-kua-gray100 border border-kua-gray300 flex h-32 w-48 items-center justify-center rounded-lg">
                            {headerLogoPreview ? (
                                <Image
                                    src={headerLogoPreview}
                                    alt="헤더 로고 미리보기"
                                    width={192}
                                    height={128}
                                    className="h-full w-full rounded-lg object-contain"
                                />
                            ) : (
                                <div className="text-kua-gray400 text-center">
                                    <svg
                                        className="mx-auto mb-2 h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                id="header-logo-upload"
                                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                                onChange={handleHeaderLogoChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="header-logo-upload"
                                className="bg-kua-main text-kua-white hover:bg-kua-blue600 cursor-pointer rounded-lg px-4 py-2 text-center text-sm transition-colors"
                            >
                                파일 선택
                            </label>
                            <span className="text-kua-gray500 text-sm">
                                {headerLogo
                                    ? headerLogo.name
                                    : "선택된 파일 없음"}
                            </span>
                            <div className="text-kua-gray500 text-xs">
                                <p>* 파일형식: PNG, JPG, SVG</p>
                                <p>* 이미지 용량 제한: 5MB 이하</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 푸터 로고 */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">푸터 로고</h2>
                    <div className="flex gap-6">
                        <div className="bg-kua-gray100 border border-kua-gray300 flex h-32 w-48 items-center justify-center rounded-lg">
                            {footerLogoPreview ? (
                                <Image
                                    src={footerLogoPreview}
                                    alt="푸터 로고 미리보기"
                                    width={192}
                                    height={128}
                                    className="h-full w-full rounded-lg object-contain"
                                />
                            ) : (
                                <div className="text-kua-gray400 text-center">
                                    <svg
                                        className="mx-auto mb-2 h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                id="footer-logo-upload"
                                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                                onChange={handleFooterLogoChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="footer-logo-upload"
                                className="bg-kua-main text-kua-white hover:bg-kua-blue600 cursor-pointer rounded-lg px-4 py-2 text-center text-sm transition-colors"
                            >
                                파일 선택
                            </label>
                            <span className="text-kua-gray500 text-sm">
                                {footerLogo
                                    ? footerLogo.name
                                    : "선택된 파일 없음"}
                            </span>
                            <div className="text-kua-gray500 text-xs">
                                <p>* 파일형식: PNG, JPG, SVG</p>
                                <p>* 이미지 용량 제한: 5MB 이하</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-4 justify-end pt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-kua-main text-kua-white hover:bg-kua-blue600 rounded-lg px-6 py-2 transition-colors"
                    >
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
}


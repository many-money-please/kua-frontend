import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-kua-darkblue800 h-[230px] w-full">
            <div className="mx-auto flex flex-col items-center justify-center text-white">
                <div className="flex w-full max-w-[1200px] py-[57px]">
                    <div className="flex flex-1 flex-col gap-7">
                        <div className="flex flex-1 items-start justify-start gap-1.5">
                            <Image
                                src="/imgs/logos/Icon-Footer.svg"
                                alt="logo"
                                width={37.93}
                                height={36.12}
                            />
                            <Image
                                src="/imgs/logos/Icon-Footer-Text.svg"
                                alt="logo"
                                width={158.58}
                                height={35.33}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-5 text-sm">
                                <p>개인정보처리방침</p>
                                <p className="text-kua-gray500">|</p>
                                <p>이용약관</p>
                            </div>
                            <p className="text-[9px]">
                                COPYRIGHT (C) KOREA UNDERWATER ASSOCIATION. ALL
                                RIGHTS RESERVED.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-5">
                                <p className="text-sm font-medium">
                                    도로명 주소 : 서울특별시 송파구 올림픽로 424
                                    올림픽핸드볼경기장 112호
                                </p>
                            </div>
                            <div className="flex gap-5 text-sm">
                                <p>TEL 02-420-4293~4</p>
                                <p className="text-kua-gray500">|</p>
                                <p>FAX 02-421-8898</p>
                                <p className="text-kua-gray500">|</p>
                                <p>E-MAIL kua@kua.or.kr</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {/* 협회 밴드 */}
                            <Link
                                href="https://www.band.us/band/93030417/post"
                                aria-label="협회 공식 밴드"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                            >
                                <Image
                                    src="/imgs/footer/band.svg"
                                    alt="협회 공식 밴드"
                                    width={20}
                                    height={20}
                                />
                            </Link>
                            {/* 협회 인스타 */}
                            <Link
                                href="https://www.instagram.com/kua_insta/"
                                aria-label="협회 인스타그램"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                            >
                                <Image
                                    src="/imgs/footer/instagram.svg"
                                    alt="협회 인스타그램"
                                    width={20}
                                    height={20}
                                />
                            </Link>
                            {/* 협회 유튜브 */}
                            <Link
                                href="https://www.youtube.com/@KoreaUnderwaterAssociation/featured"
                                aria-label="협회 유튜브"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                            >
                                <Image
                                    src="/imgs/footer/youtube.svg"
                                    alt="협회 유튜브"
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

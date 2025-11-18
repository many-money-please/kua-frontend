import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="h-80 w-full bg-[#051726]">
            <div className="mx-auto flex flex-col items-center justify-center text-white">
                {/* footer 상단 */}
                <div className="flex h-60 w-full max-w-[1200px] items-center">
                    {/* 로고 이미지 */}
                    <div className="flex flex-1 items-center justify-center gap-1.5">
                        <Image
                            src="/imgs/logos/Icon-Footer.svg"
                            alt="logo"
                            width={64}
                            height={64}
                        />
                        <Image
                            src="/imgs/logos/Icon-Footer-Text.svg"
                            alt="logo"
                            width={284}
                            height={64}
                        />
                    </div>
                    {/* 목록 */}
                    <div className="flex flex-1 flex-col items-start gap-4">
                        <div className="flex gap-5">
                            <p className="text-base font-medium">
                                개인정보처리방침
                            </p>
                            <p className="text-base font-medium">이용약관</p>
                        </div>
                        <div className="flex gap-5">
                            <p className="text-base font-medium">
                                도로명 주소 : 서울특별시 송파구 올림픽로 424
                                올림픽핸드볼경기장 112호
                            </p>
                        </div>
                        <div className="flex gap-5">
                            <p className="text-base font-medium">
                                TEL 02-420-4293~4
                            </p>
                            <p className="text-base font-medium">
                                FAX 02-421-8898
                            </p>
                            <p className="text-base font-medium">
                                E-MAIL kua@kua.or.kr
                            </p>
                        </div>
                    </div>
                </div>
                {/* footer 하단 */}
                <div className="flex h-20 w-full flex-col items-center justify-center border-t border-white/10">
                    <p className="text-xs font-medium">
                        COPYRIGHT (C) KOREA UNDERWATER ASSOCIATION. ALL RIGHTS
                        RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

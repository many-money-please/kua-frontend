import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import Script from "next/script";

const pretendard = localFont({
    src: "../../public/fonts/pretendard/PretendardVariable.woff2",
    display: "swap",
    weight: "100 900",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "대한수중 핀수영협회",
    description:
        "대한수중핀수영협회는 1968년 창립 이후 핀수영·프리다이빙·수중사진 등 다양한 수중 스포츠를 보급·육성하며, 교육·경기·연구·인재 양성을 통해 국내 수중 스포츠 발전과 국민 건강 증진에 힘쓰는 공식 단체입니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${pretendard.variable}`}>
            <body
                className={`${pretendard.className} text-kua-black100 antialiased`}
            >
                <Script
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
                    strategy="beforeInteractive"
                />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}

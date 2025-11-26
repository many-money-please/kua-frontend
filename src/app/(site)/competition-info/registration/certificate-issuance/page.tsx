import Image from "next/image";
import {
    CertificateSections,
    CertificateIssuanceGuide,
    type CertificateSection,
} from "@/widgets/competition-info";

const certificateSectionsData: CertificateSection[] = [
    {
        title: "대한체육회 증명서 발급",
        logo: {
            src: "/imgs/main/company_01.png",
            alt: "대한체육회 로고",
            width: 160,
            height: 80,
        },
        subtitle: "스포츠지원포털 증명서 발급",
        cards: [
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_1.svg"
                        alt="경기실적 증명서"
                        width={55}
                        height={82}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        경기실적
                        <br />
                        증명서
                    </>
                ),
            },
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_2.svg"
                        alt="지도자경력 증명서"
                        width={86}
                        height={83}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        지도자경력
                        <br />
                        증명서
                    </>
                ),
            },
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_3.svg"
                        alt="대회참가 확인서"
                        width={68}
                        height={68}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        대회참가
                        <br />
                        확인서
                    </>
                ),
            },
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_4.svg"
                        alt="선수(지도자)등록 확인서"
                        width={66}
                        height={66}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        선수(지도자)등록
                        <br />
                        확인서
                    </>
                ),
            },
        ],
        notice: (
            <>
                * 회원가입(본인인증)이 불가한 경우 : 본인명의의 휴대폰이 없는
                경우, 법정대리인이 없는 경우, 아이핀을 발급받지 못하는 경우,
                기타 사유로 본인확인이 불가한 경우
            </>
        ),
    },
    {
        title: "대한수중·핀수영협회 증명서 발급",
        logo: {
            src: "/imgs/logos/Icon-text.svg",
            alt: "대한체육회 로고",
            width: 160,
            height: 80,
        },
        subtitle: "대한수중·핀수영협회 증명서 발급",
        cards: [
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_5.svg"
                        alt="국가대표 선수 확인서"
                        width={86}
                        height={44}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        · 국가대표 선수(지도자) 확인서
                        <br />
                        <span className="text-kua-black100 text-base font-normal">
                            (세계핀수영선수권, 아시아핀수영선수권)
                        </span>
                        <br />
                        · 청소년대표 선수 확인서
                        <br />· 대학생대표 선수 확인서
                    </>
                ),
            },
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_6.svg"
                        alt="후보선수 확인서"
                        width={86}
                        height={83}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        후보선수(상비군)
                        <br />
                        확인서
                    </>
                ),
            },
            {
                icon: (
                    <Image
                        src="/imgs/competition-info/certificate_7.svg"
                        alt="국제대회 참가확인서"
                        width={67}
                        height={67}
                        className="object-contain"
                    />
                ),
                title: (
                    <>
                        국제대회
                        <br />
                        참가확인서
                    </>
                ),
            },
        ],
        notice: (
            <>
                * 회원가입(본인인증)이 불가한 경우 : 본인명의의 휴대폰이 없는
                경우, 법정대리인이 없는 경우, 아이핀을 발급받지 못하는 경우,
                기타 사유로 본인확인이 불가한 경우
            </>
        ),
    },
];

export default function CertificateIssuancePage() {
    return (
        <div className="flex w-full flex-col items-center gap-24">
            <CertificateSections sections={certificateSectionsData} />
            <CertificateIssuanceGuide />
        </div>
    );
}

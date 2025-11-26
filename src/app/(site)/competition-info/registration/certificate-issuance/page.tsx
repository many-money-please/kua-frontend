import { FaMedal, FaChartLine, FaBullseye, FaUser } from "react-icons/fa6";
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
                icon: <FaMedal className="text-kua-blue300 text-4xl" />,
                title: (
                    <>
                        경기실적
                        <br />
                        증명서
                    </>
                ),
            },
            {
                icon: <FaChartLine className="text-kua-blue300 text-4xl" />,
                title: (
                    <>
                        지도자경력
                        <br />
                        증명서
                    </>
                ),
            },
            {
                icon: <FaBullseye className="text-kua-blue300 text-4xl" />,
                title: (
                    <>
                        대회참가
                        <br />
                        확인서
                    </>
                ),
            },
            {
                icon: <FaUser className="text-kua-blue300 text-4xl" />,
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
                회원가입(본인인증)이 불가한 경우 : 본인명의의 휴대폰이 없는
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
                icon: <FaMedal className="text-kua-blue300 text-4xl" />,
                title: (
                    <>
                        경기실적
                        <br />
                        증명서
                    </>
                ),
            },
            {
                icon: <FaChartLine className="text-kua-blue300 text-4xl" />,
                title: (
                    <>
                        지도자경력
                        <br />
                        증명서
                    </>
                ),
            },
            {
                icon: <FaBullseye className="text-kua-blue300 text-4xl" />,
                title: (
                    <>
                        대회참가
                        <br />
                        확인서
                    </>
                ),
            },
        ],
        notice: (
            <>
                회원가입(본인인증)이 불가한 경우 : 본인명의의 휴대폰이 없는
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

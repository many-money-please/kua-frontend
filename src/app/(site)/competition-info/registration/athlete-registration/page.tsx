import { ReactNode } from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa6";

type AthleteRegistrationItem = {
    title: string;
    description: ReactNode;
};

const athleteRegistrationData: AthleteRegistrationItem[] = [
    {
        title: "경기인 등록 안내",
        description: (
            <>
                경기인은 선수, 지도자, 심판, 선수관리담당자로 구분되며{" "}
                <span className="text-kua-main font-bold">
                    스포츠지원포털 통합회원 가입 후 신청
                </span>
                이 가능합니다.
                <br />
                경기인 신청과 관련된 문의는 신청하려는 종목의 시도종목단체나
                회원종목단체로 문의바랍니다.
            </>
        ),
    },
    {
        title: "경기인 수기등록 안내",
        description: (
            <div className="flex flex-col gap-8">
                <div>
                    경기인 등록규정에 의하여{" "}
                    <span className="text-kua-main font-bold">
                        회원가입(본인인증)이 불가능한 선수*는 스포츠지원포털
                        사이트의 ‘이용안내’ 페이지에서{" "}
                    </span>
                    신청서를 다운로드하여 작성 후<br />
                    시도종목단체(없는 경우 회원종목단체)에 제출하여 등록을
                    요청할 수 있습니다.
                </div>
                <span className="text-kua-gray400 text-sm">
                    * 회원가입(본인인증)이 불가한 경우 : 본인명의의 휴대폰이
                    없는 경우, 법정대리인이 없는 경우, 아이핀을 발급받지 못하는
                    경우, 기타 사유로 본인확인이 불가한 경우
                </span>
            </div>
        ),
    },
];

export default function AthleteRegistrationPage() {
    return (
        <div className="flex w-full max-w-[1200px] flex-col gap-8 px-5 pb-8 sm:px-0 sm:pb-24">
            <div className="flex flex-col sm:flex-row sm:gap-2">
                <h2 className="text-2xl font-bold sm:text-[32px]">
                    경기인 등록
                </h2>
                <h2 className="text-2xl font-bold sm:text-[32px]">
                    (선수, 지도자, 심판 등 동호인 등록 신청)
                </h2>
            </div>
            {athleteRegistrationData.map((item) => (
                <div
                    key={item.title}
                    className="bg-kua-sky50 flex flex-col gap-4 rounded-lg p-8"
                >
                    <div className="flex items-center gap-2">
                        <div className="bg-kua-main flex h-4.5 w-4.5 items-center justify-center rounded-sm">
                            <FaCheck className="text-xs text-white" />
                        </div>
                        <div className="text-kua-main text-lg font-bold">
                            {item.title}
                        </div>
                    </div>
                    <div className="text-kua-gray800 text-sm sm:text-lg">
                        {item.description}
                    </div>
                </div>
            ))}
            <div className="mx-auto flex w-full flex-col gap-4 sm:flex-row sm:justify-center sm:gap-8">
                <button className="bg-kua-main hover:bg-kua-blue500 inline-flex cursor-pointer items-center justify-center gap-4 rounded-[10px] py-4 text-base font-semibold text-white transition-colors sm:w-80 sm:text-xl">
                    스포츠지원포털 바로가기
                    <FaChevronRight className="text-sm" />
                </button>
                <button className="bg-kua-black100 hover:bg-kua-black200 inline-flex cursor-pointer items-center justify-center gap-4 rounded-[10px] py-4 text-base font-semibold text-white transition-colors sm:w-80 sm:text-xl">
                    단체별 연락처 조회
                    <FaChevronRight className="text-sm" />
                </button>
            </div>
        </div>
    );
}

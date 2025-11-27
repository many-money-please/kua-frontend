import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

export default function CompetitionApplicationPage() {
    return (
        <div className="w-full max-w-[1200px] px-5 pb-8 sm:px-0 sm:pb-24">
            <div className="bg-kua-sky50 flex flex-col items-center justify-between gap-8 rounded-[10px] p-12 sm:flex-row">
                <div className="flex flex-col items-center gap-8 sm:flex-row">
                    <div className="bg-kua-white relative h-20 w-20 overflow-hidden rounded-full sm:h-28 sm:w-28">
                        <Image
                            src="/imgs/competition-info/competition-info01.svg"
                            alt="competition-info01"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-1 sm:items-start">
                        <h3 className="text-kua-gray800 text-2xl font-bold sm:text-[32px]">
                            대회 참가 신청
                        </h3>
                        <p className="text-kua-gray600 text-base sm:text-lg">
                            각종 대회참가 신청을 진행할 수 있습니다.
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="bg-kua-main hover:bg-kua-blue500 flex cursor-pointer items-center gap-4 rounded-[10px] px-12 py-4 text-base font-semibold text-white transition-colors sm:text-xl">
                        핀수영 대회일정 바로가기
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

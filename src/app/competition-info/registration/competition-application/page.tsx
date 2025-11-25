import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

export default function CompetitionApplicationPage() {
    return (
        <div className="w-full max-w-[1200px] pb-24">
            <div className="bg-kua-sky50 flex w-full justify-between rounded-[10px] px-12 py-12">
                <div className="flex items-center gap-8">
                    <div className="bg-kua-white relative h-28 w-28 overflow-hidden rounded-full">
                        <Image
                            src="/imgs/competition-info/competition-info01.svg"
                            alt="competition-info01"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-kua-gray800 text-[32px] font-bold">
                            대회 참가 신청
                        </h3>
                        <p className="text-kua-gray600 text-lg">
                            각종 대회참가 신청을 진행할 수 있습니다.
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="bg-kua-main hover:bg-kua-blue500 flex cursor-pointer items-center gap-4 rounded-[10px] px-12 py-4 text-xl font-semibold text-white transition-colors">
                        핀수영 대회일정 바로가기
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

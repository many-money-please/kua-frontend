"use client";

import { useParams, useRouter } from "next/navigation";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

type CompetitionDetail = {
    id: number;
    title: string;
    registrationDate: string;
    views: number;
    content: string;
    attachments?: { name: string; url: string }[];
};

type NavigationPost = {
    id: number;
    title: string;
    date: string;
};

const getDummyData = (id: string): CompetitionDetail => ({
    id: Number(id),
    title: "제17회 전국해양스포츠제전 겸 제14회 대한체육회장배 전국생활체육 장거리핀수영대회",
    registrationDate: "2025-11-12",
    views: 3948,
    content: `
        <p>핀수영 관계자 및 선수 여러분께 안내드립니다.</p>
        <p>아래와 같이 대회를 개최하오니 많은 참가 바랍니다.</p>
        <br />
        <p>※ 선수등록이 완료된 선수만 참가 가능합니다.</p>
        <p>※ 선수등록비는 별도입니다.</p>
        <br />
        <div>
            <div><strong>대회명</strong></div>
            <div>제17회 전국해양스포츠제전 겸 제14회 대한체육회장배 전국생활체육 장거리핀수영대회</div>
        </div>
        <div>
            <div><strong>주최</strong></div>
            <div>해양수산부</div>
        </div>
        <div>
            <div><strong>주관</strong></div>
            <div>대한수중핀수영협회, 경기도, 시흥시</div>
        </div>
        <div>
            <div><strong>대회기간</strong></div>
            <div>2025. 8. 30.(토) - 31.(일) 2일간</div>
        </div>
        <div>
            <div><strong>장소</strong></div>
            <div>경기도 시흥시 거북섬 앞 수면(시화호)</div>
        </div>
        <div>
            <div><strong>제출서류</strong></div>
            <div>참가신청서 (시도대표는 별도 제출)</div>
        </div>
        <div>
            <div><strong>참가비용</strong></div>
            <div>
                초등부: 15,000원<br />
                중등부: 20,000원<br />
                고등·대학부: 25,000원<br />
                일반부(동호인 포함): 35,000원
            </div>
        </div>
        <div>
            <div><strong>제공사항</strong></div>
            <div>기념품, 수모, 배상책임보험가입, 기록관리, 기타 대회 진행에 필요한 사항</div>
        </div>
        <div>
            <div><strong>참가신청</strong></div>
            <div><a href="https://app.sports.or.kr/app/uw/" target="_blank">https://app.sports.or.kr/app/uw/</a></div>
        </div>
        <div>
            <div><strong>신청기간</strong></div>
            <div>2025. 7. 1.(화) 14:00 ~ 17.(목) 16:00</div>
        </div>
        <div>
            <div><strong>계좌번호</strong></div>
            <div>KEB하나은행 252-910039-31704 대한수중핀수영협회</div>
        </div>
        <div>
            <div><strong>기타사항</strong></div>
            <div>본 대회는 다른 대회와 동시 개최되며, 시상은 별도로 진행됩니다. 신청기간 종료 후 신청 인원이 부족할 경우 추가 모집이 가능합니다. 신분 확인을 위해 신분증 지참이 필요합니다 (휴대폰 사진 가능).</div>
        </div>
        <div>
            <div><strong>문의처</strong></div>
            <div>대한수중핀수영협회 사무처 02-420-4293</div>
        </div>
    `,
    attachments: [
        { name: "대회 안내문.pdf", url: "#" },
        { name: "대회 계획서.pdf", url: "#" },
        { name: "참가신청서.hwp", url: "#" },
        { name: "참가신청서.pdf", url: "#" },
        { name: "학교폭력 전력 부존재 확인서.hwp", url: "#" },
    ],
});

const getDummyNavigation = (
    id: string,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentId = Number(id);
    return {
        prev:
            currentId > 1
                ? {
                      id: currentId - 1,
                      title: "2026년 제1차 핀수영 국가대표 선발전 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
        next:
            currentId < 32
                ? {
                      id: currentId + 1,
                      title: "제26회 문화체육관광부장관기 전국생활체육 수중스포츠대회 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
    };
};

export default function CompetitionInfoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    const handleListClick = () => {
        router.push("/competition-info");
    };

    return (
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-12 py-16">
            <h1 className="text-[40px] font-bold">대회 일정 안내</h1>
            <div className="border-t-kua-main border-b-kua-gray300 flex flex-col gap-4 border-t-2 border-b py-4">
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <div className="flex items-center gap-4 text-lg">
                    <div>등록일: {data.registrationDate}</div>
                    <div>조회수 {data.views.toLocaleString()}</div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div
                    className="[&_a]:text-kua-blue300 min-h-[200px] text-xl [&_a]:underline [&_br]:mb-2 [&_div]:mb-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />

                {/* 첨부파일 */}
                {data.attachments && data.attachments.length > 0 && (
                    <div className="bg-kua-sky100 text-kua-main flex w-full flex-col gap-2 px-6 py-4 text-xs">
                        <div className="mb-1 font-semibold">첨부파일</div>
                        {data.attachments.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <span>📎</span>
                                <a
                                    href={file.url}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {file.name}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 이전글/다음글 */}
            <div className="flex flex-col">
                {navigation.prev && (
                    <div
                        className="border-kua-gray250 hover:bg-kua-sky50 flex w-full cursor-pointer items-center justify-between border-t border-b px-2 py-4 transition-colors"
                        onClick={() =>
                            router.push(
                                `/competition-info/${navigation.prev!.id}`,
                            )
                        }
                    >
                        <div className="flex items-center gap-8">
                            <FaChevronUp className="text-kua-gray800" />
                            <div className="text-lg font-bold">이전글</div>
                            <div className="text-kua-gray800 text-xl">
                                {navigation.prev.title}
                            </div>
                        </div>
                        <div className="text-kua-gray800 text-lg">
                            {navigation.prev.date}
                        </div>
                    </div>
                )}
                {navigation.next && (
                    <div
                        className={`border-kua-gray250 hover:bg-kua-sky50 flex w-full cursor-pointer items-center justify-between px-2 ${navigation.prev ? "border-b" : "border-t border-b"} py-4 transition-colors`}
                        onClick={() =>
                            router.push(
                                `/competition-info/${navigation.next!.id}`,
                            )
                        }
                    >
                        <div className="flex items-center gap-8">
                            <FaChevronDown className="text-kua-gray800" />
                            <div className="text-lg font-bold">다음글</div>
                            <div className="text-kua-gray800 text-xl">
                                {navigation.next.title}
                            </div>
                        </div>
                        <div className="text-kua-gray800 text-lg">
                            {navigation.next.date}
                        </div>
                    </div>
                )}
            </div>

            {/* 목록 버튼 */}
            <div className="flex w-full items-center justify-center py-8">
                <button
                    onClick={handleListClick}
                    className="border-kua-main hover:bg-kua-main mx-auto w-32 cursor-pointer rounded-sm border py-2 text-center transition-colors hover:text-white"
                >
                    목록
                </button>
            </div>
        </div>
    );
}

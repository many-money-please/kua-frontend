import Image from "next/image";

export const PresidentSpeech = () => {
    return (
        <div
            id="president"
            className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-10 pb-40"
        >
            <p className="text-kua-darkblue800 text-[32px] font-bold">
                협회장 인사말
            </p>
            <div className="flex items-center justify-center gap-20">
                <div className="bg-kua-blue50 h-[636px] w-[536px] rounded-[40px] px-[36px] pt-12">
                    <div className="relative h-full w-full">
                        <div className="absolute top-0 left-0 flex flex-col">
                            <p className="text-kua-main font-medium">
                                제15대 대한수중핀수영협회 회장
                            </p>
                            <p className="text-kua-main text-[32px] font-bold">
                                강철식
                            </p>
                        </div>
                        <Image
                            src="/imgs/about/president.png"
                            alt="president"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-9 py-[44px]">
                    <p className="text-kua-darkblue800 text-xl font-bold">
                        안녕하십니까.
                        <br />
                        대한수중핀수영협회 제15대 회장 강철식입니다.
                        <br />
                        수중스포츠 가족 여러분들의 방문을 진심으로 환영합니다.
                    </p>
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-kua-gray800 text-sm">
                            대한수중핀수영협회는 1968년 3월 6일, 故 김상겸
                            초대회장님의 주도로 출범한
                            <br />
                            ‘한국스킨스쿠버다이빙클럽’ 에서 문화체육관광부의
                            인가를 받은 사단법인으로 성장하여,
                            <br />
                            다양한 수중 스포츠 국내 보급과 국제적 교류를 통해
                            국위 선양과 국민 건강 증진이라는
                            <br />
                            사명을 충실히 수행해왔습니다.
                        </p>
                        <p className="text-kua-gray800 text-sm">
                            우리협회는 핀수영, 프리다이빙(무호흡잠영), 수중하기,
                            수중사진, 스킨스쿠버다이빙,
                            <br /> 수중요리엔티어링, 아쿠아스론, 스피어피싱,
                            표적사격, 수중럭비 등<br /> 다양한 수중스포츠 종목을
                            관장하며, 교육과 경기, 연구, 인재 육성을
                            <br /> 종합적으로 추진하고 있습니다.
                        </p>
                        <p className="text-kua-gray800 text-sm">
                            또한, 우리협회는 생활체육과 전문체육이 함께 성장하는
                            구조를 지향하며, 선수뿐만 아니라 지도자,
                            <br /> 심판, 운영요원 등 수중 스포츠 생태계 전반의
                            전문 인력 양성에 힘쓰고 있습니다.
                            <br /> 국민 누구나 수중 스포츠의 즐거움을 경험할 수
                            있도록 다양한 프로그램을 확대하고 있으며,
                            <br /> 특히 청소년과 일반인 대상으로 체험 기회를
                            마련해 저변 확대에도 앞장서고 있습니다.
                            <br />
                            대한수중핀수영협회 제15대 회장으로서 역사와 전통을
                            계승하면서도 변화하는 시대에 맞는
                            <br />
                            새로운 수중 스포츠 문화를 만들고 선수와 지도자,
                            동호인,
                            <br /> 그리고 협회 구성원 모두가 하나로 화합하여
                            수중 스포츠의 밝은 미래를 열어갈 수 있도록
                            <br /> 책임과 사명을 다하겠습니다.
                            <br /> 여러분의 관심과 성원은 우리 협회를 더욱
                            발전시키는 원동력이 됩니다.
                        </p>
                        <p className="text-kua-gray800 text-sm">감사합니다.</p>
                        <div className="flex items-center justify-center gap-10">
                            <p className="text-kua-darkblue800 font-bold">
                                사단법인 대한수중핀수영협회장 강철식
                            </p>
                            <Image
                                src="/imgs/about/president-sign.png"
                                alt="sign"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

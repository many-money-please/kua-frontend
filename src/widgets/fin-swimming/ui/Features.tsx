import Image from "next/image";

export const Features = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
            <h2 className="text-[40px] font-bold">핀수영의 특징</h2>
            <p className="text-kua-gray600 text-2xl leading-relaxed">
                핀수영은 강력한 추진력과 유연한 동작이 결합된, <br />
                가장 역동적인 수중 경기입니다.
            </p>
            <div className="grid w-full grid-cols-3 gap-8">
                <div className="bg-kua-sky100 flex h-[160px] items-center gap-4 rounded-[10px] px-8">
                    <div className="relative h-[74px] w-[74px]">
                        <Image
                            src="/imgs/fin-swimming/fin-swimming07.svg"
                            alt="핀수영"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-kua-blue500 text-3xl font-bold">
                            속도
                        </span>
                        <span className="text-xl font-medium">
                            자유형보다 약 1.3배 빠름
                        </span>
                    </div>
                </div>
                <div className="bg-kua-sky100 flex h-[160px] items-center gap-4 rounded-[10px] px-8">
                    <div className="relative h-[74px] w-[74px]">
                        <Image
                            src="/imgs/fin-swimming/fin-swimming08.svg"
                            alt="핀수영"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-kua-blue500 text-3xl font-bold">
                            동작
                        </span>
                        <span className="text-xl font-medium">
                            돌고래 같은 &apos;돌핀킥&apos; 사용
                        </span>
                    </div>
                </div>
                <div className="bg-kua-sky100 flex h-[160px] items-center gap-4 rounded-[10px] px-8">
                    <div className="relative h-[74px] w-[74px]">
                        <Image
                            src="/imgs/fin-swimming/fin-swimming09.svg"
                            alt="핀수영"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-kua-blue500 text-3xl font-bold">
                            환경
                        </span>
                        <span className="text-xl font-medium">
                            수영장·저수지·바다 등<br /> 다양한 수역에서
                            가능
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


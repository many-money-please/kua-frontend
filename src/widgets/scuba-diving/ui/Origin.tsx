import Image from "next/image";

export const Origin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">스쿠버다이빙의 유래</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    스쿠버다이빙은 공기통을 이용해 수중에서 숨을 쉬며 활동하는 스포츠로,
                    <br />
                    바다 속 세상을 탐험하고 자연을 즐길 수 있는 수중 레저 스포츠입니다. <br />
                    1940년대 발명된 자가수호식 수중호흡기(SCUBA)를 통해 오늘날 전 세계적으로 사랑받는
                    수중 스포츠입니다.
                </p>
            </div>
            <div className="relative mx-auto h-[420px] w-full max-w-[1200px] overflow-hidden rounded-2xl opacity-80">
                <Image
                    src="/imgs/fin-swimming/fin-swimming01.jpg"
                    alt="스쿠버다이빙"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    );
};


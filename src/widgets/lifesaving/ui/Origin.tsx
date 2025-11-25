import Image from "next/image";

export const Origin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">인명구조의 유래</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    인명구조는 수중에서 발생하는 응급상황에 대비하여 생명을 구조하는 기술로,
                    <br />
                    안전한 수중 활동과 구조 기술을 통해 생명을 보호하는 중요한 스포츠입니다. <br />
                    고대로부터 이어져 온 구조 기술이 오늘날 체계적인 교육 과정으로 발전했습니다.
                </p>
            </div>
            <div className="relative mx-auto h-[420px] w-full max-w-[1200px] overflow-hidden rounded-2xl opacity-80">
                <Image
                    src="/imgs/fin-swimming/fin-swimming01.jpg"
                    alt="인명구조"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    );
};


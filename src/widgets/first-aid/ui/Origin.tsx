import Image from "next/image";

export const Origin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">응급처치의 유래</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    응급처치는 긴급한 상황에서 생명을 구하기 위한 응급 의료 기술로,
                    <br />
                    즉각적인 처치를 통해 생명을 보호하고 상태를 안정화하는 중요한 기술입니다. <br />
                    고대로부터 이어져 온 응급 의료 기술이 오늘날 체계적인 교육 과정으로 발전했습니다.
                </p>
            </div>
            <div className="relative mx-auto h-[420px] w-full max-w-[1200px] overflow-hidden rounded-2xl opacity-80">
                <Image
                    src="/imgs/fin-swimming/fin-swimming01.jpg"
                    alt="응급처치"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    );
};


import Image from "next/image";

export const Origin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">프리다이빙의 유래</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    프리다이빙은 공기통 없이 숨을 참고 수중에서 활동하는 스포츠로,
                    <br />
                    인간의 한계에 도전하고 자연과 하나 되는 수중 스포츠입니다. <br />
                    고대로부터 이어져 온 전통적인 수중 활동이 오늘날 스포츠로 발전했습니다.
                </p>
            </div>
            <div className="relative mx-auto h-[420px] w-full max-w-[1200px] overflow-hidden rounded-2xl opacity-80">
                <Image
                    src="/imgs/fin-swimming/fin-swimming01.jpg"
                    alt="프리다이빙"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    );
};


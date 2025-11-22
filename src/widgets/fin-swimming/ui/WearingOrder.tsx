import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

const wearingOrderData = [
    {
        step: "01",
        description: "발을 적시기",
        image: "/imgs/fin-swimming/fin-swimming11.svg",
    },
    {
        step: "02",
        description: "착용",
        image: "/imgs/fin-swimming/fin-swimming12.svg",
    },
    {
        step: "03",
        description: "세척 및 점검",
        image: "/imgs/fin-swimming/fin-swimming13.svg",
    },
];

export const WearingOrder = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16">
            <h2 className="mb-4 text-[40px] font-bold">착용 순서</h2>
            <div className="flex items-center justify-between">
                {wearingOrderData.map((item, index) => (
                    <React.Fragment key={item.step}>
                        <div className="bg-kua-sky100 flex aspect-square h-[300px] w-[300px] items-center justify-center rounded-full">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-kua-blue300 text-2xl font-bold">
                                    {item.step}
                                </span>
                                <Image
                                    src={item.image}
                                    alt={item.description}
                                    width={100}
                                    height={100}
                                />
                                <span className="text-kua-main text-2xl font-bold">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                        {index < wearingOrderData.length - 1 && (
                            <FaChevronRight className="text-kua-main text-3xl" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

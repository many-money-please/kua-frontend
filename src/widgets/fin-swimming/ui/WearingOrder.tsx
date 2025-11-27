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
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 sm:gap-16">
            <h2 className="text-2xl font-bold sm:text-[32px]">착용 순서</h2>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
                {wearingOrderData.map((item, index) => (
                    <React.Fragment key={item.step}>
                        <div className="bg-kua-sky100 flex aspect-square h-[300px] w-[300px] items-center justify-center rounded-full">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-kua-blue300 text-xl font-bold sm:text-2xl">
                                    {item.step}
                                </span>
                                <Image
                                    src={item.image}
                                    alt={item.description}
                                    width={80}
                                    height={80}
                                    className="sm:h-[100px] sm:w-[100px]"
                                />
                                <span className="text-kua-main text-xl font-bold sm:text-2xl">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                        {index < wearingOrderData.length - 1 && (
                            <FaChevronRight className="text-kua-main rotate-90 text-3xl sm:rotate-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

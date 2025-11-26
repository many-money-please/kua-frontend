"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 240);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="pointer-events-none fixed right-5 bottom-40 z-40 sm:right-0 sm:left-1/2 sm:w-full sm:max-w-[1200px] sm:-translate-x-1/2">
            <div className="pointer-events-auto flex w-fit justify-end px-5 sm:ml-auto sm:px-0">
                <button
                    type="button"
                    onClick={handleClick}
                    className={`bg-kua-main shodow-md hover:bg-kua-blue500 flex h-16 w-16 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl p-3 text-white shadow-lg transition-all duration-300 ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                    aria-label="맨 위로 이동"
                >
                    <FaArrowUp className="text-2xl" />
                    <span className="text-xs font-bold">위로</span>
                </button>
            </div>
        </div>
    );
};

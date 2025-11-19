import { PiImageSquareFill } from "react-icons/pi";

export const ImageFallback = () => (
    <div className="bg-kua-gray200 absolute inset-0 flex items-center justify-center">
        <PiImageSquareFill className="text-kua-gray100 text-6xl" />
    </div>
);

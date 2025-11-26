"use client";

import { useParams } from "next/navigation";
import { ExecutivesEdit } from "@/widgets/about";

export default function ExecutivesEditPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">임원현황</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <ExecutivesEdit id={id} />
            </div>
        </div>
    );
}

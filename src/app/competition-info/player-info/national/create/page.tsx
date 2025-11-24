import { NewRecordCreate } from "@/widgets/competition-info";

export default function NationalPlayerCreatePage() {
    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">국가대표 선수 등록</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <NewRecordCreate />
            </div>
        </div>
    );
}

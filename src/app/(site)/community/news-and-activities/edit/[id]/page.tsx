import { NewsAndActivitiesEdit } from "@/widgets/community";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function NewsAndActivitiesEditPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">소식 및 활동 수정</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <NewsAndActivitiesEdit id={id} />
            </div>
        </div>
    );
}

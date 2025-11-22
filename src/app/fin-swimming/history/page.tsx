import {
    Origin,
    HistoricalOrigin,
    CompetitionStructure,
    Features,
    KoreaDevelopment,
} from "@/widgets/fin-swimming";

export default function HistoryPage() {
    return (
        <div className="mx-auto w-full pb-16">
            <div className="mx-auto flex w-full flex-col gap-16">
                <Origin />
                <HistoricalOrigin />
                <CompetitionStructure />
                <Features />
                <KoreaDevelopment />
            </div>
        </div>
    );
}

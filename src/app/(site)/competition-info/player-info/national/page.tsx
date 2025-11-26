import { PlayerInfoTableSection } from "@/widgets/competition-info";
import type { PlayerInfoSummary } from "@/widgets/competition-info";

const NATIONAL_PLAYERS: PlayerInfoSummary[] = [
    {
        id: 1,
        title: "김철수 선수 프로필",
        createdAt: "2025-01-15",
        views: 312,
    },
    {
        id: 2,
        title: "이영희 선수 프로필",
        createdAt: "2025-01-10",
        views: 545,
    },
    {
        id: 3,
        title: "박민수 선수 프로필",
        createdAt: "2025-01-05",
        views: 198,
    },
];

export default function NationalPlayerInfoPage() {
    return (
        <PlayerInfoTableSection
            title="국가대표"
            data={NATIONAL_PLAYERS}
            detailBasePath="/competition-info/player-info/national"
            searchOptions={["제목", "내용", "제목+내용"]}
        />
    );
}


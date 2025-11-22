import { PlayerInfoTableSection } from "@/widgets/competition-info";
import type { PlayerInfoSummary } from "@/widgets/competition-info";

const RESERVE_PLAYERS: PlayerInfoSummary[] = [
    {
        id: 1,
        title: "강민호 선수 프로필",
        createdAt: "2025-01-15",
        views: 178,
    },
    {
        id: 2,
        title: "윤서연 선수 프로필",
        createdAt: "2025-01-10",
        views: 234,
    },
    {
        id: 3,
        title: "임태영 선수 프로필",
        createdAt: "2025-01-05",
        views: 156,
    },
];

export default function ReservePlayerInfoPage() {
    return (
        <PlayerInfoTableSection
            title="상비군선수"
            data={RESERVE_PLAYERS}
            detailBasePath="/competition-info/player-info/reserve"
            searchOptions={["제목", "내용", "제목+내용"]}
        />
    );
}


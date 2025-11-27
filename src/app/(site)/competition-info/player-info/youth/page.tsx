import { Suspense } from "react";
import { PlayerInfoTableSection } from "@/widgets/competition-info";
import type { PlayerInfoSummary } from "@/widgets/competition-info";

const YOUTH_PLAYERS: PlayerInfoSummary[] = [
    {
        id: 1,
        title: "정수진 선수 프로필",
        createdAt: "2025-01-15",
        views: 245,
    },
    {
        id: 2,
        title: "최동현 선수 프로필",
        createdAt: "2025-01-10",
        views: 389,
    },
    {
        id: 3,
        title: "한지은 선수 프로필",
        createdAt: "2025-01-05",
        views: 167,
    },
];

export default function YouthPlayerInfoPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <PlayerInfoTableSection
                title="청소년대표"
                data={YOUTH_PLAYERS}
                detailBasePath="/competition-info/player-info/youth"
                searchOptions={["제목", "내용", "제목+내용"]}
            />
        </Suspense>
    );
}


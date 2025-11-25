type QualificationInfoRow = {
    item: string;
    content: string;
    qualificationLevel?: string;
    examinationFee?: string;
    colSpan?: number; // 병합할 컬럼 수
};

type QualificationInfoTableProps = {
    rows: QualificationInfoRow[];
    showQualificationLevel?: boolean;
    showExaminationFee?: boolean;
    layout?: "vertical" | "grid"; // vertical: 기본 세로형, grid: 2x2 그리드형
};

export const QualificationInfoTable = ({
    rows,
    showQualificationLevel = false,
    showExaminationFee = false,
    layout = "vertical",
}: QualificationInfoTableProps) => {
    // Grid 레이아웃 처리
    if (layout === "grid") {
        const gridRows: QualificationInfoRow[][] = [];
        for (let i = 0; i < rows.length; i += 2) {
            gridRows.push(rows.slice(i, i + 2));
        }

        return (
            <div className="border-kua-main mb-4 w-full overflow-x-auto border-t-2">
                <table className="border-kua-gray200 w-full border-collapse border-x-0">
                    <tbody>
                        {gridRows.map((rowPair, rowIndex) => {
                            const firstRow = rowPair[0];
                            const secondRow = rowPair[1];

                            return (
                                <tr
                                    key={rowIndex}
                                    className="border-kua-gray200 border-b transition-colors"
                                >
                                    {/* 첫 번째 셀 */}
                                    {firstRow.colSpan ? (
                                        // 병합이 필요한 경우 (소재지 등) - 항목 열과 내용 열 분리
                                        <>
                                            <td className="bg-kua-blue50 text-kua-gray800 border-kua-gray200 border border-l-0 px-4 py-4 text-center text-lg">
                                                {firstRow.item}
                                            </td>
                                            <td
                                                colSpan={3}
                                                className="text-kua-gray800 border-kua-gray200 border border-r-0 bg-white px-4 py-4 text-center text-lg"
                                            >
                                                {firstRow.content}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="bg-kua-blue50 text-kua-gray800 border-kua-gray200 border border-l-0 px-4 py-4 text-center text-lg">
                                                {firstRow.item}
                                            </td>
                                            <td className="text-kua-gray800 border-kua-gray200 border bg-white px-4 py-4 text-center text-lg">
                                                {firstRow.content}
                                            </td>
                                            {/* 두 번째 셀 (있는 경우) */}
                                            {secondRow ? (
                                                <>
                                                    <td className="bg-kua-blue50 text-kua-gray800 border-kua-gray200 border px-4 py-4 text-center text-lg">
                                                        {secondRow.item}
                                                    </td>
                                                    <td className="text-kua-gray800 border-kua-gray200 border border-r-0 bg-white px-4 py-4 text-center text-lg">
                                                        {secondRow.content}
                                                    </td>
                                                </>
                                            ) : (
                                                // 마지막 행이 홀수인 경우 빈 셀
                                                <td
                                                    colSpan={2}
                                                    className="text-kua-gray800 border-kua-gray200 border border-r-0 bg-white px-4 py-4 text-center text-lg"
                                                />
                                            )}
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    // 기본 vertical 레이아웃
    return (
        <div className="border-kua-main mb-4 w-full overflow-x-auto border-t-2">
            <table className="border-kua-gray200 w-full border-collapse border-x-0">
                <thead>
                    <tr className="bg-kua-blue50 border-kua-gray200 border-b">
                        <th className="text-kua-gray800 border-kua-gray200 border border-l-0 px-4 py-3 text-center text-lg font-semibold">
                            항목
                        </th>
                        <th className="text-kua-gray800 border-kua-gray200 border px-4 py-3 text-center text-lg font-semibold">
                            내용
                        </th>
                        {showQualificationLevel && (
                            <th className="text-kua-gray800 border-kua-gray200 border px-4 py-3 text-center text-lg font-semibold">
                                자격등급
                            </th>
                        )}
                        {showExaminationFee && (
                            <th className="text-kua-gray800 border-kua-gray200 border border-r-0 px-4 py-3 text-center text-lg font-semibold">
                                검정비용
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="border-kua-gray200 border-b transition-colors"
                        >
                            <td className="bg-kua-sky50 text-kua-gray800 border-kua-gray200 border border-l-0 px-4 py-4 text-center text-lg">
                                {row.item}
                            </td>
                            <td
                                className="text-kua-gray800 border-kua-gray200 border bg-white px-4 py-4 text-center text-lg"
                                colSpan={
                                    row.colSpan
                                        ? row.colSpan +
                                          (showQualificationLevel ? 1 : 0) +
                                          (showExaminationFee ? 1 : 0)
                                        : undefined
                                }
                            >
                                {row.content}
                            </td>
                            {showQualificationLevel && !row.colSpan && (
                                <td className="bg-kua-sky50 text-kua-gray800 border-kua-gray200 border px-4 py-4 text-center text-lg">
                                    {row.qualificationLevel || "-"}
                                </td>
                            )}
                            {showExaminationFee && !row.colSpan && (
                                <td className="text-kua-gray800 border-kua-gray200 border border-r-0 bg-white px-4 py-4 text-center text-lg">
                                    {row.examinationFee || "-"}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

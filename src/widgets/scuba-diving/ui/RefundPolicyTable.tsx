type RefundPolicyTableProps = {
    policies: string[];
};

export const RefundPolicyTable = ({ policies }: RefundPolicyTableProps) => {
    return (
        <div className="border-kua-main w-full overflow-x-auto border-t">
            <table className="border-kua-gray200 w-full border-collapse border-x-0">
                <thead>
                    {/* 연한 파란색 제목 행 */}
                    <tr>
                        <th className="bg-kua-blue50 text-kua-gray800 border-kua-gray200 border border-r-0 border-l-0 px-4 py-3 text-center text-lg font-semibold">
                            환불규정
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy, index) => (
                        <tr
                            key={index}
                            className="border-kua-gray200 border-b bg-white"
                        >
                            <td className="text-kua-gray800 border-kua-gray200 border border-r-0 border-l-0 px-4 py-4 text-center text-lg">
                                {policy}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const RegulationsTab = () => {
    return (
        <div className="w-full bg-white">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-12 py-44">
                <h2 className="text-kua-darkblue800 text-[40px] font-bold">
                    규정
                </h2>
                <div className="w-full">
                    <p className="text-kua-gray800 text-lg">
                        협회 규정 내용이 들어갈 예정입니다.
                    </p>
                    {/* TODO: 규정 문서 목록 또는 다운로드 링크 추가 */}
                </div>
            </div>
        </div>
    );
};

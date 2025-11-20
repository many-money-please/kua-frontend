export const DisclosureTab = () => {
    return (
        <div className="w-full bg-white">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-12 py-44">
                <h2 className="text-kua-darkblue800 text-[40px] font-bold">
                    경영공시
                </h2>
                <div className="w-full">
                    <p className="text-kua-gray800 text-lg">
                        경영공시 내용이 들어갈 예정입니다.
                    </p>
                    {/* TODO: 경영공시 자료 목록 또는 테이블 추가 */}
                </div>
            </div>
        </div>
    );
};

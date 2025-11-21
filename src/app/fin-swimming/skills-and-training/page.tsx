export default function SkillsAndTrainingPage() {
    return (
        <div className="mx-auto w-full max-w-[1200px] px-8 py-12">
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="mb-4 text-2xl font-bold">기초기술</h2>
                    <p className="text-kua-gray600 leading-relaxed">
                        핀수영의 기초 기술과 기본 자세에 대한 내용입니다.
                    </p>
                </div>
                <div>
                    <h2 className="mb-4 text-2xl font-bold">응용기술</h2>
                    <p className="text-kua-gray600 leading-relaxed">
                        핀수영의 응용 기술과 고급 기법에 대한 내용입니다.
                    </p>
                </div>
                <div>
                    <h2 className="mb-4 text-2xl font-bold">훈련방법</h2>
                    <p className="text-kua-gray600 leading-relaxed">
                        효과적인 핀수영 훈련 방법과 프로그램에 대한 내용입니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

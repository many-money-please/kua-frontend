"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "terms" | "info" | "complete";

export const RegisterForm = () => {
    const router = useRouter();
    const [step, setStep] = useState<Step>("terms");

    // 약관 동의
    const [allAgree, setAllAgree] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    // 개인정보 입력
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        passwordConfirm: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        email: "",
        emailDomain: "",
        gender: "",
    });

    const handleAllAgree = (checked: boolean) => {
        setAllAgree(checked);
        setAgreeTerms(checked);
        setAgreePrivacy(checked);
    };

    const handleTermsNext = () => {
        if (!agreeTerms || !agreePrivacy) {
            alert("필수 약관에 동의해주세요.");
            return;
        }
        setStep("info");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("회원가입:", formData);
        // TODO: API 연동
        setStep("complete");
    };

    return (
        <div className="flex flex-col gap-[52px]">
            {/* 진행 단계 표시 */}
            <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-2">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            step === "terms"
                                ? "bg-kua-main text-white"
                                : "bg-kua-gray300 text-white"
                        }`}
                    >
                        1
                    </div>
                    <span
                        className={`text-base font-medium ${
                            step === "terms"
                                ? "text-kua-main"
                                : "text-kua-gray400"
                        }`}
                    >
                        약관동의
                    </span>
                </div>
                <div className="border-kua-gray300 h-px w-24 border-t"></div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            step === "info"
                                ? "bg-kua-main text-white"
                                : "bg-kua-gray300 text-white"
                        }`}
                    >
                        2
                    </div>
                    <span
                        className={`text-base font-medium ${
                            step === "info"
                                ? "text-kua-main"
                                : "text-kua-gray400"
                        }`}
                    >
                        정보입력
                    </span>
                </div>
                <div className="border-kua-gray300 h-px w-24 border-t"></div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            step === "complete"
                                ? "bg-kua-main text-white"
                                : "bg-kua-gray300 text-white"
                        }`}
                    >
                        3
                    </div>
                    <span
                        className={`text-base font-medium ${
                            step === "complete"
                                ? "text-kua-main"
                                : "text-kua-gray400"
                        }`}
                    >
                        가입완료
                    </span>
                </div>
            </div>

            {/* 약관 동의 단계 */}
            {step === "terms" && (
                <div className="flex flex-col gap-6">
                    {/* 안내 문구 */}
                    <div className="bg-kua-blue50 flex flex-col gap-4 rounded-[10px] px-6 py-5">
                        <div className="flex flex-col">
                            <p className="text-kua-gray800 text-base font-medium">
                                대한수중핀수영협회 이용약관, 개인정보의 수집 및
                                이용 항목에 대해 모두 동의합니다.
                            </p>
                            <p className="text-kua-gray800 text-base font-medium">
                                각 사항에 대한 동의 여부를 개별적으로 선택하실
                                수 있으며, 선택 동의 사항에 대한 동의를
                                거부하여도 서비스를 이용하실 수 있습니다.
                            </p>
                        </div>
                        <label className="text-kua-main flex items-center gap-2 text-lg font-semibold">
                            <input
                                type="checkbox"
                                checked={allAgree}
                                onChange={(e) =>
                                    handleAllAgree(e.target.checked)
                                }
                                className="form-checkbox text-kua-main h-4 w-4"
                            />
                            <span className="font-medium">
                                모두 동의합니다.
                            </span>
                        </label>
                    </div>

                    {/* 개인정보 수집 약관 동의 */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-kua-darkblue800 flex items-center gap-2 text-2xl font-bold">
                                개인정보 수집 약관 동의{" "}
                                <span className="text-kua-orange500 text-sm font-normal">
                                    (필수)
                                </span>
                            </h3>
                        </div>
                        <div className="border-kua-gray300 bg-kua-gray50 max-h-[150px] overflow-y-auto rounded-[10px] border px-5 py-3 text-sm">
                            <p className="text-kua-gray500 mb-2">
                                [제1장 제8조, 이용자에게 대한 통지 방법 및 의무]
                            </p>
                            <p className="text-kua-gray500 mb-2">
                                [제1장 제8조, 이용자에게 대한 통지 방법 및 의무]
                                이용자에게 대한 통지를 하는 경우 이메일 주소로
                                할 수 있습니다. 본 협회는 이용자 전체에 대한
                                통지의 경우 7일 이상 협회의 게시판에
                                게시함으로써 개별 통지에 갈음할 수 있습니다. 단,
                                이용자 본인의 거래와 관련하여 중대한 영향을
                                미치는 사항에 대하여는 개별 통지를 합니다.
                            </p>
                            <p className="text-kua-gray500 mb-2">
                                [제1장 제8조, 이용자에게 대한 통지 방법 및 의무]
                            </p>
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => {
                                    setAgreeTerms(e.target.checked);
                                    if (!e.target.checked) setAllAgree(false);
                                }}
                                className="form-checkbox text-kua-main h-4 w-4"
                            />
                            <span className="text-kua-gray800">
                                동의합니다.
                            </span>
                        </label>
                    </div>

                    {/* 마케팅 수신 약관 동의 */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-kua-darkblue800 flex items-center gap-2 text-2xl font-bold">
                                마케팅 수신 약관 동의{" "}
                                <span className="text-kua-gray800 text-sm font-normal">
                                    (선택)
                                </span>
                            </h3>
                        </div>
                        <div className="border-kua-gray300 bg-kua-gray50 max-h-[150px] overflow-y-auto rounded-[10px] border px-5 py-3 text-sm">
                            <p className="text-kua-gray500 mb-2">
                                [제1장 제8조, 이용자에게 대한 통지 방법 및 의무]
                            </p>
                            <p className="text-kua-gray500 mb-2">
                                [제1장 제8조, 이용자에게 대한 통지 방법 및 의무]
                                이용자에게 대한 통지를 하는 경우 이메일 주소로
                                할 수 있습니다. 본 협회는 이용자 전체에 대한
                                통지의 경우 7일 이상 협회의 게시판에
                                게시함으로써 개별 통지에 갈음할 수 있습니다. 단,
                                이용자 본인의 거래와 관련하여 중대한 영향을
                                미치는 사항에 대하여는 개별 통지를 합니다.
                            </p>
                            <p className="text-kua-gray500 mb-2">
                                [제1장 제8조, 이용자에게 대한 통지 방법 및 의무]
                            </p>
                        </div>
                        <label className="text-kua-gray800 flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agreePrivacy}
                                onChange={(e) => {
                                    setAgreePrivacy(e.target.checked);
                                    if (!e.target.checked) setAllAgree(false);
                                }}
                                className="form-checkbox text-kua-main h-4 w-4"
                            />
                            <span className="text-kua-gray800">
                                동의합니다.
                            </span>
                        </label>
                    </div>

                    {/* 다음 버튼 */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleTermsNext}
                            className="bg-kua-main hover:bg-kua-blue500 w-[200px] cursor-pointer rounded-[10px] px-8 py-3 text-xl font-bold text-white transition-colors"
                        >
                            다음
                        </button>
                    </div>
                </div>
            )}

            {/* 정보 입력 단계 */}
            {step === "info" && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className="text-kua-darkblue800 flex items-center gap-2 text-2xl font-bold">
                        개인정보 입력{" "}
                        <span className="text-kua-orange500 text-sm font-normal">
                            (필수)
                        </span>
                    </h3>

                    <div className="border-kua-main flex w-full flex-col border-t-2">
                        {/* 아이디 / 이름 */}
                        <div className="border-kua-gray300 flex h-[72px] w-full border-b">
                            {/* 아이디 */}
                            <div className="flex h-full flex-1 items-center">
                                <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                    아이디
                                </label>
                                <div className="flex h-full flex-1 items-center gap-3 p-4">
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value,
                                            })
                                        }
                                        placeholder="영문,숫자 포함 6~12자"
                                        className="border-kua-gray400 focus:border-kua-main h-full flex-1 rounded-[8px] border px-4 py-3 text-base outline-none"
                                    />
                                    <button
                                        type="button"
                                        disabled={
                                            formData.username.length === 0
                                        }
                                        onClick={() =>
                                            alert(
                                                "중복확인 기능은 추후 구현됩니다.",
                                            )
                                        }
                                        className={`h-full w-[84px] rounded-[8px] text-[15px] font-medium whitespace-nowrap transition-colors ${
                                            formData.username.length === 0
                                                ? "bg-kua-gray250 text-kua-gray400 cursor-not-allowed"
                                                : "bg-kua-main hover:bg-kua-blue500 cursor-pointer text-white"
                                        }`}
                                    >
                                        중복확인
                                    </button>
                                </div>
                            </div>

                            {/* 이름 */}
                            <div className="flex h-full flex-1 items-center">
                                <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                    이름
                                </label>
                                <div className="flex h-full flex-1 items-center p-4">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="영문,숫자 포함 6~12자"
                                        className="border-kua-gray400 focus:border-kua-main h-full w-full rounded-[8px] border px-4 py-3 text-base outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 비밀번호 / 비밀번호 확인 */}
                        <div className="border-kua-gray300 flex h-[72px] w-full border-b">
                            {/* 비밀번호 */}
                            <div className="flex h-full flex-1 items-center">
                                <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                    비밀번호
                                </label>
                                <div className="flex h-full flex-1 items-center p-4">
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder="영문,숫자,특수문자 조합 8자 이상"
                                        className="border-kua-gray400 focus:border-kua-main h-full w-full rounded-[8px] border px-4 py-3 text-base outline-none"
                                    />
                                </div>
                            </div>

                            {/* 비밀번호 확인 */}
                            <div className="flex h-full flex-1 items-center">
                                <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                    비밀번호 확인
                                </label>
                                <div className="flex h-full flex-1 items-center p-4">
                                    <input
                                        type="password"
                                        value={formData.passwordConfirm}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                passwordConfirm: e.target.value,
                                            })
                                        }
                                        placeholder="영문,숫자,특수문자 조합 8자 이상"
                                        className="border-kua-gray400 focus:border-kua-main h-full w-full rounded-[8px] border px-4 py-3 text-base outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 휴대폰 번호 / 생년월일 */}
                        <div className="border-kua-gray300 flex h-[72px] w-full border-b">
                            {/* 휴대폰 번호 */}
                            <div className="flex h-full flex-1 items-center">
                                <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                    휴대폰 번호
                                </label>
                                <div className="flex h-full flex-1 items-center p-4">
                                    <input
                                        type="text"
                                        placeholder="숫자만 입력해주세요."
                                        className="border-kua-gray400 focus:border-kua-main h-full w-full rounded-[8px] border px-4 py-3 text-base outline-none"
                                    />
                                </div>
                            </div>

                            {/* 생년월일 */}
                            <div className="flex h-full flex-1 items-center">
                                <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                    생년월일
                                </label>
                                <div className="flex h-full flex-1 items-center p-4">
                                    <input
                                        type="text"
                                        value={formData.birthYear}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                birthYear: e.target.value,
                                            })
                                        }
                                        placeholder="숫자만 6자로 입력해주세요."
                                        className="border-kua-gray400 focus:border-kua-main h-full flex-1 rounded-[8px] border px-4 py-3 text-base outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div className="border-kua-gray300 flex h-[72px] w-full items-center border-b">
                            <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[200px] items-center justify-center px-4 text-lg font-medium">
                                이메일
                            </label>
                            <div className="flex h-full flex-1 items-center gap-2 p-4">
                                <input
                                    type="text"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="border-kua-gray400 focus:border-kua-main h-full w-[200px] rounded-[8px] border px-4 py-3 text-base outline-none"
                                />
                                <span className="text-kua-gray800">@</span>
                                <input
                                    type="text"
                                    value={formData.emailDomain}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            emailDomain: e.target.value,
                                        })
                                    }
                                    className="border-kua-gray400 focus:border-kua-main h-full w-[200px] rounded-[8px] border px-4 py-3 text-base outline-none"
                                />
                                <select className="focus:border-kua-main bg-kua-gray100 h-full rounded-[8px] px-4 text-base outline-none">
                                    <option>직접입력</option>
                                    <option>naver.com</option>
                                    <option>gmail.com</option>
                                    <option>daum.net</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 버튼 */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => setStep("terms")}
                            className="border-kua-gray400 hover:bg-kua-gray100 w-[120px] cursor-pointer rounded-[10px] border bg-white px-8 py-3 text-xl font-medium transition-colors"
                        >
                            이전
                        </button>
                        <button
                            type="submit"
                            className="bg-kua-main hover:bg-kua-blue500 w-[200px] cursor-pointer rounded-[10px] px-8 py-3 text-xl font-bold text-white transition-colors"
                        >
                            다음
                        </button>
                    </div>
                </form>
            )}

            {/* 가입 완료 단계 */}
            {step === "complete" && (
                <div className="flex flex-col items-center gap-5 py-16">
                    <div className="bg-kua-blue50 flex h-15 w-15 items-center justify-center rounded-full">
                        <svg
                            className="text-kua-main h-10 w-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-kua-black100 text-[32px] font-bold">
                            회원가입 완료
                        </h2>
                        <p className="text-kua-gray800 text-center text-base">
                            로그인하고 보다 편리하게 서비스를 이용해보세요!
                        </p>
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="bg-kua-main hover:bg-kua-blue500 mt-2 cursor-pointer rounded-[10px] px-12 py-4 text-xl font-bold text-white transition-colors"
                        >
                            로그인하러 가기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

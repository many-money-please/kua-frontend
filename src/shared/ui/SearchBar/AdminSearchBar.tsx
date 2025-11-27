"use client";

type AdminSearchBarProps = {
    totalCount: number;
    searchQuery: string;
    searchOption: string;
    searchOptions?: string[];
    onSearchQueryChange: (query: string) => void;
    onSearchOptionChange: (option: string) => void;
    onSearch: () => void;
    onRegister: () => void;
    placeholder?: string;
    buttonText: string;
};

export const AdminSearchBar = ({
    totalCount,
    searchQuery,
    searchOption,
    searchOptions = ["제목"],
    onSearchQueryChange,
    onSearchOptionChange,
    onSearch,
    onRegister,
    placeholder = "검색어를 입력하세요",
    buttonText,
}: AdminSearchBarProps) => {
    return (
        <div className="flex h-full flex-col items-center justify-between sm:h-[40px] sm:flex-row">
            <div className="flex h-full w-full items-end gap-5 sm:items-center sm:justify-between">
                <div className="flex h-full flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    {searchOptions.length > 1 && (
                        <select
                            value={searchOption}
                            onChange={(e) =>
                                onSearchOptionChange(e.target.value)
                            }
                            className="bg-kua-gray100 h-full rounded-lg px-3 py-2"
                        >
                            {searchOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSearch();
                            }
                        }}
                        className="bg-kua-gray100 text-kua-gray400 h-full w-full rounded-lg px-4 py-2 sm:w-64"
                    />
                    <button
                        type="button"
                        onClick={onSearch}
                        className="bg-kua-blue500 text-kua-white hover:bg-kua-blue600 h-full cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors"
                    >
                        검색
                    </button>
                </div>
                <button
                    type="button"
                    onClick={onRegister}
                    className="hover:bg-kua-main hover:text-kua-white text-kua-main border-kua-main h-full cursor-pointer rounded-lg border px-6 py-2 font-semibold whitespace-nowrap transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

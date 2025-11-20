"use client";

type SearchBarProps = {
    totalCount: number;
    searchQuery: string;
    searchOption: string;
    searchOptions?: string[];
    onSearchQueryChange: (query: string) => void;
    onSearchOptionChange: (option: string) => void;
    onSearch: () => void;
    placeholder?: string;
};

export const SearchBar = ({
    totalCount,
    searchQuery,
    searchOption,
    searchOptions = ["제목"],
    onSearchQueryChange,
    onSearchOptionChange,
    onSearch,
    placeholder = "검색어를 입력하세요",
}: SearchBarProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold">목록</span>
                <span className="text-kua-gray800">
                    총{" "}
                    <span className="text-kua-blue300">
                        {totalCount.toLocaleString()}
                    </span>
                    건
                </span>
            </div>
            <div className="flex items-center gap-4">
                {searchOptions.length > 1 && (
                    <select
                        value={searchOption}
                        onChange={(e) => onSearchOptionChange(e.target.value)}
                        className="bg-kua-gray100 rounded-lg px-3 py-2"
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
                    className="bg-kua-gray100 text-kua-gray400 w-64 rounded-lg px-4 py-2"
                />
                <button
                    type="button"
                    onClick={onSearch}
                    className="bg-kua-blue500 text-kua-white hover:bg-kua-blue600 rounded-lg px-6 py-2 font-semibold transition-colors"
                >
                    검색
                </button>
            </div>
        </div>
    );
};

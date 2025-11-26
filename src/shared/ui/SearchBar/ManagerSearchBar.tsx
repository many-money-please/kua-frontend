"use client";

type ManagerSearchBarProps = {
    searchQuery: string;
    searchOption: string;
    searchOptions?: string[];
    onSearchQueryChange: (query: string) => void;
    onSearchOptionChange: (option: string) => void;
    selectedCount?: number;
    onSearch: () => void;
    onAdd: () => void;
    onDelete: () => void;
    placeholder?: string;
};

export const ManagerSearchBar = ({
    searchQuery,
    searchOption,
    searchOptions = ["제목"],
    onSearchQueryChange,
    onSearchOptionChange,
    selectedCount = 0,
    onSearch,
    onAdd,
    onDelete,
    placeholder = "검색어를 입력하세요",
}: ManagerSearchBarProps) => {
    return (
        <div className="flex flex-col gap-2 sm:h-[40px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex h-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                {searchOptions.length > 1 && (
                    <select
                        value={searchOption}
                        onChange={(e) => onSearchOptionChange(e.target.value)}
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
            <div className="flex h-full items-center gap-4">
                <button
                    type="button"
                    onClick={onAdd}
                    className="bg-kua-main text-kua-white hover:bg-kua-blue600 h-full cursor-pointer rounded-lg px-4 py-2 transition-colors"
                >
                    추가하기
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className={`${selectedCount > 0 ? "bg-kua-orange500 text-kua-white cursor-pointer hover:bg-orange-600" : "bg-kua-gray250 text-kua-gray400"} h-full rounded-lg px-4 py-2 transition-colors duration-200`}
                    disabled={selectedCount === 0}
                >
                    삭제 {selectedCount > 0 ? `(${selectedCount})` : ""}
                </button>
            </div>
        </div>
    );
};

"use client";

import { useMemo, useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";
import { clientFetch } from "@/shared/api/clientFetch";

export type CategoryItem = {
    id: number;
    boardName: string;
    skin: string;
    useComment: string;
    useEditor: string;
    permissionRead: string;
    permissionWrite: string;
    adminUser: string;
    useCategory: string;
    category1List: string[];
    category2List: string[];
    pageRpp: string;
    createdAt: string;
    createdBy: string | null;
    updatedAt: string | null;
    updatedBy: string | null;
};

type CategoryFormData = {
    boardName: string;
    skin: string;
    useComment: string;
    useEditor: string;
    permissionRead: string;
    permissionWrite: string;
    adminUser: string;
    useCategory: string;
    category1List: string;
    category2List: string;
    pageRpp: string;
};

export const CategoriesManager = () => {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("게시판명");
    const [selectedRows, setSelectedRows] = useState<CategoryItem[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
        null,
    );
    const [formData, setFormData] = useState<CategoryFormData>({
        boardName: "",
        skin: "default",
        useComment: "Y",
        useEditor: "Y",
        permissionRead: "all",
        permissionWrite: "all",
        adminUser: "",
        useCategory: "Y",
        category1List: "",
        category2List: "",
        pageRpp: "10",
    });

    // 카테고리 목록 가져오기
    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await clientFetch("/api/categories");
            if (!response.ok) {
                throw new Error("카테고리 목록을 가져오는데 실패했습니다.");
            }
            const data = await response.json();
            // 빈 문자열을 "N"으로 변환
            const normalizedData = (Array.isArray(data) ? data : []).map(
                (item: CategoryItem) => ({
                    ...item,
                    useComment:
                        item.useComment === "" ? "N" : item.useComment || "N",
                    useEditor:
                        item.useEditor === "" ? "N" : item.useEditor || "N",
                    useCategory:
                        item.useCategory === "" ? "N" : item.useCategory || "N",
                }),
            );
            setCategories(normalizedData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "카테고리를 불러오는데 실패했습니다.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return categories;
        return categories.filter((item) => {
            if (searchOption === "게시판명") {
                return item.boardName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }
            return true;
        });
    }, [categories, searchQuery, searchOption]);

    const columns: Column<CategoryItem>[] = [
        {
            key: "id",
            header: "ID",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.id}</span>
            ),
        },
        {
            key: "boardName",
            header: "게시판명",
            accessor: (row) => (
                <span className="text-kua-gray800 font-medium">
                    {row.boardName}
                </span>
            ),
        },
        {
            key: "skin",
            header: "스킨",
            accessor: (row) => (
                <span className="text-kua-gray600">{row.skin}</span>
            ),
        },
        {
            key: "useComment",
            header: "댓글",
            accessor: (row) => (
                <span className="text-kua-gray600">
                    {row.useComment === "Y" ? "사용" : "미사용"}
                </span>
            ),
        },
        {
            key: "useEditor",
            header: "에디터",
            accessor: (row) => (
                <span className="text-kua-gray600">
                    {row.useEditor === "Y" ? "사용" : "미사용"}
                </span>
            ),
        },
        {
            key: "permissionRead",
            header: "읽기 권한",
            accessor: (row) => (
                <span className="text-kua-gray600">{row.permissionRead}</span>
            ),
        },
        {
            key: "permissionWrite",
            header: "쓰기 권한",
            accessor: (row) => (
                <span className="text-kua-gray600">{row.permissionWrite}</span>
            ),
        },
        {
            key: "createdAt",
            header: "생성일",
            accessor: (row) => (
                <span className="text-kua-gray600">
                    {row.createdAt
                        ? new Date(row.createdAt).toLocaleDateString("ko-KR")
                        : "-"}
                </span>
            ),
        },
        {
            key: "actions",
            header: "작업",
            accessor: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(row);
                        }}
                        className="text-kua-blue500 hover:text-kua-blue700 rounded p-1 transition"
                        aria-label="수정"
                    >
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row.id);
                        }}
                        className="text-kua-orange500 hover:text-kua-orange700 rounded p-1 transition"
                        aria-label="삭제"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            ),
            className: "w-24",
        },
    ];

    const handleCreate = async () => {
        try {
            // category1List와 category2List를 문자열로 변환
            const requestData = {
                ...formData,
                category1List: formData.category1List || "",
                category2List: formData.category2List || "",
            };

            const response = await clientFetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(
                    result.error || "카테고리 생성에 실패했습니다.",
                );
            }

            alert("카테고리가 생성되었습니다.");
            setIsCreateModalOpen(false);
            setFormData({
                boardName: "",
                skin: "default",
                useComment: "Y",
                useEditor: "Y",
                permissionRead: "all",
                permissionWrite: "all",
                adminUser: "",
                useCategory: "Y",
                category1List: "",
                category2List: "",
                pageRpp: "10",
            });
            fetchCategories();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "카테고리 생성에 실패했습니다.",
            );
        }
    };

    const handleEdit = (category: CategoryItem) => {
        setEditingCategory(category);
        setFormData({
            boardName: category.boardName,
            skin: category.skin,
            useComment:
                category.useComment === "" ? "N" : category.useComment || "N",
            useEditor:
                category.useEditor === "" ? "N" : category.useEditor || "N",
            permissionRead: category.permissionRead || "all",
            permissionWrite: category.permissionWrite || "all",
            adminUser: category.adminUser || "",
            useCategory:
                category.useCategory === "" ? "N" : category.useCategory || "N",
            category1List: Array.isArray(category.category1List)
                ? category.category1List.join(",")
                : category.category1List || "",
            category2List: Array.isArray(category.category2List)
                ? category.category2List.join(",")
                : category.category2List || "",
            pageRpp: category.pageRpp || "10",
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingCategory) return;

        try {
            // category1List와 category2List를 문자열로 변환
            const requestData = {
                ...formData,
                category1List: formData.category1List || "",
                category2List: formData.category2List || "",
            };

            const response = await clientFetch(
                `/api/categories/${editingCategory.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                },
            );

            if (!response.ok) {
                const result = await response.json();
                throw new Error(
                    result.error || "카테고리 수정에 실패했습니다.",
                );
            }

            alert("카테고리가 수정되었습니다.");
            setIsEditModalOpen(false);
            setEditingCategory(null);
            fetchCategories();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "카테고리 수정에 실패했습니다.",
            );
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("정말 이 카테고리를 삭제하시겠습니까?")) {
            return;
        }

        try {
            const response = await clientFetch(`/api/categories/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(
                    result.error || "카테고리 삭제에 실패했습니다.",
                );
            }

            alert("카테고리가 삭제되었습니다.");
            fetchCategories();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "카테고리 삭제에 실패했습니다.",
            );
        }
    };

    const handleBulkDelete = async () => {
        if (selectedRows.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if (
            !confirm(
                `선택한 ${selectedRows.length}개의 카테고리를 삭제하시겠습니까?`,
            )
        ) {
            return;
        }

        try {
            await Promise.all(
                selectedRows.map((row) =>
                    clientFetch(`/api/categories/${row.id}`, {
                        method: "DELETE",
                    }),
                ),
            );

            alert(`${selectedRows.length}개의 카테고리가 삭제되었습니다.`);
            setSelectedRows([]);
            fetchCategories();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "카테고리 삭제에 실패했습니다.",
            );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10">
                <div className="text-kua-gray500">로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-10">
                <div className="text-kua-orange500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">카테고리 관리</h1>
            </div>

            <ManagerSearchBar
                searchQuery={searchQuery}
                searchOption={searchOption}
                searchOptions={["게시판명"]}
                onSearchQueryChange={setSearchQuery}
                onSearchOptionChange={setSearchOption}
                onSearch={() => {}}
                onAdd={() => setIsCreateModalOpen(true)}
                onDelete={handleBulkDelete}
                selectedCount={selectedRows.length}
            />

            <DataTable
                columns={columns}
                data={filteredData}
                onSelectionChange={(rows) => {
                    setSelectedRows(rows as CategoryItem[]);
                }}
                getRowId={(row) => String((row as CategoryItem).id)}
            />

            {/* 생성 모달 */}
            {isCreateModalOpen && (
                <CategoryModal
                    title="카테고리 생성"
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSave={handleCreate}
                    onCancel={() => {
                        setIsCreateModalOpen(false);
                        setFormData({
                            boardName: "",
                            skin: "default",
                            useComment: "Y",
                            useEditor: "Y",
                            permissionRead: "all",
                            permissionWrite: "all",
                            adminUser: "",
                            useCategory: "Y",
                            category1List: "",
                            category2List: "",
                            pageRpp: "10",
                        });
                    }}
                />
            )}

            {/* 수정 모달 */}
            {isEditModalOpen && editingCategory && (
                <CategoryModal
                    title="카테고리 수정"
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSave={handleUpdate}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setEditingCategory(null);
                    }}
                />
            )}
        </div>
    );
};

type CategoryModalProps = {
    title: string;
    formData: CategoryFormData;
    onFormDataChange: (data: CategoryFormData) => void;
    onSave: () => void;
    onCancel: () => void;
};

const CategoryModal = ({
    title,
    formData,
    onFormDataChange,
    onSave,
    onCancel,
}: CategoryModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-kua-white w-full max-w-2xl rounded-lg p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-bold">{title}</h2>

                <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            게시판명 *
                        </label>
                        <input
                            type="text"
                            value={formData.boardName}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    boardName: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            스킨
                        </label>
                        <input
                            type="text"
                            value={formData.skin}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    skin: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                댓글 사용
                            </label>
                            <select
                                value={formData.useComment}
                                onChange={(e) =>
                                    onFormDataChange({
                                        ...formData,
                                        useComment: e.target.value,
                                    })
                                }
                                className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                            >
                                <option value="Y">사용</option>
                                <option value="N">미사용</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                에디터 사용
                            </label>
                            <select
                                value={formData.useEditor}
                                onChange={(e) =>
                                    onFormDataChange({
                                        ...formData,
                                        useEditor: e.target.value,
                                    })
                                }
                                className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                            >
                                <option value="Y">사용</option>
                                <option value="N">미사용</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                읽기 권한
                            </label>
                            <input
                                type="text"
                                value={formData.permissionRead}
                                onChange={(e) =>
                                    onFormDataChange({
                                        ...formData,
                                        permissionRead: e.target.value,
                                    })
                                }
                                className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                                placeholder="all"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                쓰기 권한
                            </label>
                            <input
                                type="text"
                                value={formData.permissionWrite}
                                onChange={(e) =>
                                    onFormDataChange({
                                        ...formData,
                                        permissionWrite: e.target.value,
                                    })
                                }
                                className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                                placeholder="all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            관리자 사용자
                        </label>
                        <input
                            type="text"
                            value={formData.adminUser}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    adminUser: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            카테고리 사용
                        </label>
                        <select
                            value={formData.useCategory}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    useCategory: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                        >
                            <option value="Y">사용</option>
                            <option value="N">미사용</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            카테고리1 목록 (쉼표로 구분)
                        </label>
                        <input
                            type="text"
                            value={formData.category1List}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    category1List: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                            placeholder="카테고리1, 카테고리2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            카테고리2 목록 (쉼표로 구분)
                        </label>
                        <input
                            type="text"
                            value={formData.category2List}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    category2List: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                            placeholder="카테고리1, 카테고리2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            페이지당 항목 수
                        </label>
                        <input
                            type="text"
                            value={formData.pageRpp}
                            onChange={(e) =>
                                onFormDataChange({
                                    ...formData,
                                    pageRpp: e.target.value,
                                })
                            }
                            className="border-kua-gray300 focus:border-kua-main w-full rounded border px-3 py-2 outline-none"
                            placeholder="10"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border-kua-gray300 hover:bg-kua-gray100 rounded border px-4 py-2 transition"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={onSave}
                        className="bg-kua-blue500 hover:bg-kua-blue600 text-kua-white rounded px-4 py-2 transition"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

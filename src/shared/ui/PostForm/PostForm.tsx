"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import Image from "next/image";
import { PostEditor } from "@/shared/ui/PostEditor";

/**
 * PostForm
 *
 * 콘텐츠 작성 화면에서 자주 사용되는 필드(제목, 본문, 첨부파일, 이미지 등록)를
 * 레고 블록처럼 조립할 수 있도록 만든 컴포넌트 세트입니다.
 *
 * 사용 예시:
 * ```tsx
 * <PostForm.Root onSubmit={handleSubmit}>
 *   <PostForm.TitleField />
 *   <CustomCategoryField />
 *   <PostForm.ContentField />
 *   <PostForm.ImageField />
 *   <PostForm.AttachmentField />
 *   <PostForm.Actions />
 * </PostForm.Root>
 * ```
 *
 * 구성 요소:
 * - `Root`: 상태 관리와 전송을 담당. `onSubmit`, `initialValues`, `isSubmitting` 등을 받습니다.
 * - `TitleField`: 제목 입력 필드.
 * - `ContentField`: WYSIWYG 에디터(`PostEditor`)를 통한 본문 입력.
 * - `ImageField`: 이미지 업로드, 썸네일 미리보기, 삭제 및 용량/형식 안내.
 * - `AttachmentField`: 일반 파일 업로드와 목록 관리.
 * - `Actions`: 제출 버튼(필요 시 원하는 버튼으로 교체 가능).
 *
 * 추가 필드를 끼워 넣고 싶다면 `Root` 자식에 직접 JSX를 작성하면 됩니다.
 */

export type PostAttachment = {
    id: string;
    name: string;
    size: number;
    file: File;
};

export type PostImage = PostAttachment & {
    preview: string;
};

export type PostFormValues = {
    title: string;
    content: string;
    attachments: PostAttachment[];
    images: PostImage[];
    isPinned?: boolean;
};

type PostFormContextValue = {
    title: string;
    setTitle: (value: string) => void;
    content: string;
    setContent: (value: string) => void;
    attachments: PostAttachment[];
    handleFilesSelected: (files: FileList | null) => void;
    handleRemoveAttachment: (id: string) => void;
    images: PostImage[];
    handleImagesSelected: (files: FileList | null) => void;
    handleRemoveImage: (id: string) => void;
    isPinned: "none" | "pinned";
    setIsPinned: (value: "none" | "pinned") => void;
    isSubmitting: boolean;
    submitLabel: string;
    resetLabel: string;
};

const PostFormContext = createContext<PostFormContextValue | null>(null);

const usePostFormContext = () => {
    const context = useContext(PostFormContext);
    if (!context) {
        throw new Error(
            "PostForm components must be used within PostForm.Root",
        );
    }
    return context;
};

type PostFormRootProps = {
    onSubmit: (values: PostFormValues) => Promise<void> | void;
    initialValues?: Partial<
        Omit<PostFormValues, "attachments" | "isPinned">
    > & {
        attachments?: PostAttachment[];
        images?: PostImage[];
        isPinned?: boolean;
    };
    children: ReactNode;
    isSubmitting?: boolean;
    submitLabel?: string;
    resetLabel?: string;
};

const Root = ({
    onSubmit,
    initialValues,
    children,
    isSubmitting = false,
    submitLabel = "등록하기",
    resetLabel = "초기화",
}: PostFormRootProps) => {
    const [title, setTitle] = useState(initialValues?.title ?? "");
    const [content, setContent] = useState(initialValues?.content ?? "");
    const [attachments, setAttachments] = useState<PostAttachment[]>(
        initialValues?.attachments ?? [],
    );
    const [images, setImages] = useState<PostImage[]>(
        initialValues?.images ?? [],
    );
    const [isPinned, setIsPinned] = useState<"none" | "pinned">(
        initialValues?.isPinned ? "pinned" : "none",
    );

    const handleFilesSelected = useCallback((files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        const nextAttachments: PostAttachment[] = Array.from(files).map(
            (file) => ({
                id: crypto.randomUUID(),
                name: file.name,
                size: file.size,
                file,
            }),
        );

        setAttachments((prev) => [...prev, ...nextAttachments]);
    }, []);

    const handleRemoveAttachment = useCallback((id: string) => {
        setAttachments((prev) => prev.filter((file) => file.id !== id));
    }, []);

    const handleImagesSelected = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        const fileReaders = Array.from(files).map(
            (file) =>
                new Promise<PostImage>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve({
                            id: crypto.randomUUID(),
                            name: file.name,
                            size: file.size,
                            file,
                            preview: reader.result as string,
                        });
                    };
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                }),
        );

        const nextImages = await Promise.all(fileReaders);

        setImages((prev) => [...prev, ...nextImages]);
    }, []);

    const handleRemoveImage = useCallback((id: string) => {
        setImages((prev) => prev.filter((file) => file.id !== id));
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSubmit({
            title,
            content,
            attachments,
            images,
            isPinned: isPinned === "pinned",
        });
    };

    const value = useMemo<PostFormContextValue>(
        () => ({
            title,
            setTitle,
            content,
            setContent,
            attachments,
            handleFilesSelected,
            handleRemoveAttachment,
            images,
            handleImagesSelected,
            handleRemoveImage,
            isPinned,
            setIsPinned,
            isSubmitting,
            submitLabel,
            resetLabel,
        }),
        [
            attachments,
            content,
            handleFilesSelected,
            handleRemoveAttachment,
            handleImagesSelected,
            handleRemoveImage,
            images,
            isPinned,
            isSubmitting,
            resetLabel,
            submitLabel,
            title,
        ],
    );

    return (
        <PostFormContext.Provider value={value}>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                {children}
            </form>
        </PostFormContext.Provider>
    );
};

const TitleField = ({
    placeholder = "제목을 입력하세요",
}: {
    placeholder?: string;
}) => {
    const { title, setTitle } = usePostFormContext();
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="post-title">
                제목 <span className="text-kua-orange500 text-sm">(필수)</span>
            </label>
            <input
                id="post-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={placeholder}
                className="bg-kua-gray100 rounded-lg px-4 py-3"
                required
            />
        </div>
    );
};

const ContentField = () => {
    const { content, setContent } = usePostFormContext();
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
                내용 <span className="text-kua-orange500 text-sm">(필수)</span>
            </label>
            <PostEditor value={content} onChange={setContent} />
        </div>
    );
};

const AttachmentField = () => {
    const { attachments, handleFilesSelected, handleRemoveAttachment } =
        usePostFormContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold">파일 첨부</div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="border-kua-gray200 cursor-pointer rounded-lg border px-4 py-2"
                    onClick={() => fileInputRef.current?.click()}
                >
                    파일 선택
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(event) => handleFilesSelected(event.target.files)}
            />

            {attachments.length > 0 ? (
                <ul className="bg-kua-gray100 flex flex-col gap-2 rounded-lg px-4 py-3 text-sm">
                    {attachments.map((file) => (
                        <li
                            key={file.id}
                            className="text-kua-gray800 flex items-center justify-between gap-3"
                        >
                            <div className="flex flex-col">
                                <span>{file.name}</span>
                                <span className="text-kua-gray500 text-xs">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </span>
                            </div>
                            <button
                                type="button"
                                className="text-kua-gray500 hover:text-kua-gray800 text-xs"
                                onClick={() => handleRemoveAttachment(file.id)}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-kua-gray500 bg-kua-gray100 rounded-lg px-4 py-3 text-sm">
                    선택된 파일이 없습니다.
                </div>
            )}
            <span className="text-kua-gray500 text-xs">
                파일 용량 제한 : 최대 30MB
                <br />
                파일 형식 : PDF/DOC/DOCX/XLS/XLSX/HWP
            </span>
        </div>
    );
};

const ImageField = () => {
    const { images, handleImagesSelected, handleRemoveImage } =
        usePostFormContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold">이미지 등록</div>
                <button
                    type="button"
                    className="border-kua-gray200 w-fit cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold"
                    onClick={() => fileInputRef.current?.click()}
                >
                    이미지 추가하기
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png,image/jpg,image/jpeg"
                className="hidden"
                onChange={(event) => handleImagesSelected(event.target.files)}
            />

            <div className="border-kua-gray200 rounded-xl border bg-white p-4">
                <div className="grid max-h-[260px] grid-cols-5 gap-3 overflow-y-auto">
                    {images.length === 0 ? (
                        <div className="bg-kua-gray100 text-kua-gray400 col-span-5 flex h-28 items-center justify-center rounded-lg text-sm">
                            업로드된 이미지가 없습니다.
                        </div>
                    ) : (
                        images.map((image) => (
                            <div
                                key={image.id}
                                className="bg-kua-gray100 relative flex h-28 items-center justify-center rounded-lg"
                            >
                                <Image
                                    src={image.preview}
                                    alt={image.name}
                                    fill
                                    sizes="80px"
                                    className="rounded-lg object-cover"
                                />
                                <button
                                    type="button"
                                    className="bg-kua-gray800/80 absolute top-2 right-2 cursor-pointer rounded-full px-2 py-1 text-xs text-white"
                                    onClick={() => handleRemoveImage(image.id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="text-kua-gray500 mt-3 text-xs">
                파일 형식: PNG, JPG, JPEG <br></br> 이미지 용량 제한: 5MB 이하
            </div>
        </div>
    );
};

const PinField = () => {
    const { isPinned, setIsPinned } = usePostFormContext();

    return (
        <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">
                상단고정 <span className="text-kua-orange500">(필수)</span>
            </label>
            <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="radio"
                        name="isPinned"
                        value="none"
                        checked={isPinned === "none"}
                        onChange={(e) =>
                            setIsPinned(e.target.value as "none" | "pinned")
                        }
                        className="accent-kua-main h-5 w-5 cursor-pointer"
                    />
                    <span className="text-base">설정안함</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="radio"
                        name="isPinned"
                        value="pinned"
                        checked={isPinned === "pinned"}
                        onChange={(e) =>
                            setIsPinned(e.target.value as "none" | "pinned")
                        }
                        className="accent-kua-main h-5 w-5 cursor-pointer"
                    />
                    <span className="text-base">상단고정</span>
                </label>
            </div>
        </div>
    );
};

const Actions = () => {
    const { isSubmitting, submitLabel } = usePostFormContext();

    return (
        <div className="flex justify-start gap-4">
            <button
                type="submit"
                className="bg-kua-blue300 cursor-pointer rounded-lg px-6 py-3 font-normal text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? "처리 중..." : submitLabel}
            </button>
        </div>
    );
};

export const PostForm = {
    Root,
    TitleField,
    ContentField,
    AttachmentField,
    ImageField,
    PinField,
    Actions,
};

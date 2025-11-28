"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";
import {
    useGalleryPostDetailForEdit,
    useUpdateGalleryPost,
} from "@/shared/hooks/queries/galleryPosts";
import { uploadImageFiles } from "@/shared/api/imageUploadUtils";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function PhotoGalleryEditPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const router = useRouter();
    const id = resolvedParams.id;

    const {
        data: initialData,
        isLoading,
        error,
    } = useGalleryPostDetailForEdit(id);
    const updateGalleryPost = useUpdateGalleryPost(id);

    const handleSubmit = async (data: PostFormValues) => {
        try {
            // 기존 이미지 ID와 새로 추가할 이미지 파일 분리
            const existingImageIds: number[] = [];
            const newImageFiles: File[] = [];

            if (data.images) {
                for (const image of data.images) {
                    // galleryId가 있으면 기존 이미지, 없으면 새 이미지
                    const galleryId = (
                        image as unknown as { galleryId: number }
                    ).galleryId;
                    if (galleryId && typeof galleryId === "number") {
                        existingImageIds.push(galleryId);
                    } else {
                        newImageFiles.push(image.file);
                    }
                }
            }

            // 새 이미지 업로드
            const newGalleryIds: number[] = [];
            if (newImageFiles.length > 0) {
                const uploadedImages = await uploadImageFiles(
                    newImageFiles,
                    "/api/gallery-posts/images",
                );
                newGalleryIds.push(...uploadedImages.map((img) => img.id));
            }

            // 기존 이미지 ID와 새로 업로드한 이미지 ID를 모두 addGalleryIds에 포함
            const addGalleryIds = [...existingImageIds, ...newGalleryIds];

            // 삭제할 이미지 ID 계산 (기존 이미지 중 현재 선택되지 않은 것)
            const currentImageIds =
                initialData?.images?.map(
                    (img: { galleryId: number }) => img.galleryId,
                ) || [];
            const deleteGalleryIds = currentImageIds.filter(
                (id: number) => !existingImageIds.includes(id),
            );

            // 기존 첨부파일 ID와 새로 추가할 첨부파일 파일 분리
            const existingFileIds: number[] = [];
            const newAttachmentFiles: File[] = [];

            if (data.attachments) {
                for (const attachment of data.attachments) {
                    // fileId가 있으면 기존 첨부파일, 없으면 새 첨부파일
                    const fileId = (attachment as { fileId?: number }).fileId;
                    if (fileId && typeof fileId === "number") {
                        existingFileIds.push(fileId);
                    } else {
                        newAttachmentFiles.push(attachment.file);
                    }
                }
            }

            // 삭제할 첨부파일 ID 계산 (기존 첨부파일 중 현재 선택되지 않은 것)
            const currentFileIds =
                initialData?.attachments
                    ?.map((att) => (att as { fileId?: number }).fileId)
                    .filter((id): id is number => id !== undefined) || [];
            const deleteFileIds = currentFileIds.filter(
                (id: number) => !existingFileIds.includes(id),
            );

            // 게시글 수정
            updateGalleryPost.mutate(
                {
                    title: data.title,
                    content: data.content,
                    isTopFixed: data.isPinned ? 1 : 0,
                    isShow: 1,
                    addGalleryIds:
                        addGalleryIds.length > 0 ? addGalleryIds : undefined,
                    deleteGalleryIds:
                        deleteGalleryIds.length > 0
                            ? deleteGalleryIds
                            : undefined,
                    attachments:
                        newAttachmentFiles.length > 0
                            ? newAttachmentFiles
                            : undefined,
                    deleteFileIds:
                        deleteFileIds.length > 0 ? deleteFileIds : undefined,
                },
                {
                    onSuccess: () => {
                        alert("포토갤러리가 수정되었습니다.");
                    },
                    onError: (error) => {
                        alert(
                            error.message || "포토갤러리 수정에 실패했습니다.",
                        );
                    },
                },
            );
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "포토갤러리 수정에 실패했습니다.",
            );
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (error) {
        console.error("[포토갤러리 수정] 에러:", error);
        alert(error.message || "게시글을 불러오는데 실패했습니다.");
        router.push(`/community/photo-gallery/${id}`);
        return null;
    }

    if (!initialData) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">게시글을 불러올 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">포토갤러리 수정</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <PostForm.Root
                    onSubmit={handleSubmit}
                    isSubmitting={updateGalleryPost.isPending}
                    initialValues={initialData}
                    submitLabel="수정하기"
                >
                    <PostForm.PinField />
                    <PostForm.TitleField placeholder="제목을 입력하세요 (200자 이내)" />
                    <PostForm.ContentField />
                    <PostForm.AttachmentField />
                    <PostForm.ImageField />
                    <PostForm.Actions />
                </PostForm.Root>
            </div>
        </div>
    );
}

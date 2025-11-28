"use client";

import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";
import { useCreateGalleryPost } from "@/shared/hooks/queries/galleryPosts";
import { uploadImageFiles } from "@/shared/api/imageUploadUtils";

export default function PhotoGalleryCreatePage() {
    const createGalleryPost = useCreateGalleryPost();

    const handleSubmit = async (data: PostFormValues) => {
        try {
            // 1. 이미지 파일들을 먼저 업로드하고 ID 수집
            const galleryIds: number[] = [];
            if (data.images && data.images.length > 0) {
                const uploadedImages = await uploadImageFiles(
                    data.images.map((img) => img.file),
                    "/api/gallery-posts/images",
                );
                galleryIds.push(...uploadedImages.map((img) => img.id));
            }

            // 2. 게시글 생성
            const attachmentFiles =
                data.attachments?.map((attachment) => attachment.file) ?? [];

            createGalleryPost.mutate(
                {
                    title: data.title,
                    content: data.content,
                    isTopFixed: data.isPinned ? 1 : 0,
                    isShow: 1,
                    galleryIds,
                    attachments: attachmentFiles,
                },
                {
                    onSuccess: () => {
                        alert("포토갤러리가 등록되었습니다.");
                    },
                    onError: (error) => {
                        alert(
                            error.message || "포토갤러리 생성에 실패했습니다.",
                        );
                    },
                },
            );
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "포토갤러리 생성에 실패했습니다.",
            );
        }
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">포토갤러리 등록</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <PostForm.Root
                    onSubmit={handleSubmit}
                    isSubmitting={createGalleryPost.isPending}
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

/**
 * 포토갤러리 관련 TanStack Query hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { DetailPageData } from "@/shared/ui/DetailPage";
import {
    buildFileUrl,
    convertRelativeImgSrcToAbsolute,
    formatAttachments,
} from "@/shared/lib/htmlUtils";

// API 응답 타입
export type GalleryPostItem = {
    id: number;
    title: string;
    username: string;
    isTopFixed: number;
    isShow: number;
    hit: number;
    imageCount: number;
    thumbnailPath: string;
    createdAt: string;
};

export type GalleryPostListResponse = {
    posts: GalleryPostItem[];
    totalCount: number;
    page: number;
    size: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

export type GalleryPostDetail = {
    id: number;
    title: string;
    content: string;
    username: string;
    isTopFixed: number;
    isShow: number;
    hit: number;
    createdAt: string;
    updatedAt: string;
    galleries: Array<{
        id: number;
        fileName: string;
        filePath: string;
        createdAt: string;
    }>;
    files?: Array<{
        id: number;
        fileName: string;
        filePath: string;
        createdAt: string;
    }>;
};

export type GalleryPostCreateRequest = {
    title: string;
    content: string;
    isTopFixed?: number;
    isShow?: number;
    galleryIds?: number[];
    attachments?: File[];
};

export type GalleryPostUpdateRequest = {
    title: string;
    content: string;
    isTopFixed?: number;
    isShow?: number;
    addGalleryIds?: number[];
    deleteGalleryIds?: number[];
    attachments?: File[];
    deleteFileIds?: number[];
};

// API 함수들
async function fetchGalleryPosts(params: {
    page?: number;
    title?: string;
}): Promise<GalleryPostListResponse> {
    const { clientFetch } = await import("@/shared/api/clientFetch");

    let url = "/api/gallery-posts";
    const queryParams = new URLSearchParams();
    if (params.page) {
        queryParams.append("page", String(params.page));
    }
    if (params.title) {
        queryParams.append("title", params.title);
    }
    if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
    }

    const response = await clientFetch(url);

    if (!response.ok) {
        const result = await response.json();
        throw new Error(
            result.error ||
                `포토갤러리 목록을 가져오는데 실패했습니다: ${response.status}`,
        );
    }

    return await response.json();
}

async function fetchGalleryPostDetail(id: string): Promise<DetailPageData> {
    const { clientFetch } = await import("@/shared/api/clientFetch");
    const response = await clientFetch(`/api/gallery-posts/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("해당 게시글을 찾을 수 없습니다.");
        }
        const result = await response.json();
        throw new Error(
            result.error ||
                `포토갤러리를 가져오는데 실패했습니다: ${response.status}`,
        );
    }

    const result: GalleryPostDetail = await response.json();

    // galleries를 images 배열로 변환
    const images =
        result.galleries
            ?.map((gallery) => buildFileUrl(gallery.filePath))
            .filter((img): img is string => img !== null) || [];

    const attachments = formatAttachments(result.files);

    return {
        id: result.id || Number(id),
        title: result.title || "",
        registrationDate: result.createdAt || "",
        views: result.hit || 0,
        isSecret: false,
        content: result.content || "",
        images: images.filter((img): img is string => img !== null),
        attachments,
    };
}

async function createGalleryPost(
    data: GalleryPostCreateRequest,
): Promise<GalleryPostDetail> {
    const { clientFetch } = await import("@/shared/api/clientFetch");
    const { processBase64ImagesInContent } = await import(
        "@/shared/api/noticeUtils"
    );

    // base64 이미지를 업로드하고 content의 src를 filePath로 교체
    const processedContent = await processBase64ImagesInContent(
        data.content,
        "/api/gallery-posts/images",
    );

    const requestPayload = {
        title: data.title,
        content: processedContent,
        isTopFixed: data.isTopFixed ?? 0,
        isShow: data.isShow ?? 1,
        galleryIds:
            data.galleryIds && data.galleryIds.length > 0
                ? data.galleryIds
                : undefined,
    };

    console.log("[포토갤러리 POST] 요청 데이터:", {
        payload: requestPayload,
        attachmentsCount: data.attachments?.length || 0,
    });

    const formData = new FormData();
    formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
            type: "application/json",
        }),
    );

    if (data.attachments?.length) {
        for (const file of data.attachments) {
            formData.append("files", file);
        }
    }

    const response = await clientFetch("/api/gallery-posts", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "포토갤러리 생성에 실패했습니다.");
    }

    return await response.json();
}

async function updateGalleryPost(
    id: string,
    data: GalleryPostUpdateRequest,
): Promise<GalleryPostDetail> {
    const { clientFetch } = await import("@/shared/api/clientFetch");
    const { processBase64ImagesInContent } = await import(
        "@/shared/api/noticeUtils"
    );

    // base64 이미지를 업로드하고 content의 src를 filePath로 교체
    const processedContent = await processBase64ImagesInContent(
        data.content,
        "/api/gallery-posts/images",
    );

    const requestPayload = {
        title: data.title,
        content: processedContent,
        isTopFixed: data.isTopFixed ?? 0,
        isShow: data.isShow ?? 1,
        addGalleryIds:
            data.addGalleryIds && data.addGalleryIds.length > 0
                ? data.addGalleryIds
                : undefined,
        deleteGalleryIds:
            data.deleteGalleryIds && data.deleteGalleryIds.length > 0
                ? data.deleteGalleryIds
                : undefined,
        deleteFileIds:
            data.deleteFileIds && data.deleteFileIds.length > 0
                ? data.deleteFileIds
                : undefined,
    };

    console.log("[포토갤러리 PUT] 요청 데이터:", {
        id,
        payload: requestPayload,
        attachmentsCount: data.attachments?.length || 0,
    });

    const formData = new FormData();
    formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
            type: "application/json",
        }),
    );

    if (data.attachments?.length) {
        for (const file of data.attachments) {
            formData.append("files", file);
        }
    }

    const response = await clientFetch(`/api/gallery-posts/${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "포토갤러리 수정에 실패했습니다.");
    }

    return await response.json();
}

async function deleteGalleryPost(id: number): Promise<void> {
    const { clientFetch } = await import("@/shared/api/clientFetch");
    const response = await clientFetch(`/api/gallery-posts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || `포토갤러리 ${id} 삭제 실패`);
    }
}

// Query Keys
export const galleryPostKeys = {
    all: ["gallery-posts"] as const,
    lists: () => [...galleryPostKeys.all, "list"] as const,
    list: (filters?: { page?: number; title?: string }) =>
        [...galleryPostKeys.lists(), filters] as const,
    details: () => [...galleryPostKeys.all, "detail"] as const,
    detail: (id: string) => [...galleryPostKeys.details(), id] as const,
    detailForEdit: (id: string) =>
        [...galleryPostKeys.details(), id, "edit"] as const,
};

// Hooks
export function useGalleryPosts(params?: { page?: number; title?: string }) {
    return useQuery({
        queryKey: galleryPostKeys.list(params),
        queryFn: () => fetchGalleryPosts(params || {}),
    });
}

export function useGalleryPostDetail(id: string) {
    return useQuery({
        queryKey: galleryPostKeys.detail(id),
        queryFn: () => fetchGalleryPostDetail(id),
        enabled: !!id,
    });
}

export function useGalleryPostDetailForEdit(id: string) {
    return useQuery({
        queryKey: galleryPostKeys.detailForEdit(id),
        queryFn: async () => {
            const { clientFetch } = await import("@/shared/api/clientFetch");
            const response = await clientFetch(`/api/gallery-posts/${id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("해당 게시글을 찾을 수 없습니다.");
                }
                const result = await response.json();
                throw new Error(
                    result.error ||
                        `포토갤러리를 가져오는데 실패했습니다: ${response.status}`,
                );
            }

            const result: GalleryPostDetail = await response.json();

            // 첨부파일을 PostAttachment 형식으로 변환
            const attachments =
                result.files?.map((file) => {
                    return {
                        id: String(file.id),
                        name: file.fileName || "첨부파일",
                        size: 0,
                        file: new File([], file.fileName || `file-${file.id}`), // 더미 파일
                        fileId: file.id, // 삭제를 위한 파일 ID 저장
                    };
                }) || [];

            return {
                title: result.title || "",
                content: convertRelativeImgSrcToAbsolute(result.content || ""),
                isPinned: result.isTopFixed === 1,
                attachments,
                images:
                    result.galleries
                        ?.filter((g) => g.filePath) // filePath가 있는 것만 필터링
                        .map((g) => {
                            const imageUrl = buildFileUrl(g.filePath);
                            // URL이 없으면 null 반환하여 필터링
                            if (!imageUrl) return null;

                            return {
                                id: String(g.id),
                                name: g.fileName || `이미지 ${g.id}`,
                                url: imageUrl,
                                galleryId: g.id, // 갤러리 ID 저장
                                preview: imageUrl, // preview는 절대 URL 사용
                                size: 0,
                                file: new File(
                                    [],
                                    g.fileName || `image-${g.id}`,
                                ), // 더미 파일 (실제로는 사용 안 함)
                            };
                        })
                        .filter(
                            (img): img is NonNullable<typeof img> =>
                                img !== null,
                        ) || [],
            };
        },
        enabled: !!id,
    });
}

export function useCreateGalleryPost() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: createGalleryPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: galleryPostKeys.lists(),
            });
            router.push("/community/photo-gallery");
            router.refresh();
        },
    });
}

export function useUpdateGalleryPost(id: string) {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: GalleryPostUpdateRequest) =>
            updateGalleryPost(id, data),
        onSuccess: async () => {
            // 백엔드가 ID만 반환하므로 상세 정보를 다시 가져옴
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: galleryPostKeys.detail(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: galleryPostKeys.detailForEdit(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: galleryPostKeys.lists(),
                }),
            ]);
            // 상세 정보를 미리 가져와서 캐시에 저장
            await queryClient.refetchQueries({
                queryKey: galleryPostKeys.detail(id),
            });
            router.push(`/community/photo-gallery/${id}`);
            router.refresh();
        },
    });
}

export function useDeleteGalleryPost() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: number) => deleteGalleryPost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: galleryPostKeys.lists(),
            });
            router.refresh();
        },
    });
}

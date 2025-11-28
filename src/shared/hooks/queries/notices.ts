/**
 * 공지사항 관련 TanStack Query hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { PostFormValues } from "@/shared/ui/PostForm";
import type { DetailPageData } from "@/shared/ui/DetailPage";
import {
    convertRelativeImgSrcToAbsolute,
    formatAttachments,
} from "@/shared/lib/htmlUtils";

// API 함수들
async function fetchNoticeDetail(id: string): Promise<DetailPageData> {
    const { clientFetch } = await import("@/shared/api/clientFetch");
    const response = await clientFetch(`/api/community/notices/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("해당 게시글을 찾을 수 없습니다.");
        }
        const result = await response.json();
        throw new Error(
            result.error ||
                `공지사항을 가져오는데 실패했습니다: ${response.status}`,
        );
    }

    const result = await response.json();

    return {
        id: result.id || Number(id),
        title: result.title || "",
        registrationDate: result.createdAt || result.registrationDate || "",
        views: result.hit || result.views || 0,
        isSecret: result.isSecret || false,
        content: result.content || "",
        attachments: formatAttachments(result.files),
        images: result.images || [],
    };
}

async function createNotice(data: PostFormValues) {
    const { createNoticeFormData, processBase64ImagesInContent } = await import(
        "@/shared/api/noticeUtils"
    );

    // base64 이미지를 업로드하고 content의 src를 filePath로 교체
    const processedContent = await processBase64ImagesInContent(data.content);

    // 처리된 content로 FormData 생성
    const formData = createNoticeFormData({
        ...data,
        content: processedContent,
    });

    const { clientFetch } = await import("@/shared/api/clientFetch");
    const response = await clientFetch("/api/community/notices", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "공지사항 생성에 실패했습니다.");
    }

    return await response.json();
}

async function updateNotice(id: string, data: PostFormValues) {
    const { createNoticeFormData, processBase64ImagesInContent } = await import(
        "@/shared/api/noticeUtils"
    );

    // base64 이미지를 업로드하고 content의 src를 filePath로 교체
    const processedContent = await processBase64ImagesInContent(data.content);

    // 처리된 content로 FormData 생성
    const formData = createNoticeFormData({
        ...data,
        content: processedContent,
    });

    const { clientFetch } = await import("@/shared/api/clientFetch");
    const response = await clientFetch(`/api/community/notices/${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "공지사항 수정에 실패했습니다.");
    }

    return await response.json();
}

async function deleteNotice(id: number) {
    const { clientFetch } = await import("@/shared/api/clientFetch");
    const response = await clientFetch(`/api/community/notices/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || `공지사항 ${id} 삭제 실패`);
    }

    return await response.json();
}

// Query Keys
export const noticeKeys = {
    all: ["notices"] as const,
    lists: () => [...noticeKeys.all, "list"] as const,
    list: (filters?: { page?: number; title?: string }) =>
        [...noticeKeys.lists(), filters] as const,
    details: () => [...noticeKeys.all, "detail"] as const,
    detail: (id: string) => [...noticeKeys.details(), id] as const,
    detailForEdit: (id: string) =>
        [...noticeKeys.details(), "edit", id] as const,
};

// Hooks
export function useNoticeDetail(id: string) {
    return useQuery({
        queryKey: noticeKeys.detail(id),
        queryFn: () => fetchNoticeDetail(id),
        enabled: !!id,
    });
}

export function useNoticeDetailForEdit(id: string) {
    return useQuery({
        queryKey: noticeKeys.detailForEdit(id),
        queryFn: async () => {
            const { clientFetch } = await import("@/shared/api/clientFetch");
            const response = await clientFetch(`/api/community/notices/${id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("해당 게시글을 찾을 수 없습니다.");
                }
                const result = await response.json();
                throw new Error(
                    result.error ||
                        `공지사항을 가져오는데 실패했습니다: ${response.status}`,
                );
            }

            const result = await response.json();

            const processedContent = convertRelativeImgSrcToAbsolute(
                result.content || "",
            );

            // PostFormValues 형식으로 변환
            return {
                title: result.title || "",
                content: processedContent,
                isPinned: result.isTopFixed === 1,
                attachments: [],
                images: [],
            };
        },
        enabled: !!id,
    });
}

export function useCreateNotice() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: createNotice,
        onSuccess: () => {
            // 공지사항 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
            router.push("/community/notices");
            router.refresh();
        },
    });
}

export function useUpdateNotice(id: string) {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: PostFormValues) => updateNotice(id, data),
        onSuccess: async () => {
            // 상세 페이지, 수정 페이지, 목록 캐시 모두 무효화
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: noticeKeys.detail(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: noticeKeys.detailForEdit(id),
                }),
                queryClient.invalidateQueries({ queryKey: noticeKeys.lists() }),
            ]);
            router.push(`/community/notices/${id}`);
            router.refresh();
        },
    });
}

export function useDeleteNotice() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: deleteNotice,
        onSuccess: () => {
            // 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
            router.refresh();
        },
    });
}

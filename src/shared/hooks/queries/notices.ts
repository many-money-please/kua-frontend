/**
 * 공지사항 관련 TanStack Query hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { PostFormValues } from "@/shared/ui/PostForm";
import type { DetailPageData } from "@/shared/ui/DetailPage";

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

    // 백엔드 응답을 DetailPageData 형식으로 변환
    const API_BASE_URL =
        (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "") ?? "";

    const buildFileUrl = (filePath?: string) => {
        if (!filePath) return null;
        if (/^https?:\/\//i.test(filePath)) return filePath;
        const normalizedPath = filePath.startsWith("/")
            ? filePath
            : `/${filePath}`;
        return API_BASE_URL
            ? `${API_BASE_URL}${normalizedPath}`
            : normalizedPath;
    };

    const formatNoticeAttachments = (
        files?: Array<{
            fileName?: string;
            filePath?: string;
        }>,
    ) => {
        if (!files || files.length === 0) return [];
        return files
            .map((file) => {
                const url = buildFileUrl(file.filePath);
                if (!url) return null;
                return { name: file.fileName || "첨부파일", url };
            })
            .filter(
                (attachment): attachment is { name: string; url: string } =>
                    attachment !== null,
            );
    };

    return {
        id: result.id || Number(id),
        title: result.title || "",
        registrationDate: result.createdAt || result.registrationDate || "",
        views: result.hit || result.views || 0,
        isSecret: result.isSecret || false,
        content: result.content || "",
        attachments: formatNoticeAttachments(result.files),
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
        queryKey: noticeKeys.detail(id),
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

            // PostFormValues 형식으로 변환
            return {
                title: result.title || "",
                content: result.content || "",
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
        onSuccess: () => {
            // 상세 페이지와 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: noticeKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
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

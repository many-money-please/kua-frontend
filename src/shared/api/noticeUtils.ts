/**
 * 공지사항 API 관련 유틸리티 함수
 */

import type { PostFormValues } from "@/shared/ui/PostForm";

/**
 * PostFormValues를 백엔드로 전송할 FormData로 변환
 */
export function createNoticeFormData(data: PostFormValues): FormData {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("isTopFixed", data.isPinned ? "1" : "0");
    formData.append("isShow", "1");

    const allFiles: File[] = [];

    for (const attachment of data.attachments) {
        if (attachment.file instanceof File) {
            allFiles.push(attachment.file);
        }
    }

    for (const image of data.images) {
        if (image.file instanceof File) {
            allFiles.push(image.file);
        }
    }

    for (const file of allFiles) {
        formData.append("files", file);
    }

    return formData;
}

/**
 * 백엔드로 전송할 request 객체 생성
 */
export function createNoticeRequestData(
    title: string,
    content: string,
    isTopFixed: string | null,
    isShow: string | null,
): {
    title: string;
    content: string;
    isTopFixed?: number;
    isShow?: number;
} {
    const requestData: {
        title: string;
        content: string;
        isTopFixed?: number;
        isShow?: number;
    } = {
        title,
        content,
    };

    if (isTopFixed !== null) {
        requestData.isTopFixed =
            typeof isTopFixed === "string"
                ? parseInt(isTopFixed, 10)
                : Number(isTopFixed);
    }

    if (isShow !== null) {
        requestData.isShow =
            typeof isShow === "string" ? parseInt(isShow, 10) : Number(isShow);
    } else {
        requestData.isShow = 1;
    }

    return requestData;
}

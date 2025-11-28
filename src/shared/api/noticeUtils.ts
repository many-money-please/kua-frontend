/**
 * 공지사항 API 관련 유틸리티 함수
 */

import type { PostFormValues } from "@/shared/ui/PostForm";

/**
 * base64 데이터 URL을 File 객체로 변환
 */
function base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

/**
 * HTML content에서 base64 이미지를 추출
 */
function extractBase64Images(html: string): Array<{
    base64: string;
    fullMatch: string;
    index: number;
}> {
    const base64Regex =
        /<img[^>]+src=["'](data:image\/[^;]+;base64,[^"']+)["'][^>]*>/gi;
    const images: Array<{
        base64: string;
        fullMatch: string;
        index: number;
    }> = [];
    let match;

    while ((match = base64Regex.exec(html)) !== null) {
        images.push({
            base64: match[1],
            fullMatch: match[0],
            index: match.index,
        });
    }

    return images;
}

/**
 * base64 이미지를 업로드하고 content의 src를 filePath로 교체
 * @param content HTML 콘텐츠
 * @param imageUploadEndpoint 이미지 업로드 API 엔드포인트 (기본값: 공지사항 이미지 업로드)
 * @returns 처리된 HTML 콘텐츠
 */
export async function processBase64ImagesInContent(
    content: string,
    imageUploadEndpoint: string = "/api/community/notices/images",
): Promise<string> {
    const images = extractBase64Images(content);
    if (images.length === 0) {
        return content;
    }

    let processedContent = content;

    // 각 base64 이미지를 업로드하고 교체
    for (const image of images) {
        try {
            // base64에서 파일 확장자 추출 (기본값: png)
            const mimeMatch = image.base64.match(/data:image\/([^;]+);/);
            const extension = mimeMatch?.[1] || "png";
            const filename = `image-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

            // base64를 File로 변환
            const file = base64ToFile(image.base64, filename);

            // 이미지 업로드
            const formData = new FormData();
            formData.append("file", file);

            const { clientFetch } = await import("@/shared/api/clientFetch");
            const response = await clientFetch(imageUploadEndpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error(`[이미지 업로드 실패] 상태: ${response.status}`);
                continue; // 업로드 실패 시 해당 이미지는 건너뛰기
            }

            const result = await response.json();
            const filePath = result.filePath;

            if (!filePath) {
                console.error("[이미지 업로드 실패] filePath가 없습니다.");
                continue;
            }

            // base64 src를 filePath로 교체
            const newSrc = filePath.startsWith("/") ? filePath : `/${filePath}`;
            const newImgTag = image.fullMatch.replace(
                /src=["']([^"']+)["']/i,
                `src="${newSrc}"`,
            );
            processedContent = processedContent.replace(
                image.fullMatch,
                newImgTag,
            );
        } catch (error) {
            console.error("[이미지 업로드 에러]:", error);
            // 에러 발생 시 해당 이미지는 건너뛰고 계속 진행
        }
    }

    return processedContent;
}

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

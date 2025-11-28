/**
 * 파일 경로를 절대 URL로 변환
 */
export function buildFileUrl(
    filePath?: string,
    baseUrl: string = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
        /\/$/,
        "",
    ) || "",
): string | null {
    if (!filePath) return null;
    if (/^https?:\/\//i.test(filePath)) return filePath;
    const normalizedPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
    return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
}

/**
 * HTML 콘텐츠에서 상대 경로(/uploads/...)인 이미지 src를 절대 URL로 변환
 */
export function convertRelativeImgSrcToAbsolute(
    html: string,
    baseUrl: string = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
        /\/$/,
        "",
    ) || "",
): string {
    if (!baseUrl || !html) {
        return html;
    }

    return html.replace(
        /<img([^>]+)src=["'](\/uploads\/[^"']+)["']/gi,
        (match: string, attrs: string, src: string) => {
            if (/^https?:\/\//i.test(src)) {
                return match;
            }
            const absoluteUrl = `${baseUrl}${src}`;
            return `<img${attrs}src="${absoluteUrl}"`;
        },
    );
}

/**
 * 파일 배열을 첨부파일 형식으로 변환
 */
export function formatAttachments(
    files?: Array<{
        fileName?: string;
        filePath?: string;
    }>,
): Array<{ name: string; url: string }> {
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
}

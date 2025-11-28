/**
 * 이미지 업로드 공통 유틸리티
 * 공지사항, 갤러리 등 여러 게시글 타입에서 사용 가능
 */

/**
 * 단일 이미지 파일 업로드
 * @param file 업로드할 이미지 파일
 * @param endpoint 업로드 API 엔드포인트 (예: "/api/community/notices/images" 또는 "/api/gallery-posts/images")
 * @returns 업로드된 이미지 정보 { id, fileName, filePath }
 */
export async function uploadImageFile(
    file: File,
    endpoint: string,
): Promise<{ id: number; fileName: string; filePath: string }> {
    const { clientFetch } = await import("@/shared/api/clientFetch");

    const formData = new FormData();
    formData.append("file", file);

    const response = await clientFetch(endpoint, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(
            result.error || `이미지 업로드에 실패했습니다: ${response.status}`,
        );
    }

    const result = await response.json();
    return {
        id: result.id,
        fileName: result.fileName,
        filePath: result.filePath,
    };
}

/**
 * 여러 이미지 파일 업로드
 * @param files 업로드할 이미지 파일 배열
 * @param endpoint 업로드 API 엔드포인트
 * @returns 업로드된 이미지 정보 배열
 */
export async function uploadImageFiles(
    files: File[],
    endpoint: string,
): Promise<Array<{ id: number; fileName: string; filePath: string }>> {
    const uploadPromises = files.map((file) => uploadImageFile(file, endpoint));
    return Promise.all(uploadPromises);
}

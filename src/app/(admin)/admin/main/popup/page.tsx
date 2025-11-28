import { Suspense } from "react";
import { MainPopupManager } from "@/widgets/admin/main/MainPopupManager";
import { getPopups } from "./lib/getPopups";
import type { Popup } from "@/shared/api/types";

// 날짜 포맷팅: ISO 8601 -> "YYYY. MM. DD"
const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
};

export default async function PopupManagementPage() {
    // 서버에서 초기 데이터 가져오기
    let initialPopups: Popup[] = [];
    try {
        initialPopups = await getPopups();
    } catch (error) {
        console.error("팝업 목록 가져오기 실패:", error);
    }

    // Popup 타입을 PopupItem 타입으로 변환
    const initialData = initialPopups.map((popup: Popup) => ({
        id: String(popup.id),
        title: popup.title,
        startDate: formatDate(popup.startDate),
        endDate: formatDate(popup.endDate),
        isExposed: popup.isActive,
    }));

    return (
        <Suspense
            fallback={
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            }
        >
            <MainPopupManager initialPopups={initialData} />
        </Suspense>
    );
}

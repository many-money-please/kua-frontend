"use client";

type ConfirmModalProps = {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmButtonClass?: string;
};

export const ConfirmModal = ({
    isOpen,
    title,
    message,
    confirmText = "확인",
    cancelText = "취소",
    onConfirm,
    onCancel,
    confirmButtonClass = "bg-red-500 hover:bg-red-600 text-white",
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                <p className="text-kua-gray800 mb-6 whitespace-pre-line">
                    {message}
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="bg-kua-gray300 hover:bg-kua-gray400 cursor-pointer rounded-md px-4 py-2 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`cursor-pointer rounded-md px-4 py-2 transition-colors ${confirmButtonClass}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

"use client";

import dynamic from "next/dynamic";
import type { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

type PostEditorProps = {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    onImageUpload?: (file: File) => Promise<string>;
    editorProps?: SunEditorReactProps;
};

export const PostEditor = ({
    value,
    onChange,
    placeholder = "내용을 입력하세요.",
    onImageUpload,
    editorProps,
}: PostEditorProps) => {
    const handleImageUploadBefore = (
        files: File[],
        _info: unknown,
        uploadHandler?: (response: {
            result: { url: string; name: string }[];
        }) => void,
    ) => {
        if (!onImageUpload || !uploadHandler) {
            return;
        }

        Promise.all(files.map((file) => onImageUpload(file)))
            .then((urls) => {
                uploadHandler({
                    result: urls.map((url, index) => ({
                        url,
                        name: files[index]?.name ?? `image-${index}`,
                    })),
                });
            })
            .catch((error) => {
                console.error("이미지 업로드 실패:", error);
            });

        return undefined;
    };

    return (
        <SunEditor
            setContents={value}
            onChange={onChange}
            placeholder={placeholder}
            onImageUploadBefore={(files, info, uploadHandler) =>
                handleImageUploadBefore(files, info, uploadHandler)
            }
            setOptions={{
                minHeight: "500px",
                buttonList: [
                    ["undo", "redo"],
                    ["fontSize", "formatBlock"],
                    [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                    ],
                    ["fontColor", "hiliteColor", "textStyle"],
                    ["removeFormat"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["table", "link", "image"],
                    ["preview"],
                ],
                defaultStyle: "font-size: 16px; line-height: 1.6;",
            }}
            {...editorProps}
        />
    );
};

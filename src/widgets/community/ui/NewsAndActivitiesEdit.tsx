"use client";

import { useState, useEffect } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

type NewsAndActivitiesEditProps = {
    id: string;
};

export const NewsAndActivitiesEdit = ({ id }: NewsAndActivitiesEditProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [initialValues, setInitialValues] = useState<Partial<PostFormValues>>(
        {},
    );

    useEffect(() => {
        // 실제로는 API를 통해 기존 데이터를 불러와야 합니다
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // TODO: API 호출
                // const response = await fetch(`/api/news-and-activities/${id}`);
                // const data = await response.json();

                // 임시 목업 데이터
                const mockData = {
                    title: "제28회 청양기 전국핀수영대회 참여지원 2025년 제1차 연수수당 강습회 신청안",
                    content: "<p>TestTextTextText</p>",
                    // attachments와 images는 실제 API에서 받아올 때 적절히 변환해야 합니다
                };

                setInitialValues(mockData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                alert("데이터를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
    }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("update", {
                id,
                title,
                content,
                attachments,
                images,
            });
            alert("임시로 콘솔에 데이터가 출력되었습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <p className="text-kua-gray500">데이터를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <PostForm.Root
            onSubmit={handleSubmit}
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            submitLabel="수정하기"
        >
            <PostForm.TitleField placeholder="제목을 입력하세요 (50자 이내)" />
            <PostForm.ContentField />
            <PostForm.ImageField />
            <PostForm.AttachmentField />
            <PostForm.Actions />
        </PostForm.Root>
    );
};

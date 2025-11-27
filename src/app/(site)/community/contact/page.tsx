import { Suspense } from "react";
import { ContactSection } from "@/widgets/community";
import type { ContactPost } from "@/widgets/community";

const CONTACT_POSTS: ContactPost[] = [
    {
        id: 1,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
    {
        id: 2,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
        loginId: "user2",
    },
    {
        id: 3,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
    },
    {
        id: 4,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
    {
        id: 5,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
        loginId: "user2",
    },
    {
        id: 6,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
        loginId: "user3",
    },

    {
        id: 8,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
    {
        id: 9,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
    },
    {
        id: 10,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
    },
    {
        id: 11,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
    {
        id: 12,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
    },
    {
        id: 13,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
    },
    {
        id: 14,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
    {
        id: 15,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
    },
    {
        id: 16,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
    },
    {
        id: 17,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
    {
        id: 18,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
    },
    {
        id: 19,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
    },
    {
        id: 20,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
    },
];

export default function ContactPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <ContactSection
                title="문의"
                data={CONTACT_POSTS}
                detailBasePath="/community/contact"
                searchOptions={["제목", "내용", "제목+내용"]}
            />
        </Suspense>
    );
}

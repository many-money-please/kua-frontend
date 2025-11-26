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
    },
    {
        id: 2,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: false,
    },
    {
        id: 3,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 4,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
    },
    {
        id: 5,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
    },
    {
        id: 6,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: false,
    },

    {
        id: 8,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
    },
    {
        id: 9,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 10,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 11,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
    },
    {
        id: 12,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 13,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 14,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 15,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 16,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 17,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 18,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 19,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
    {
        id: 20,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: false,
    },
];

export default function ContactPage() {
    return (
        <ContactSection
            title="문의"
            data={CONTACT_POSTS}
            detailBasePath="/community/contact"
            searchOptions={["제목", "내용", "제목+내용"]}
        />
    );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";
import { useUser, useUserRole } from "@/shared/lib/UserRoleContext";
import type { ContactPost } from "@/widgets/community";

// 더미 데이터 - 실제로는 API에서 가져와야 함
const DUMMY_CONTACT_POSTS: (ContactPost & { content: string })[] = [
    {
        id: 1,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 2,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
        loginId: "user2",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 3,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 4,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 5,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
        loginId: "user2",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 6,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 대기",
        isSecret: true,
        loginId: "user3",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 8,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 9,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 10,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 11,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 12,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 13,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 14,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 15,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 16,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 17,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 18,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user2",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 19,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user3",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
    {
        id: 20,
        title: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        author: "김**",
        createdAt: "2025-12-20",
        status: "답변 완료",
        isSecret: true,
        loginId: "user1",
        content: `
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
            <p>궁금하거나 도움이 필요한 경우 문의글을 남겨주세요.</p>
        `,
    },
];

const getDummyData = (
    id: string,
): (DetailPageData & { loginId?: string }) | null => {
    const post = DUMMY_CONTACT_POSTS.find((p) => p.id === Number(id));
    if (!post) return null;

    return {
        id: post.id,
        title: post.title,
        registrationDate: post.createdAt,
        views: 3948,
        isSecret: true,
        loginId: post.loginId,
        content: post.content,
        attachments: [],
    };
};

const getDummyNavigation = (
    id: string,
): {
    prev: NavigationPost | null;
    next: NavigationPost | null;
} => {
    const currentId = Number(id);
    return {
        prev:
            currentId > 1
                ? {
                      id: currentId - 1,
                      title: "2026년 제1차 핀수영 국가대표 선발전 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
        next:
            currentId < 20
                ? {
                      id: currentId + 1,
                      title: "제26회 문화체육관광부장관기 전국핀수영선수권대회 수중스포츠대회 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
    };
};

export default function ContactDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { user, loading: userLoading } = useUser();
    const { isAdmin } = useUserRole();

    const data = getDummyData(id);

    // 데이터가 없으면 리다이렉트
    useEffect(() => {
        if (!userLoading && !data) {
            router.push("/community/contact");
        }
    }, [data, userLoading, router]);

    // 접근 권한 계산 (useMemo 사용)
    const hasAccess = useMemo(() => {
        // 로딩 중이거나 데이터가 없으면 null
        if (userLoading || !data) {
            return null;
        }

        // 관리자는 모든 글에 접근 가능
        if (isAdmin) {
            return true;
        }

        // 일반 사용자는 본인 글만 접근 가능
        if (!user) {
            return false;
        }

        return data.loginId === user.loginId;
    }, [data, user, isAdmin, userLoading]);

    // 로딩 중이거나 접근 권한 확인 중
    if (userLoading || hasAccess === null || !data) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    // 접근 권한이 없는 경우
    if (!hasAccess) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 px-5 py-16">
                <div className="text-center text-xl font-bold">
                    접근 권한이 없습니다.
                </div>
                <div className="text-center text-base text-gray-600">
                    본인이 작성한 문의글만 확인할 수 있습니다.
                </div>
                <button
                    onClick={() => router.push("/community/contact")}
                    className="border-kua-main hover:bg-kua-main mt-4 cursor-pointer rounded-sm border px-6 py-2 text-center transition-colors hover:text-white"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="문의하기"
            data={data}
            navigation={navigation}
            listUrl="/community/contact"
            detailUrlPattern={(id) => `/community/contact/${id}`}
            isContactInquiry={true}
            isSecret={data.isSecret}
        />
    );
}

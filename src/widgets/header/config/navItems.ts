export type NavItem = {
    label: string;
    href?: string;
    description?: string;
    subMenus?: {
        label: string;
        href?: string;
        showChevron?: boolean;
        children?: { label: string; href?: string }[];
    }[];
};

export const navItems: NavItem[] = [
    {
        label: "협회소개",
        href: "/about",
        description: `대한수중핀수영협회의 설립 배경, 조직 구조 등
협회의 전반적인 체계와 정체성을 소개합니다.`,
        subMenus: [
            {
                label: "협회소개",
                href: "/about",
                showChevron: true,
                children: [
                    { label: "협회장 인사말", href: "/about#president" },
                    { label: "협회 연혁", href: "/about#history" },
                    { label: "C.I 소개", href: "/about#ci" },
                    { label: "찾아오시는길", href: "/about#find-us" },
                ],
            },
            {
                label: "협회구조",
                href: "/about/organization",
                showChevron: true,
                children: [
                    {
                        label: "협회 조직도",
                        href: "/about/organization#organization",
                    },
                    {
                        label: "각종 위원회",
                        href: "/about/organization#committees",
                    },
                    {
                        label: "시/도 지부 소개",
                        href: "/about/organization#branches",
                    },
                ],
            },
            { label: "임원현황", href: "/about/executives", showChevron: true },
            { label: "규정", href: "/about/regulations", showChevron: true },
            { label: "경영공시", href: "/about/disclosure", showChevron: true },
        ],
    },
    {
        label: "종목 소개",
        href: "/fin-swimming",
        description:
            "협회에서 운영하는 수중·안전 분야의 주요 종목들의 특징, 목적, 기본 기술과 교육 체계를 체계적으로 안내합니다.",
        subMenus: [
            {
                label: "핀수영",
                href: "/fin-swimming/history",
                showChevron: true,
                children: [
                    {
                        label: "유래",
                        href: "/fin-swimming/history",
                    },
                    {
                        label: "기술 및 훈련",
                        href: "/fin-swimming/skills-and-training",
                    },
                    {
                        label: "민간자격등록",
                        href: "/fin-swimming/private-qualification",
                    },
                ],
            },
            {
                label: "프리다이빙",
                href: "/free-diving/history",
                showChevron: true,
                children: [
                    {
                        label: "유래",
                        href: "/free-diving/history",
                    },
                    {
                        label: "기술 및 훈련",
                        href: "/free-diving/skills-and-training",
                    },
                    {
                        label: "민간자격등록",
                        href: "/free-diving/private-qualification",
                    },
                ],
            },
        ],
    },
    {
        label: "대회정보",
        href: "/competition-info",
        description: `대회 일정, 선수/국가대표 정보, 증명서 발급 등
대회 운영 및 참여 관련 정보를 제공합니다.`,
        subMenus: [
            {
                label: "대회정보",
                href: "/competition-info",
                showChevron: false,
                children: [
                    { label: "대회일정", href: "/competition-info/schedule" },
                    { label: "대회결과", href: "/competition-info/results" },
                    {
                        label: "e-상장",
                        href: "http://scubakorea.or.kr/game/mypage.php",
                    },
                ],
            },
            {
                label: "선수정보",
                href: "/competition-info/player-info",
                showChevron: false,
                children: [
                    {
                        label: "국가대표",
                        href: "/competition-info/player-info/national",
                    },
                    {
                        label: "청소년대표",
                        href: "/competition-info/player-info/youth",
                    },
                    {
                        label: "상비군선수",
                        href: "/competition-info/player-info/reserve",
                    },
                ],
            },
            {
                label: "신기록 현황",
                href: "/competition-info/new-records",
                showChevron: true,
            },
            {
                label: "신청/발급",
                href: "/competition-info/registration",
                showChevron: false,
                children: [
                    {
                        label: "대회 참가 신청",
                        href: "/competition-info/registration/competition-application",
                    },
                    {
                        label: "경기인 등록",
                        href: "/competition-info/registration/athlete-registration",
                    },
                    {
                        label: "증명서 발급",
                        href: "/competition-info/registration/certificate-issuance",
                    },
                ],
            },
        ],
    },
    {
        label: "커뮤니티",
        href: "/community",
        description:
            "협회 소식, 공지사항 등 유익한 자료를 전달하고 다양한 정보를 공유하는 열린 공간입니다.",
        subMenus: [
            {
                label: "커뮤니티",
                href: "/community",
                showChevron: false,
                children: [
                    { label: "공지사항", href: "/community/notices" },
                    { label: "자료실", href: "/community/resources" },
                    { label: "문의하기", href: "/community/contact" },
                ],
            },
            {
                label: "협회소식",
                href: "/community/news-and-activities",
                showChevron: false,
                children: [
                    {
                        label: "소식 및 활동",
                        href: "/community/news-and-activities",
                    },
                    {
                        label: "포토갤러리",
                        href: "/community/photo-gallery",
                    },
                    {
                        label: "보도자료",
                        href: "/community/press-release",
                    },
                    {
                        label: "핀수영 TV",
                        href: "/community/fin-swimming-tv",
                    },
                ],
            },
            {
                label: "스포츠윤리센터 신고/상담",
                href: "https://www.k-sec.or.kr/front/main/main.do",
            },
        ],
    },
    {
        label: "교육사업",
        href: "/education-business",
        description:
            "KUA·CMAS 교육 철학과 과정을 소개하고 체계적인 국제 인증 교육장을 안내합니다.",
        subMenus: [
            {
                label: "KUA & CMAS",
                href: "/education-business/kua-cmas",
                showChevron: true,
                children: [
                    {
                        label: "교육 철학 및 국제 인증 안내",
                    },
                    {
                        label: "교육장 안내",
                    },
                    {
                        label: "교육 참여 안내",
                    },
                ],
            },
        ],
    },
    {
        label: "로그인",
        href: "/auth/login",
    },
];

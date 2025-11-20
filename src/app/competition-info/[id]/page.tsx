"use client";

import { useParams } from "next/navigation";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

const getDummyData = (id: string): DetailPageData => ({
    id: Number(id),
    title: "제17회 전국해양스포츠제전 겸 제14회 대한체육회장배 전국생활체육 장거리핀수영대회",
    registrationDate: "2025-11-12",
    views: 3948,
    content: `
        <p>핀수영 관계자 및 선수 여러분께 안내드립니다.</p>
        <p>아래와 같이 대회를 개최하오니 많은 참가 바랍니다.</p>
        <br />
        <p>※ 선수등록이 완료된 선수만 참가 가능합니다.</p>
        <p>※ 선수등록비는 별도입니다.</p>
        <br />
        <div>
            <div><strong>대회명</strong></div>
            <div>제17회 전국해양스포츠제전 겸 제14회 대한체육회장배 전국생활체육 장거리핀수영대회</div>
        </div>
        <div>
            <div><strong>주최</strong></div>
            <div>해양수산부</div>
        </div>
        <div>
            <div><strong>주관</strong></div>
            <div>대한수중핀수영협회, 경기도, 시흥시</div>
        </div>
        <div>
            <div><strong>대회기간</strong></div>
            <div>2025. 8. 30.(토) - 31.(일) 2일간</div>
        </div>
        <div>
            <div><strong>장소</strong></div>
            <div>경기도 시흥시 거북섬 앞 수면(시화호)</div>
        </div>
        <div>
            <div><strong>제출서류</strong></div>
            <div>참가신청서 (시도대표는 별도 제출)</div>
        </div>
        <div>
            <div><strong>참가비용</strong></div>
            <div>
                초등부: 15,000원<br />
                중등부: 20,000원<br />
                고등·대학부: 25,000원<br />
                일반부(동호인 포함): 35,000원
            </div>
        </div>
        <div>
            <div><strong>제공사항</strong></div>
            <div>기념품, 수모, 배상책임보험가입, 기록관리, 기타 대회 진행에 필요한 사항</div>
        </div>
        <div>
            <div><strong>참가신청</strong></div>
            <div><a href="https://app.sports.or.kr/app/uw/" target="_blank">https://app.sports.or.kr/app/uw/</a></div>
        </div>
        <div>
            <div><strong>신청기간</strong></div>
            <div>2025. 7. 1.(화) 14:00 ~ 17.(목) 16:00</div>
        </div>
        <div>
            <div><strong>계좌번호</strong></div>
            <div>KEB하나은행 252-910039-31704 대한수중핀수영협회</div>
        </div>
        <div>
            <div><strong>기타사항</strong></div>
            <div>본 대회는 다른 대회와 동시 개최되며, 시상은 별도로 진행됩니다. 신청기간 종료 후 신청 인원이 부족할 경우 추가 모집이 가능합니다. 신분 확인을 위해 신분증 지참이 필요합니다 (휴대폰 사진 가능).</div>
        </div>
        <div>
            <div><strong>문의처</strong></div>
            <div>대한수중핀수영협회 사무처 02-420-4293</div>
        </div>
    `,
    attachments: [
        { name: "대회 안내문.pdf", url: "#" },
        { name: "대회 계획서.pdf", url: "#" },
        { name: "참가신청서.hwp", url: "#" },
        { name: "참가신청서.pdf", url: "#" },
        { name: "학교폭력 전력 부존재 확인서.hwp", url: "#" },
    ],
});

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
            currentId < 32
                ? {
                      id: currentId + 1,
                      title: "제26회 문화체육관광부장관기 전국생활체육 수중스포츠대회 개최 안내",
                      date: "2025-11-12",
                  }
                : null,
    };
};

export default function CompetitionInfoDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const data = getDummyData(id);
    const navigation = getDummyNavigation(id);

    return (
        <DetailPage
            pageTitle="대회 일정 안내"
            data={data}
            navigation={navigation}
            listUrl="/competition-info"
            detailUrlPattern={(id) => `/competition-info/${id}`}
        />
    );
}

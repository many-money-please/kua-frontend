import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /community를 /community/notices로 리다이렉트
    if (pathname === "/community") {
        return NextResponse.redirect(
            new URL("/community/notices", request.url),
        );
    }

    // /competition-info를 /competition-info/schedule로 리다이렉트
    if (pathname === "/competition-info") {
        return NextResponse.redirect(
            new URL("/competition-info/schedule", request.url),
        );
    }

    // /competition-info/player-info를 /competition-info/player-info/national로 리다이렉트
    if (pathname === "/competition-info/player-info") {
        return NextResponse.redirect(
            new URL("/competition-info/player-info/national", request.url),
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/community", "/competition-info", "/competition-info/player-info"],
};

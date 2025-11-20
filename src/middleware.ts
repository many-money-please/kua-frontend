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

    return NextResponse.next();
}

export const config = {
    matcher: ["/community", "/competition-info"],
};

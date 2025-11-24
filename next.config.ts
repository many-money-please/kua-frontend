import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone", // Docker 배포를 위한 standalone 모드
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "/vi/**",
            },
        ],
    },
};

export default nextConfig;

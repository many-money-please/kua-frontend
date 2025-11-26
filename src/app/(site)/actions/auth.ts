"use server";

/**
 * 회원가입 Server Action
 *
 * 참고: 로그인은 Route Handler를 사용합니다 (/api/auth/login)
 * 이유: 브라우저가 Set-Cookie를 받을 수 있도록 하기 위함
 */

import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type { RegisterRequest, RegisterResponse } from "@/shared/api/types";

/**
 * 회원가입
 *
 * 회원가입은 쿠키가 필요 없으므로 Server Action으로 직접 처리합니다.
 */
export async function register(formData: FormData) {
    // 1. FormData에서 값 추출
    const loginId = formData.get("loginId") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const birthDate = formData.get("birthDate") as string;
    const email = formData.get("email") as string;

    // 2. 필수 필드 검증
    if (
        !loginId ||
        !name ||
        !password ||
        !phoneNumber ||
        !birthDate ||
        !email
    ) {
        return {
            success: false,
            error: "모든 필드를 입력해주세요.",
        };
    }

    // 3. 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: "올바른 이메일 형식을 입력해주세요.",
        };
    }

    // 4. 생년월일 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthDate)) {
        return {
            success: false,
            error: "생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)",
        };
    }

    // 5. 백엔드로 회원가입 요청
    try {
        const data = await apiClient<RegisterResponse>(
            API_ENDPOINTS.auth.register,
            {
                method: "POST",
                body: JSON.stringify({
                    loginId,
                    name,
                    password,
                    phoneNumber,
                    birthDate,
                    email,
                } as RegisterRequest),
            },
        );

        return {
            success: true,
            data: data.data,
            message: data.message,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "회원가입에 실패했습니다.",
        };
    }
}

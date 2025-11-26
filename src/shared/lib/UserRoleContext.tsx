"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import type { UserProfile, MeResponse } from "@/shared/api/types";

type UserRole = "user" | "admin";

type UserContextType = {
    // 사용자 정보
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    // 역할 정보 (하위 호환성을 위해 유지)
    role: UserRole;
    isAdmin: boolean;
    // 메서드
    setUser: (user: UserProfile | null) => void;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
    setRole: (role: UserRole) => void;
    toggleRole: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// localStorage에서 역할을 안전하게 읽는 함수
const getInitialRole = (): UserRole => {
    if (typeof window === "undefined") {
        return "user";
    }
    const savedRole = localStorage.getItem("userRole") as UserRole | null;
    if (savedRole === "admin" || savedRole === "user") {
        return savedRole;
    }
    return "user";
};

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRoleState] = useState<UserRole>(getInitialRole);

    // 사용자 정보 가져오기
    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // 인증되지 않은 경우
                    setUserState(null);
                    setRoleState("user");
                    setLoading(false);
                    return;
                }
                throw new Error("사용자 정보를 가져오는데 실패했습니다.");
            }

            const data: MeResponse = await response.json();
            if (data.success && data.data) {
                const userData = data.data;
                setUserState(userData);
                // 사용자 역할에 따라 role 업데이트
                const userRole =
                    userData.role === "ADMIN"
                        ? "admin"
                        : userData.role === "USER"
                          ? "user"
                          : "user";
                setRoleState(userRole);
            } else {
                setUserState(null);
                setRoleState("user");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "알 수 없는 오류가 발생했습니다.",
            );
            setUserState(null);
            setRoleState("user");
        } finally {
            setLoading(false);
        }
    };

    // 초기 로드 시 사용자 정보 가져오기
    useEffect(() => {
        fetchUser();
    }, []);

    // 페이지 포커스 시 사용자 정보 갱신 (선택적 - 필요시 활성화)
    // useEffect(() => {
    //     const handleFocus = () => {
    //         // 페이지가 포커스를 받을 때 사용자 정보 갱신
    //         fetchUser();
    //     };
    //     window.addEventListener("focus", handleFocus);
    //     return () => window.removeEventListener("focus", handleFocus);
    // }, []);

    // localStorage 동기화 (role이 변경될 때만 저장)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("userRole", role);
        }
    }, [role]);

    const setUser = (newUser: UserProfile | null) => {
        setUserState(newUser);
        if (newUser) {
            const userRole =
                newUser.role === "ADMIN"
                    ? "admin"
                    : newUser.role === "USER"
                      ? "user"
                      : "user";
            setRoleState(userRole);
        } else {
            setRoleState("user");
        }
    };

    const refreshUser = async () => {
        await fetchUser();
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("로그아웃에 실패했습니다.");
            }

            // 사용자 정보 초기화
            setUserState(null);
            setRoleState("user");
        } catch (err) {
            // 에러가 발생해도 사용자 정보는 초기화
            setUserState(null);
            setRoleState("user");
            throw err;
        }
    };

    const setRole = (newRole: UserRole) => {
        setRoleState(newRole);
    };

    const toggleRole = () => {
        const newRole = role === "admin" ? "user" : "admin";
        setRole(newRole);
    };

    const isAdmin = role === "admin";

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                role,
                isAdmin,
                setUser,
                refreshUser,
                logout,
                setRole,
                toggleRole,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// 하위 호환성을 위한 useUserRole hook
export const useUserRole = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserRole must be used within a UserRoleProvider");
    }
    return {
        role: context.role,
        isAdmin: context.isAdmin,
        setRole: context.setRole,
        toggleRole: context.toggleRole,
    };
};

// 사용자 정보를 가져오는 hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserRoleProvider");
    }
    return {
        user: context.user,
        loading: context.loading,
        error: context.error,
        refreshUser: context.refreshUser,
        setUser: context.setUser,
        logout: context.logout,
    };
};

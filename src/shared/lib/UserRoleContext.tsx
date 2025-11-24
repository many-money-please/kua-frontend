"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

type UserRole = "user" | "admin";

type UserRoleContextType = {
    role: UserRole;
    isAdmin: boolean;
    setRole: (role: UserRole) => void;
    toggleRole: () => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(
    undefined,
);

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
    // lazy initialization을 사용하여 초기 상태 설정
    const [role, setRoleState] = useState<UserRole>(getInitialRole);

    // localStorage 동기화 (role이 변경될 때만 저장)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("userRole", role);
        }
    }, [role]);

    const setRole = (newRole: UserRole) => {
        setRoleState(newRole);
    };

    const toggleRole = () => {
        const newRole = role === "admin" ? "user" : "admin";
        setRole(newRole);
    };

    const isAdmin = role === "admin";

    return (
        <UserRoleContext.Provider
            value={{ role, isAdmin, setRole, toggleRole }}
        >
            {children}
        </UserRoleContext.Provider>
    );
};

export const useUserRole = () => {
    const context = useContext(UserRoleContext);
    if (context === undefined) {
        throw new Error("useUserRole must be used within a UserRoleProvider");
    }
    return context;
};

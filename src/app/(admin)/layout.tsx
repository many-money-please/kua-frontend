import type { ReactNode } from "react";
import { AdminHeader } from "@/widgets/admin/ui/AdminHeader";
import { AdminSidebar } from "@/widgets/admin/ui/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-kua-gray50">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}

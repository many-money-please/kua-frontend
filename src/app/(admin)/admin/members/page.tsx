"use client";

import { redirect } from "next/navigation";

export default function MembersManagementPage() {
    redirect("/admin/members/list");
}


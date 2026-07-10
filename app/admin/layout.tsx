import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/supabase/serverAuth";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Fresh Fields Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminSession();

  return <AdminShell email={user?.email ?? null}>{children}</AdminShell>;
}

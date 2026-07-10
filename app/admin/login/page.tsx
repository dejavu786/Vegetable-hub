import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="flex w-full max-w-sm flex-col items-center">
        <h1 className="font-display text-2xl text-forest-900">Fresh Fields Admin</h1>
        <p className="mt-1 text-sm text-forest-600">Sign in to manage the catalog.</p>
        <div className="mt-8 w-full">
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}

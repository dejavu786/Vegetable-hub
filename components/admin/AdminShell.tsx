"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add Product" },
];

export function AdminShell({
  email,
  children,
}: {
  email: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-forest-50/40 font-body">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-forest-100 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-lg text-forest-900">
            Fresh Fields Admin
          </Link>
          <nav className="hidden items-center gap-4 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-forest-900"
                    : "text-forest-500 hover:text-forest-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {email && <span className="hidden text-sm text-forest-500 sm:inline">{email}</span>}
          <LogoutButton />
        </div>
      </header>

      <nav className="flex gap-4 overflow-x-auto border-b border-forest-100 bg-white px-4 py-2 sm:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap text-sm font-medium ${
              pathname === link.href ? "text-forest-900" : "text-forest-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

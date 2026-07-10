import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/admin/products";
import { isSupabaseConfigured } from "@/lib/supabase/serverAuth";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <p className="mx-auto max-w-md text-center text-forest-600">
        Supabase isn&apos;t connected yet. Add your project keys to{" "}
        <code className="rounded bg-forest-100 px-1.5 py-0.5">.env.local</code>.
      </p>
    );
  }

  const products = await getAllProducts();
  const stats = [
    { label: "Total products", value: products.length },
    { label: "Available", value: products.filter((p) => p.is_available).length },
    { label: "Local", value: products.filter((p) => !p.is_imported).length },
    { label: "Imported", value: products.filter((p) => p.is_imported).length },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-forest-900">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-forest-100 bg-white p-4">
            <p className="text-2xl font-semibold text-forest-900">{stat.value}</p>
            <p className="mt-1 text-sm text-forest-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-forest-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
        >
          Add a product
        </Link>
        <Link
          href="/admin/products"
          className="rounded-lg border border-forest-200 px-4 py-2.5 text-sm font-semibold text-forest-800 hover:border-forest-500"
        >
          Manage all products
        </Link>
      </div>
    </div>
  );
}

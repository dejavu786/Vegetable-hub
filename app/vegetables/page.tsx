import type { Metadata } from "next";
import { VegetablesGrid } from "@/components/vegetables/VegetablesGrid";
import { getVegetables } from "@/lib/vegetables";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Our Vegetables",
  description:
    "Browse the full Fresh Fields catalog of farm-fresh vegetables, delivered same-day across DHA, Karachi.",
};

export const revalidate = 60;

export default async function VegetablesPage() {
  const vegetables = await getVegetables();

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">
          The full range
        </p>
        <h1 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">
          Our Vegetables
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-forest-700">
          Hand-picked every morning and delivered the same day. Prices are per unit as noted
          on each item.
        </p>
      </div>

      <div className="mt-10">
        {!isSupabaseConfigured ? (
          <p className="mx-auto max-w-md text-center text-forest-600">
            The catalog isn&apos;t connected yet. Add your Supabase project keys to{" "}
            <code className="rounded bg-forest-100 px-1.5 py-0.5">.env.local</code> to see
            live vegetables here.
          </p>
        ) : vegetables.length === 0 ? (
          <p className="mx-auto max-w-md text-center text-forest-600">
            No vegetables are listed yet — add some rows to the{" "}
            <code className="rounded bg-forest-100 px-1.5 py-0.5">vegetables</code> table in
            Supabase Studio.
          </p>
        ) : (
          <VegetablesGrid vegetables={vegetables} />
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { VegetableCard } from "@/components/VegetableCard";
import { getFeaturedVegetables } from "@/lib/vegetables";

export async function WeeklyPicks() {
  const vegetables = await getFeaturedVegetables(4);

  if (vegetables.length === 0) {
    return null;
  }

  return (
    <section className="bg-forest-50 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading eyebrow="Fresh this week" title="This week's fresh picks" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {vegetables.map((vegetable) => (
            <VegetableCard key={vegetable.id} vegetable={vegetable} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/vegetables"
            className="inline-block rounded-full border border-forest-800 px-7 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-900 hover:text-white"
          >
            View all vegetables
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { StoryIllustration } from "@/components/icons/Illustrations";
import { SproutIcon, TruckIcon, HeartLeafIcon } from "@/components/icons/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Fresh Fields is a family-run vegetable delivery service in DHA, Karachi, picking farm-fresh produce every morning.",
};

const values = [
  {
    icon: SproutIcon,
    title: "Farm fresh, always",
    description: "We pick vegetables early each morning, straight from trusted local farms.",
  },
  {
    icon: TruckIcon,
    title: "Same-day delivery",
    description: "Order today and it reaches your door the same day — no cold storage weeks.",
  },
  {
    icon: HeartLeafIcon,
    title: "Healthy living community",
    description: "Our vision is to grow Fresh Fields into a community built around healthy living.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="container-page grid items-center gap-10 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">
            Our story
          </p>
          <h1 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">
            Serious lovers of good food
          </h1>
          <p className="mt-4 text-forest-700">
            Fresh Fields started with a simple idea: vegetables taste better when they haven&apos;t
            spent a week in a warehouse. We pick farm-fresh vegetables early each morning and
            deliver them the same day to homes across DHA, Karachi.
          </p>
          <p className="mt-4 text-forest-700">
            When we say we love vegetables, we really mean it. Every crate is checked by hand
            before it leaves us, because good food is worth doing properly. Our vision is to
            grow into a healthy-living community, one delivery at a time.
          </p>
          <Link
            href="/vegetables"
            className="mt-6 inline-block rounded-full bg-forest-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
          >
            See our vegetables
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <StoryIllustration className="h-64 w-full sm:h-96" />
        </div>
      </div>

      <div className="container-page mt-16 grid gap-10 sm:mt-24 sm:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className="h-10 w-10 text-leaf-600" />
            <h2 className="mt-4 font-display text-xl text-forest-900">{title}</h2>
            <p className="mt-2 text-sm text-forest-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

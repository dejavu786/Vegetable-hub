import Link from "next/link";
import { HeroIllustration } from "@/components/icons/Illustrations";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[80vh]">
      <HeroIllustration className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 mx-4 max-w-lg rounded-2xl bg-cream/95 px-6 py-8 text-center shadow-xl sm:mx-0 sm:px-10 sm:py-10">
        <h1 className="font-display text-2xl leading-tight text-forest-900 sm:text-3xl">
          Farm-fresh vegetables, delivered the same day
        </h1>
        <p className="mt-3 text-sm text-forest-700 sm:text-base">
          Hand-picked every morning in DHA, Karachi — because good food starts with good
          ingredients.
        </p>
        <Link
          href="/vegetables"
          className="mt-6 inline-block rounded-full bg-forest-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
        >
          See our vegetables
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { StoryIllustration } from "@/components/icons/Illustrations";

export function AboutTeaser() {
  return (
    <section className="bg-forest-50 py-16 sm:py-20">
      <div className="container-page grid items-center gap-10 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <StoryIllustration className="h-64 w-full sm:h-80" />
        </div>
        <div>
          <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
            Healthy living, one delivery at a time
          </h2>
          <p className="mt-4 text-forest-700">
            When we say we love vegetables, we really mean it. Every crate is checked by hand
            before it leaves us — because good food is worth doing properly. Our vision is to
            grow Fresh Fields into a healthy-living community, one doorstep at a time.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-forest-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
          >
            About us
          </Link>
        </div>
      </div>
    </section>
  );
}

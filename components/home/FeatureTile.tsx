import Link from "next/link";
import { BannerIllustration } from "@/components/icons/Illustrations";

export function FeatureTile() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <Link
        href="/vegetables"
        className="group relative block h-64 overflow-hidden rounded-2xl sm:h-80"
      >
        <BannerIllustration className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent p-6 sm:p-8">
          <span className="font-display text-2xl text-white sm:text-3xl">
            Our Vegetables <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </section>
  );
}

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[80vh]">
      <div className="absolute inset-0 hidden overflow-hidden md:block">
        <video
          className="h-full w-full scale-105 object-cover object-center"
          src="/veg-mp4.mp4"
          autoPlay
          muted
          playsInline
          loop
          poster="/veg-poster.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-forest-950/10 to-forest-950/50" />
      </div>
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <img
          src="/veg-poster.png"
          alt=""
          className="h-full w-full scale-105 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-forest-950/10 to-forest-950/50" />
      </div>
      <div className="absolute inset-0 bg-forest-950/40" />
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

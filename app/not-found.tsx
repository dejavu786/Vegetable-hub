import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-3xl text-forest-900">Page not found</h1>
      <p className="mt-3 text-forest-600">
        That page picked itself off the shelf. Let&apos;s get you back to fresh ground.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-forest-900 px-7 py-3 text-sm font-semibold text-white hover:bg-forest-800"
      >
        Back to home
      </Link>
    </div>
  );
}

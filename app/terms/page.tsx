import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-2xl py-14 sm:py-20">
      <h1 className="font-display text-3xl text-forest-900 sm:text-4xl">Terms of Service</h1>
      <div className="mt-6 space-y-4 text-forest-700">
        <p>
          This website is operated by Fresh Fields, 62 Khayaban-e-Shaheen, DHA Phase 5,
          Defence V, Karachi, Pakistan. By browsing this site you agree to the terms below.
        </p>
        <p>
          Prices and availability shown for our vegetables are updated regularly but may
          change without notice as seasonal supply shifts. Listing a vegetable here does not
          guarantee availability at the time of your order.
        </p>
        <p>
          Delivery days, areas, and cut-off times are communicated directly to customers and
          may vary. We aim for same-day delivery within our serviceable DHA, Karachi area.
        </p>
        <p>
          If you subscribe to our mailing list, we&apos;ll only use your email to send updates
          about Fresh Fields — see our handling of that data as described at signup.
        </p>
        <p className="text-sm text-forest-500">
          This is a starting-point policy — have it reviewed to match how Fresh Fields
          actually operates before publishing.
        </p>
      </div>
    </div>
  );
}

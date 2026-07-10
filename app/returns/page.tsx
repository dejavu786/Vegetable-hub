import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
};

export default function ReturnsPage() {
  return (
    <div className="container-page max-w-2xl py-14 sm:py-20">
      <h1 className="font-display text-3xl text-forest-900 sm:text-4xl">
        Return &amp; Refund Policy
      </h1>
      <div className="mt-6 space-y-4 text-forest-700">
        <p>
          Freshness is our whole point, so we want you to be happy with every delivery. If any
          item arrives damaged, spoiled, or not as described, let us know within 24 hours of
          delivery and we&apos;ll arrange a replacement or refund for that item.
        </p>
        <p>
          Contact us at{" "}
          <a href="mailto:hello@freshfields.pk" className="underline underline-offset-4">
            hello@freshfields.pk
          </a>{" "}
          with your order details and, where possible, a photo of the item — this helps us
          sort things out quickly and improve our sourcing.
        </p>
        <p>
          Because vegetables are perishable, we&apos;re unable to accept returns for change of
          mind once an order has been delivered.
        </p>
        <p className="text-sm text-forest-500">
          This is a starting-point policy — review and adjust it to match how Fresh Fields
          actually operates before publishing.
        </p>
      </div>
    </div>
  );
}

import { SectionHeading } from "@/components/SectionHeading";

const testimonials = [
  {
    quote:
      "Everything arrives so fresh — you can tell it was picked that morning, not sitting in a warehouse.",
    name: "Ayesha K.",
  },
  {
    quote:
      "Same-day delivery has genuinely changed how we cook. No more sad, wilted vegetables from the fridge.",
    name: "Bilal R.",
  },
  {
    quote: "Great quality and fair prices. Fresh Fields is now our go-to for the weekly shop.",
    name: "Sana M.",
  },
];

export function Testimonials() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading eyebrow="Reviews" title="Let customers speak for us" />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {testimonials.map(({ quote, name }) => (
          <figure
            key={name}
            className="rounded-2xl border border-forest-100 bg-white p-6 text-center"
          >
            <div aria-hidden="true" className="text-leaf-500">
              ★★★★★
            </div>
            <blockquote className="mt-3 text-sm text-forest-700">“{quote}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-forest-900">
              {name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

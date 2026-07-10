import { SproutIcon, TruckIcon } from "@/components/icons/Icons";

const features = [
  {
    icon: SproutIcon,
    title: "Locally Grown",
    description: "Sourced directly from farms around Sindh — nothing sits in storage.",
  },
  {
    icon: TruckIcon,
    title: "Same-Day Delivery",
    description: "Order today, and it's on your doorstep across DHA the same day.",
  },
];

export function IconFeatures() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mx-auto grid max-w-2xl gap-10 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className="h-10 w-10 text-leaf-600" />
            <h3 className="mt-4 font-display text-xl text-forest-900">{title}</h3>
            <p className="mt-2 text-sm text-forest-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

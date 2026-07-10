import Image from "next/image";
import { VegPlaceholder } from "@/components/icons/Illustrations";
import type { Vegetable } from "@/lib/types";

export function VegetableCard({ vegetable }: { vegetable: Vegetable }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white transition-shadow hover:shadow-lg hover:shadow-forest-900/5">
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-forest-50">
        <span
          className={`absolute left-2 top-2 z-10 rounded-full px-2.5 py-1 text-xs font-medium ${
            vegetable.is_imported
              ? "bg-carrot-500/90 text-white"
              : "bg-leaf-500/90 text-white"
          }`}
        >
          {vegetable.is_imported ? "Imported" : "Local"}
        </span>
        {vegetable.image_url ? (
          <Image
            src={vegetable.image_url}
            alt={vegetable.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <VegPlaceholder
            category={vegetable.category}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg text-forest-900">{vegetable.name}</h3>
        {vegetable.description && (
          <p className="line-clamp-2 text-sm text-forest-600">{vegetable.description}</p>
        )}
        {(vegetable.quality || vegetable.size) && (
          <p className="text-xs text-forest-500">
            {[vegetable.quality, vegetable.size].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-auto pt-2 text-sm font-semibold text-forest-800">
          Rs. {vegetable.price.toLocaleString("en-PK")}{" "}
          <span className="font-normal text-forest-500">/ {vegetable.unit}</span>
        </p>
      </div>
    </article>
  );
}

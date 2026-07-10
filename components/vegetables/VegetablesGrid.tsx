"use client";

import { useMemo, useState } from "react";
import { VegetableCard } from "@/components/VegetableCard";
import type { Vegetable } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  vegetable: "Vegetables",
  leafy: "Leafy Greens",
  root: "Roots & Onions",
};

export function VegetablesGrid({ vegetables }: { vegetables: Vegetable[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(vegetables.map((v) => v.category)));
    return ["all", ...unique];
  }, [vegetables]);

  const filtered = useMemo(() => {
    return vegetables.filter((v) => {
      const matchesCategory = category === "all" || v.category === category;
      const matchesQuery = v.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [vegetables, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vegetables..."
          aria-label="Search vegetables"
          className="w-full rounded-full border border-forest-200 bg-white px-5 py-2.5 text-sm text-forest-900 outline-none focus:border-forest-600 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? "border-forest-900 bg-forest-900 text-white"
                  : "border-forest-200 text-forest-700 hover:border-forest-500"
              }`}
            >
              {c === "all" ? "All" : categoryLabels[c] ?? c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-forest-600">
          No vegetables match your search right now.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filtered.map((vegetable) => (
            <VegetableCard key={vegetable.id} vegetable={vegetable} />
          ))}
        </div>
      )}
    </div>
  );
}

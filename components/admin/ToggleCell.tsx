"use client";

import { useState, useTransition } from "react";

export function ToggleCell({
  id,
  initialValue,
  action,
}: {
  id: string;
  initialValue: boolean;
  action: (id: string, next: boolean) => Promise<{ error?: string }>;
}) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        const next = !value;
        setValue(next);
        startTransition(async () => {
          const result = await action(id, next);
          if (result.error) {
            setValue(!next);
            alert(result.error);
          }
        });
      }}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        value ? "bg-forest-700" : "bg-forest-200"
      } ${isPending ? "opacity-60" : ""}`}
      aria-pressed={value}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          value ? "translate-x-[18px]" : "translate-x-1"
        }`}
      />
    </button>
  );
}

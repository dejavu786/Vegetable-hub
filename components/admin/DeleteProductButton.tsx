"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteProductButton({
  id,
  name,
  action,
}: {
  id: string;
  name: string;
  action: (id: string) => Promise<{ error?: string }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
        startTransition(async () => {
          const result = await action(id);
          if (result.error) {
            alert(result.error);
            return;
          }
          router.refresh();
        });
      }}
      className="text-sm font-medium text-tomato-600 transition-colors hover:text-tomato-700 disabled:opacity-60"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

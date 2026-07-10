import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Vegetable } from "@/lib/types";

export async function getVegetables(): Promise<Vegetable[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("vegetables")
    .select("*")
    .eq("is_available", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load vegetables:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedVegetables(limit = 4): Promise<Vegetable[]> {
  const vegetables = await getVegetables();
  const featured = vegetables.filter((v) => v.is_featured);
  return (featured.length > 0 ? featured : vegetables).slice(0, limit);
}

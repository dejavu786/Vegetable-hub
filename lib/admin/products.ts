import { getSupabaseAuthClient } from "@/lib/supabase/serverAuth";
import type { Vegetable } from "@/lib/types";

export async function getAllProducts(): Promise<Vegetable[]> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("vegetables")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load products:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getProductById(id: string): Promise<Vegetable | null> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("vegetables")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load product:", error.message);
    return null;
  }

  return data;
}

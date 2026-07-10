"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAuthClient } from "@/lib/supabase/serverAuth";
import type { VegetableInput } from "@/lib/types";

const SLUG_TAKEN_MESSAGE = "That URL slug is already taken — choose another.";

export async function createProduct(
  input: VegetableInput
): Promise<{ error?: string; id?: string }> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return { error: "Supabase isn't configured." };

  const { data, error } = await supabase
    .from("vegetables")
    .insert(input)
    .select("id")
    .single();

  if (error) {
    return { error: error.code === "23505" ? SLUG_TAKEN_MESSAGE : error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/vegetables");
  return { id: data.id };
}

export async function updateProduct(
  id: string,
  input: VegetableInput
): Promise<{ error?: string }> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return { error: "Supabase isn't configured." };

  const { error } = await supabase.from("vegetables").update(input).eq("id", id);

  if (error) {
    return { error: error.code === "23505" ? SLUG_TAKEN_MESSAGE : error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/vegetables");
  return {};
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return { error: "Supabase isn't configured." };

  const { error } = await supabase.from("vegetables").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/vegetables");
  return {};
}

export async function setAvailability(
  id: string,
  isAvailable: boolean
): Promise<{ error?: string }> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return { error: "Supabase isn't configured." };

  const { error } = await supabase
    .from("vegetables")
    .update({ is_available: isAvailable })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/vegetables");
  return {};
}

export async function setFeatured(
  id: string,
  isFeatured: boolean
): Promise<{ error?: string }> {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return { error: "Supabase isn't configured." };

  const { error } = await supabase
    .from("vegetables")
    .update({ is_featured: isFeatured })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/vegetables");
  return {};
}

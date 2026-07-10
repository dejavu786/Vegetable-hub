import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Server-side Supabase client using the public anon key. Reads are safe by
 * RLS policy (public catalog); the only write path (newsletter insert) is
 * likewise scoped by RLS, so no service-role key is needed for this app.
 */
export function getSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(supabaseUrl as string, supabaseAnonKey as string, {
    auth: { persistSession: false },
  });
}

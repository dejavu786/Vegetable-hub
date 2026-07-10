import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Cookie-bound Supabase client for the admin area (Server Components,
 * Route Handlers, Server Actions). Reads/writes go through Postgres RLS as
 * whichever user is logged in via cookies — no service-role key is used
 * anywhere in this app.
 */
export async function getSupabaseAuthClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl as string, supabaseAnonKey as string, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component render (not an Action/Route
          // Handler) — middleware already refreshes the session cookie, so
          // this can be safely ignored.
        }
      },
    },
  });
}

export async function getAdminSession() {
  const supabase = await getSupabaseAuthClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

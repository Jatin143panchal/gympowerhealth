import { createClient } from "@supabase/supabase-js";
import { env } from "../../config/env";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

// Production-ready client with fallbacks
export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Log warning in development, fail gracefully in production
    if (import.meta.env.DEV) {
      console.warn(
        '⚠️ Supabase environment variables missing. Please check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
      );
    }
    
    // Return mock client for production to prevent crashes
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
      }),
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "gympower-auth",
    },
  });
})();

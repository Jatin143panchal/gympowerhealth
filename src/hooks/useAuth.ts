import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
}

async function resolveAuth(): Promise<Omit<AuthState, "session"> & { session: Session | null }> {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;
  let isAdmin = false;
  if (user) {
    try {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      isAdmin = roles?.role === "admin";
    } catch {
      // RLS or network: assume not admin
    }
  }
  return { user, session, isLoading: false, isAdmin };
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAdmin: false,
  });

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const state = await resolveAuth();
      if (!cancelled) setAuthState(state);
    };

    init();
    const fallback = setTimeout(() => {
      setAuthState((s) => (s.isLoading ? { ...s, isLoading: false } : s));
    }, 800);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const user = session?.user ?? null;
        let isAdmin = false;
        if (user) {
          const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
          isAdmin = roles?.role === "admin";
        }
        if (!cancelled) setAuthState({ user, session: session ?? null, isLoading: false, isAdmin });
      }
    );

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
          phone: phone || "",
        },
      },
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
}

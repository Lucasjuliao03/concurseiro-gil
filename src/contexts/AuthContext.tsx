import { createContext, useCallback, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/study";
import * as authService from "@/services/authService";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  loading: boolean;
  login: typeof authService.login;
  register: typeof authService.register;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async (userId?: string) => {
    try {
      if (!userId) {
        const { data } = await supabase.auth.getUser();
        userId = data.user?.id;
      }
      if (userId) {
        const profile = await authService.fetchProfile(userId);
        setUser(profile);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh authenticated profile", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    refreshUser().finally(() => setLoading(false));

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        queryClient.clear();
        setUser(null);
        setLoading(false);
      } else if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        // We do NOT block the auth event loop with awaits. We just trigger background refresh.
        // login() already handles setUser on sign in.
        if (session?.user) {
          if (event === "SIGNED_IN") queryClient.clear();
          void refreshUser(session.user.id);
        }
      }
    });

    return () => { subscription.unsubscribe(); };
  }, [queryClient, refreshUser]);

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success && result.user) {
      queryClient.clear();
      setUser(result.user);
    }
    return { success: result.success, error: result.error };
  };

  const register = async (name: string, email: string, password: string, courseId?: number) => {
    return authService.register(name, email, password, courseId);
  };

  const logout = async () => {
    await authService.logout();
    queryClient.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isApproved: user?.isApproved ?? false,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

import { supabase } from "@/lib/supabase";
import { User, UserRole } from "@/types/study";

export async function fetchProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  // Since Supabase trigger assigns full_name from raw_user_meta_data,
  // we use it. We may not have email natively in the profile.
  return {
    id: data.id,
    name: data.full_name,
    email: data.username || "user@example.com", // username or email mapping
    role: data.role as UserRole,
    isApproved: data.is_active,
    createdAt: data.created_at,
    passwordHash: "", // Redacted for security
  };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    let msg = "Email ou senha inválidos.";
    if (error.message.includes("Invalid login")) msg = "Credenciais inválidas. Verifique se você confirmou seu e-mail.";
    return { success: false, error: msg };
  }

  if (data.user) {
    const profile = await fetchProfile(data.user.id);
    if (profile) return { success: true, user: profile };
    
    // Fallback if the database trigger didn't run properly
    return { 
      success: true, 
      user: {
        id: data.user.id,
        name: data.user.user_metadata?.full_name || email.split("@")[0],
        email: email,
        role: "student",
        isApproved: false,
        createdAt: data.user.created_at,
        passwordHash: "",
      } 
    };
  }
  return { success: true };
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  if (password.length < 6) {
    return { success: false, error: "A senha deve ter no mínimo 6 caracteres." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    let msg = error.message;
    if (msg.toLowerCase().includes("rate limit")) {
      msg = "Muitas tentativas. Tente novamente mais tarde.";
    } else if (msg.includes("already registered")) {
      msg = "E-mail já está em uso.";
    }
    return { success: false, error: msg };
  }

  // Se o Supabase exigir confirmação de e-mail, a session virá nula.
  // Nesse caso, o usuário não está logado ainda.
  if (!data.session) {
    return { success: false, error: "Cadastro realizado! Verifique seu e-mail para confirmar a conta antes de entrar." };
  }

  return { success: true };
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

export function getCurrentUser(): User | null {
  // Synchronous getter is deprecated when using Supabase,
  // rely on AuthContext for current user instead.
  return null;
}

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error || !data) return [];
  return data.map((d) => ({
    id: d.id,
    name: d.full_name,
    email: d.username || "",
    role: d.role as UserRole,
    isApproved: d.is_active,
    createdAt: d.created_at,
    passwordHash: "",
  }));
}

export async function approveUser(userId: string): Promise<void> {
  await supabase.from("profiles").update({ is_active: true }).eq("id", userId);
}

export async function blockUser(userId: string): Promise<void> {
  await supabase.from("profiles").update({ is_active: false }).eq("id", userId);
}

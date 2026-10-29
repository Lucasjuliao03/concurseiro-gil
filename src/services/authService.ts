import { supabase } from "@/lib/supabase";
import { User, UserRole } from "@/types/study";

export async function fetchProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.full_name,
    email: data.username || "user@example.com",
    role: data.role as UserRole,
    isApproved: data.is_active,
    createdAt: data.created_at,
    courseId: data.course_id,
    activeUntil: data.active_until,
    passwordHash: "",
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
    await supabase.auth.signOut();
    return { success: false, error: "Seu perfil não foi criado corretamente. Entre em contato com o suporte." };
  }
  return { success: true };
}

export async function register(
  name: string,
  email: string,
  password: string,
  courseId?: number
): Promise<{ success: boolean; error?: string; user?: User; requiresEmailConfirmation?: boolean }> {
  if (password.length < 6) {
    return { success: false, error: "A senha deve ter no mínimo 6 caracteres." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        course_id: courseId,
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

  // The trigger creates the profile. When a session exists, persist the selected course immediately.
  if (data.user && courseId) {
    const { error: profileError } = await supabase.from("profiles").update({ course_id: courseId }).eq("id", data.user.id);
    if (data.session && profileError) {
      return { success: false, error: "Conta criada, mas não foi possível vincular o curso. Entre em contato com o suporte." };
    }
  }

  if (!data.session) {
    return { success: true, requiresEmailConfirmation: true };
  }

  return { success: true };
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

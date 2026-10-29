interface SupabaseLikeError {
  code?: string;
  message?: string;
}

export function studyDataErrorMessage(error: unknown): string {
  const candidate = (error ?? {}) as SupabaseLikeError;
  const code = candidate.code ?? "";
  const message = candidate.message ?? (error instanceof Error ? error.message : "");

  if (code === "PGRST202" || message.includes("Could not find the function")) {
    return "O banco de dados do SAFO precisa ser atualizado. Avise a equipe responsável.";
  }
  if (code === "42501" || message.toLowerCase().includes("permission denied")) {
    return "Seu acesso a este conteúdo não foi autorizado. Confirme o curso vinculado à sua conta.";
  }
  if (message.includes("PROFILE_NOT_FOUND")) {
    return "Seu perfil não foi concluído corretamente. Avise a equipe responsável.";
  }
  return "Não foi possível carregar os dados. Verifique sua conexão e tente novamente.";
}

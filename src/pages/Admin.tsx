import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers, approveUser, blockUser } from "@/services/authService";
import { getAnsweredCount } from "@/services/accessService";
import { getStats } from "@/services/statsService";
import { User } from "@/types/study";
import { Shield, Check, X, Users, ChevronRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const { user: admin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const allUsers = getAllUsers().filter((u) => u.role !== "admin");
    setUsers(allUsers);
  }, [refreshKey]);

  const handleApprove = (userId: string) => {
    approveUser(userId);
    setRefreshKey((k) => k + 1);
  };

  const handleBlock = (userId: string) => {
    blockUser(userId);
    setRefreshKey((k) => k + 1);
  };

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-5 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Painel Admin</h1>
          </div>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Atualizar
          </button>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Total de usuários</span>
          </div>
          <p className="text-3xl font-black text-primary">{users.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {users.filter((u) => u.isApproved).length} aprovados · {users.filter((u) => !u.isApproved).length} pendentes
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Usuários Cadastrados</h2>
          {users.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">Nenhum usuário cadastrado ainda.</p>
            </div>
          ) : (
            users.map((u) => {
              const answered = getAnsweredCount(u.id);
              const stats = getStats(u.id);
              const accuracy = stats.totalAnswered > 0
                ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                : 0;

              return (
                <div key={u.id} className="rounded-2xl bg-card border border-border p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Cadastrado em: {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      u.isApproved
                        ? "bg-success/15 text-success border border-success/20"
                        : "bg-warning/15 text-warning border border-warning/20"
                    )}>
                      {u.isApproved ? "Aprovado" : "Pendente"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-muted/50 py-1.5">
                      <p className="text-xs font-bold text-foreground">{answered}</p>
                      <p className="text-[10px] text-muted-foreground">Respondidas</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 py-1.5">
                      <p className="text-xs font-bold text-foreground">{accuracy}%</p>
                      <p className="text-[10px] text-muted-foreground">Acertos</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 py-1.5">
                      <p className="text-xs font-bold text-foreground">{stats.xp}</p>
                      <p className="text-[10px] text-muted-foreground">XP</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!u.isApproved ? (
                      <button
                        onClick={() => handleApprove(u.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-success/15 border border-success/25 py-2.5 text-xs font-semibold text-success active:scale-[0.97] transition-all"
                      >
                        <Check className="h-3.5 w-3.5" /> Aprovar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(u.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-destructive/15 border border-destructive/25 py-2.5 text-xs font-semibold text-destructive active:scale-[0.97] transition-all"
                      >
                        <X className="h-3.5 w-3.5" /> Bloquear
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
}

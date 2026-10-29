import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminCourses, useAdminUsers, useApproveUser, useBlockUser, useUpdateUserCourse } from "@/hooks/useAdminData";
import { Check, X, Search, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminUsers() {
  const { data: users = [], isLoading } = useAdminUsers();
  const { data: courses = [] } = useAdminCourses();
  const approveMutation = useApproveUser();
  const blockMutation = useBlockUser();
  const updateCourseMutation = useUpdateUserCourse();
  const [search, setSearch] = useState("");
  const [activeDates, setActiveDates] = useState<Record<string, string>>({});

  const approve = (userId: string, existingDate?: string | null) => {
    const selected = activeDates[userId] ?? existingDate?.slice(0, 10) ?? "";
    approveMutation.mutate({
      userId,
      activeUntil: selected ? new Date(`${selected}T23:59:59`).toISOString() : null,
    });
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestão de Usuários</h1>
            <p className="text-muted-foreground text-sm">Administre alunos, gerencie permissões e aprovações.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="border border-border bg-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">Usuário</th>
                  <th className="px-6 py-3 font-semibold">Cadastro</th>
                  <th className="px-6 py-3 font-semibold">Papel</th>
                  <th className="px-6 py-3 font-semibold">Curso</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      Carregando usuários...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-3">
                        <span className={cn(
                          "inline-flex items-center gap-1 font-semibold text-[10px] px-2 py-0.5 rounded-full",
                          user.role === "admin" ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted text-muted-foreground"
                        )}>
                          {user.role === "admin" ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {user.role === "admin" ? (
                          <span className="text-xs text-muted-foreground">Todos</span>
                        ) : (
                          <select
                            aria-label={`Curso de ${user.name}`}
                            value={user.courseId ?? ""}
                            disabled={updateCourseMutation.isPending}
                            onChange={(event) => updateCourseMutation.mutate({
                              userId: user.id,
                              courseId: event.target.value ? Number(event.target.value) : null,
                            })}
                            className="min-w-32 rounded-md border border-border bg-background px-2 py-1.5 text-xs"
                          >
                            <option value="">Sem curso</option>
                            {courses.map((course) => (
                              <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <span className={cn(
                          "font-semibold text-[10px] px-2 py-0.5 rounded-full border",
                          user.isApproved
                            ? "bg-success/15 text-success border-success/20"
                            : "bg-warning/15 text-warning border-warning/20"
                        )}>
                          {user.isApproved ? "Aprovado" : "Pendente"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right space-x-2">
                        {user.role !== "admin" && (
                          <>
                            {!user.isApproved ? (
                              <button
                                onClick={() => approve(user.id, user.activeUntil)}
                                disabled={approveMutation.isPending}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-success/10 text-success hover:bg-success hover:text-success-foreground transition-all disabled:opacity-50"
                              >
                                <Check className="h-3.5 w-3.5" /> Aprovar
                              </button>
                            ) : (
                              <button
                                onClick={() => blockMutation.mutate(user.id)}
                                disabled={blockMutation.isPending}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50"
                              >
                                <X className="h-3.5 w-3.5" /> Bloquear
                              </button>
                            )}
                          </>
                        )}
                        {user.role !== "admin" && (
                          <input
                            type="date"
                            aria-label={`Validade do acesso de ${user.name}`}
                            value={activeDates[user.id] ?? user.activeUntil?.slice(0, 10) ?? ""}
                            onChange={(event) => setActiveDates((current) => ({ ...current, [user.id]: event.target.value }))}
                            onBlur={() => user.isApproved && approve(user.id, user.activeUntil)}
                            className="mt-2 rounded-md border border-border bg-background px-2 py-1 text-xs"
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

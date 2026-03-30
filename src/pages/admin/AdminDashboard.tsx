import { AdminLayout } from "@/components/AdminLayout";
import { useAdminDashboardStats } from "@/hooks/useAdminData";
import { Users, BookOpen, Layers, Zap } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminDashboardStats();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Geral</h1>
          <p className="text-muted-foreground">Visão geral do desempenho e conteúdo da plataforma SAFO.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users className="h-16 w-16" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" /> Alunos
            </div>
            <p className="text-3xl font-black">{isLoading ? "..." : stats?.users}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <BookOpen className="h-16 w-16" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 text-accent" /> Questões
            </div>
            <p className="text-3xl font-black">{isLoading ? "..." : stats?.questions}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Layers className="h-16 w-16" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Layers className="h-4 w-4 text-warning" /> Flashcards
            </div>
            <p className="text-3xl font-black">{isLoading ? "..." : stats?.flashcards}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="h-16 w-16" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-4 w-4 text-xp" /> Resoluções Hoje
            </div>
            <p className="text-3xl font-black text-xp">{isLoading ? "..." : stats?.todayResolutions}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

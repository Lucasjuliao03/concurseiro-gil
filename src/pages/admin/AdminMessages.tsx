import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { 
  useAdminMessages, 
  useCreateMessage, 
  useUpdateMessage, 
  useDeleteMessage 
} from "@/hooks/useAdminData";
import { Plus, Edit2, Trash2, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminMessages() {
  const { data: messages = [], isLoading } = useAdminMessages();
  const createMutation = useCreateMessage();
  const updateMutation = useUpdateMessage();
  const deleteMutation = useDeleteMessage();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja apagar esta mensagem permanentemente?")) {
      deleteMutation.mutate(id);
    }
  };

  const openForm = (msg?: any) => {
    if (msg) {
      setEditingId(msg.id);
      setMessage(msg.message);
      setAuthor(msg.author || "");
      setTheme(msg.theme || "");
      setIsActive(msg.is_active);
    } else {
      setEditingId(null);
      setMessage(""); setAuthor(""); setTheme(""); setIsActive(true);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => { setIsFormOpen(false); setEditingId(null); };

  const handleSave = () => {
    if (!message.trim()) return alert("O texto da mensagem é obrigatório.");
    const data = { message, author, theme, is_active: isActive };
    if (editingId) updateMutation.mutate({ id: editingId, data }, { onSuccess: closeForm });
    else createMutation.mutate(data, { onSuccess: closeForm });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mensagens Motivacionais</h1>
            <p className="text-muted-foreground text-sm">Gerencie as frases que inspiram os alunos no painel de estudos.</p>
          </div>
          {!isFormOpen && (
            <button onClick={() => openForm()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm">
              <Plus className="h-5 w-5" /> Nova Mensagem
            </button>
          )}
        </div>

        {isFormOpen && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-slide-down">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h2 className="font-bold">{editingId ? "Editar Mensagem" : "Nova Mensagem"}</h2>
              <button onClick={closeForm} className="p-1 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Texto da frase motivacional" className="w-full text-sm rounded-lg border border-border bg-background px-3 py-2 min-h-[80px]" />
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor (Opcional)" className="text-sm rounded-lg border border-border bg-background px-3 py-2" />
                <input type="text" value={theme} onChange={e => setTheme(e.target.value)} placeholder="Tema da Frase (Opcional)" className="text-sm rounded-lg border border-border bg-background px-3 py-2" />
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer w-max">
                <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded border-border" /> Ativa no sistema
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button onClick={closeForm} className="px-4 py-2 text-sm font-semibold rounded-lg bg-muted hover:bg-muted/80">Cancelar</button>
              <button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending} className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                {editingId ? "Salvar Alterações" : "Criar Mensagem"}
              </button>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-4">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando mensagens...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {messages.length === 0 ? (
                 <div className="col-span-full p-8 text-center text-muted-foreground">Nenhuma mensagem cadastrada.</div>
              ) : messages.map((msg: any) => (
                <div key={msg.id} className="p-5 rounded-xl border border-border flex flex-col justify-between group hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-muted/20 relative overflow-hidden">
                  <MessageSquare className="absolute -bottom-4 -right-4 h-24 w-24 text-muted/10 pointer-events-none" />
                  
                  <div className="mb-4 relative z-10">
                    <p className="font-medium text-foreground italic text-lg line-clamp-3">"{msg.message}"</p>
                    {msg.author && (
                      <p className="text-sm font-semibold text-primary mt-2 flex items-center gap-2">
                        <span className="w-4 border-t border-primary"></span>
                        {msg.author}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border mt-auto relative z-10">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                        msg.is_active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {msg.is_active ? "Ativa" : "Inativa"}
                      </span>
                      {msg.theme && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-secondary/15 text-secondary">
                          {msg.theme}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openForm(msg)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-lg">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

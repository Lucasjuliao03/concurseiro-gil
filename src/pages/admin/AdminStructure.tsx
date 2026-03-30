import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { 
  useAdminCourses, useCreateCourse, useUpdateCourse, useDeleteCourse,
  useAdminEdicts, useCreateEdict, useUpdateEdict, useDeleteEdict,
  useAdminSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject,
  useAdminTopics, useCreateTopic, useUpdateTopic, useDeleteTopic
} from "@/hooks/useAdminData";
import { Plus, Edit2, Layers, FileText, BookOpen, Quote, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminStructure() {
  const [activeTab, setActiveTab] = useState<"courses" | "edicts" | "subjects" | "topics">("courses");

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Estrutura do Sistema</h1>
          <p className="text-muted-foreground text-sm">Gerencie os cursos, editais, matérias e temas fundamentais.</p>
        </div>
        
        <div className="flex border-b border-border overflow-x-auto">
          {(["courses", "edicts", "subjects", "topics"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "courses" && "Cursos"}
              {tab === "edicts" && "Editais"}
              {tab === "subjects" && "Matérias"}
              {tab === "topics" && "Temas"}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          {activeTab === "courses" && <CoursesManager />}
          {activeTab === "edicts" && <EdictsManager />}
          {activeTab === "subjects" && <SubjectsManager />}
          {activeTab === "topics" && <TopicsManager />}
        </div>
      </div>
    </AdminLayout>
  );
}

function CoursesManager() {
  const { data: courses = [], isLoading } = useAdminCourses();
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Carregando cursos...</div>;

  const handleCreate = () => {
    if (!name.trim()) return;
    createMutation.mutate({ name, description, isActive });
    setName(""); setDescription(""); setIsActive(true);
  };

  const handleUpdate = (id: number) => {
    if (!name.trim()) return;
    updateMutation.mutate({ id, name, description, isActive });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Avalie com cuidado! Tem certeza que deseja apagar este curso permanentemente? Todos os editais vinculados podem ser afetados.")) {
      deleteMutation.mutate(id);
    }
  };

  const startEdit = (course: any) => {
    setEditingId(course.id);
    setName(course.name);
    setDescription(course.description || "");
    setIsActive(course.is_active);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName(""); setDescription(""); setIsActive(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Cursos Cadastrados</h2>
      </div>

      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
        <p className="font-semibold text-sm">{editingId ? "Editar Curso" : "Novo Curso"}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Nome do Curso" value={name} onChange={e => setName(e.target.value)} className="text-sm rounded-lg border border-border bg-card px-3 py-2" />
          <input type="text" placeholder="Descrição (opcional)" value={description} onChange={e => setDescription(e.target.value)} className="text-sm rounded-lg border border-border bg-card px-3 py-2" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded border-border" />
            Ativo no sistema
          </label>
          <div className="flex items-center gap-2">
            {editingId && <button onClick={cancelEdit} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted">Cancelar</button>}
            <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()} disabled={createMutation.isPending || updateMutation.isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              {editingId ? "Salvar" : <><Plus className="h-4 w-4" /> Criar Curso</>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 mt-4">
        {courses.map(course => (
          <div key={course.id} className="p-4 rounded-lg border border-border flex justify-between items-center group">
            <div>
              <p className="font-bold text-foreground">{course.name}</p>
              <p className="text-xs text-muted-foreground">{course.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold mr-2", course.is_active ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                {course.is_active ? "Ativo" : "Inativo"}
              </span>
              <button onClick={() => startEdit(course)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(course.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EdictsManager() {
  const { data: edicts = [], isLoading } = useAdminEdicts();
  const { data: courses = [] } = useAdminCourses();
  const createMutation = useCreateEdict();
  const updateMutation = useUpdateEdict();
  const deleteMutation = useDeleteEdict();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [courseId, setCourseId] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Carregando editais...</div>;

  const handleCreate = () => {
    if (!name.trim() || !courseId) return;
    createMutation.mutate({ name, year, courseId, isActive });
    setName(""); setYear(new Date().getFullYear()); setIsActive(true);
  };

  const handleUpdate = (id: number) => {
    if (!name.trim()) return;
    updateMutation.mutate({ id, name, year, isActive });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja apagar este edital e seus vínculos?")) deleteMutation.mutate(id);
  };

  const startEdit = (edict: any) => {
    setEditingId(edict.id);
    setName(edict.name);
    setYear(edict.year);
    setCourseId(edict.course_id);
    setIsActive(edict.is_active);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName(""); setYear(new Date().getFullYear()); setIsActive(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2"><FileText className="h-5 w-5 text-accent" /> Editais Cadastrados</h2>
      </div>

      <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 space-y-3">
        <p className="font-semibold text-sm">{editingId ? "Editar Edital" : "Novo Edital"}</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <input type="text" placeholder="Nome (Ex: PMMG 2024)" value={name} onChange={e => setName(e.target.value)} className="text-sm rounded-lg border border-border bg-card px-3 py-2" />
          <input type="number" placeholder="Ano" value={year} onChange={e => setYear(Number(e.target.value))} className="text-sm rounded-lg border border-border bg-card px-3 py-2" />
          <select value={courseId} onChange={e => setCourseId(Number(e.target.value))} disabled={!!editingId} className="text-sm rounded-lg border border-border bg-card px-3 py-2">
            <option value={0}>Selecione um Curso</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded border-border" />
            Ativo
          </label>
          <div className="flex items-center gap-2">
            {editingId && <button onClick={cancelEdit} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted">Cancelar</button>}
            <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()} disabled={!courseId || createMutation.isPending || updateMutation.isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/90">
              {editingId ? "Salvar" : <><Plus className="h-4 w-4" /> Criar Edital</>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 mt-4">
        {edicts.map(edict => (
          <div key={edict.id} className="p-4 rounded-lg border border-border flex justify-between items-center group">
            <div>
              <p className="font-bold text-foreground">{edict.name} <span className="text-xs font-normal text-muted-foreground ml-2">({edict.year})</span></p>
              <p className="text-xs text-muted-foreground">Curso: {(edict as any).courses?.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold mr-2", edict.is_active ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                {edict.is_active ? "Ativo" : "Inativo"}
              </span>
              <button onClick={() => startEdit(edict)} className="p-1.5 text-muted-foreground hover:text-accent transition-colors"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(edict.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubjectsManager() {
  const { data: subjects = [], isLoading } = useAdminSubjects();
  const createMutation = useCreateSubject();
  const updateMutation = useUpdateSubject();
  const deleteMutation = useDeleteSubject();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Carregando matérias...</div>;

  const handleCreate = () => {
    if (!name.trim()) return;
    createMutation.mutate({ name, description });
    setName(""); setDescription("");
  };

  const handleUpdate = (id: number) => {
    if (!name.trim()) return;
    updateMutation.mutate({ id, name, description });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja apagar esta matéria? Tudo associado a ela pode ser perdido.")) deleteMutation.mutate(id);
  };

  const startEdit = (sub: any) => {
    setEditingId(sub.id);
    setName(sub.name);
    setDescription(sub.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName(""); setDescription("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2"><BookOpen className="h-5 w-5 text-warning" /> Matérias Cadastradas</h2>
      </div>

      <div className="p-4 rounded-xl border border-warning/20 bg-warning/5 space-y-3">
        <p className="font-semibold text-sm">{editingId ? "Editar Matéria" : "Nova Matéria"}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Nome da Matéria (Ex: Direito Penal)" value={name} onChange={e => setName(e.target.value)} className="text-sm rounded-lg border border-border bg-card px-3 py-2" />
          <input type="text" placeholder="Descrição ou Ícone" value={description} onChange={e => setDescription(e.target.value)} className="text-sm rounded-lg border border-border bg-card px-3 py-2" />
        </div>
        <div className="flex items-center justify-end gap-2">
          {editingId && <button onClick={cancelEdit} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted">Cancelar</button>}
          <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()} disabled={createMutation.isPending || updateMutation.isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-warning text-warning-foreground hover:bg-warning/90">
            {editingId ? "Salvar" : <><Plus className="h-4 w-4" /> Criar Matéria</>}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {subjects.map(sub => (
          <div key={sub.id} className="p-4 rounded-lg border border-border flex justify-between items-center group">
            <div>
              <p className="font-bold text-foreground">{sub.name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{sub.description || "Sem descrição"}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => startEdit(sub)} className="p-1.5 text-muted-foreground hover:text-warning transition-colors"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicsManager() {
  const { data: topics = [], isLoading } = useAdminTopics();
  const { data: subjects = [] } = useAdminSubjects();
  const createMutation = useCreateTopic();
  const updateMutation = useUpdateTopic();
  const deleteMutation = useDeleteTopic();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<number>(0);

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Carregando temas...</div>;

  const handleCreate = () => {
    if (!name.trim() || !subjectId) return;
    createMutation.mutate({ name, description, subjectId, sortOrder });
    setName(""); setDescription(""); setSortOrder(0);
  };

  const handleUpdate = (id: number) => {
    if (!name.trim()) return;
    updateMutation.mutate({ id, name, description, sortOrder });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Atenção: Apagar este tema apagará as questões vinculadas a ele. Certeza?")) deleteMutation.mutate(id);
  };

  const startEdit = (topic: any) => {
    setEditingId(topic.id);
    setName(topic.name);
    setDescription(topic.description || "");
    setSubjectId(topic.subject_id);
    setSortOrder(topic.sort_order || 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName(""); setDescription(""); setSortOrder(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2"><Quote className="h-5 w-5 text-xp" /> Temas Cadastrados</h2>
      </div>

      <div className="p-4 rounded-xl border border-xp/20 bg-xp/5 space-y-3">
        <p className="font-semibold text-sm">{editingId ? "Editar Tema" : "Novo Tema"}</p>
        <div className="grid sm:grid-cols-4 gap-3">
          <input type="text" placeholder="Nome do Tema" value={name} onChange={e => setName(e.target.value)} className="col-span-2 text-sm rounded-lg border border-border bg-card px-3 py-2" />
          <select value={subjectId} onChange={e => setSubjectId(Number(e.target.value))} disabled={!!editingId} className="text-sm rounded-lg border border-border bg-card px-3 py-2">
            <option value={0}>Selecione Matéria</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input type="number" placeholder="Ordem" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))} className="text-sm rounded-lg border border-border bg-card px-3 py-2" title="Ordem na trilha" />
        </div>
        <div className="flex items-center justify-end gap-2">
          {editingId && <button onClick={cancelEdit} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted">Cancelar</button>}
          <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()} disabled={!subjectId || createMutation.isPending || updateMutation.isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-xp text-xp-foreground hover:bg-xp/90">
            {editingId ? "Salvar" : <><Plus className="h-4 w-4" /> Criar Tema</>}
          </button>
        </div>
      </div>

      <div className="grid gap-3 mt-4">
        {topics.map(topic => (
          <div key={topic.id} className="p-4 rounded-lg border border-border flex justify-between items-center group">
            <div>
              <p className="font-bold text-foreground">{topic.name}</p>
              <p className="text-xs text-muted-foreground">Matéria: {(topic as any).subjects?.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-muted text-muted-foreground border mr-2">
                Ordem: {topic.sort_order}
              </span>
              <button onClick={() => startEdit(topic)} className="p-1.5 text-muted-foreground hover:text-xp transition-colors"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(topic.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

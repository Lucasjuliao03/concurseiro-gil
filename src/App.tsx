import { lazy, Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ProtectedRoute, AdminRoute } from "@/components/ProtectedRoute";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import { studyDataErrorMessage } from "@/lib/supabaseErrors";
const Index = lazy(() => import("./pages/Index"));
const Questoes = lazy(() => import("./pages/Questoes"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const Resumos = lazy(() => import("./pages/Resumos"));
const Perfil = lazy(() => import("./pages/Perfil"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Achievements = lazy(() => import("./pages/Achievements"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminStructure = lazy(() => import("./pages/admin/AdminStructure"));
const AdminQuestions = lazy(() => import("./pages/admin/AdminQuestions"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(studyDataErrorMessage(error)),
  }),
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
    mutations: {
      retry: 0,
      onError: () => toast.error("A operação não pôde ser concluída. Tente novamente."),
    },
  },
});

const RouteFallback = () => (
  <div className="dark min-h-screen bg-background flex items-center justify-center" role="status" aria-label="Carregando página">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

// Intro Video Screen Overlay
const IntroScreen = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center cursor-pointer overflow-hidden p-4"
      onClick={onFinish} // Tap to skip
    >
      <video 
        src="/intro.mp4" 
        autoPlay 
        muted 
        playsInline 
        onEnded={onFinish}
        onError={onFinish}
        poster="/app.png"
        className="w-full h-full max-h-[90vh] object-contain animate-fade-in"
      />
      <div className="absolute bottom-6 left-0 w-full text-center text-white/50 text-xs font-mono tracking-widest uppercase font-semibold">
        Toque para pular
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Only show intro once per browser session. Opening the PWA fresh starts a new session.
    const hasSeenIntro = localStorage.getItem("safo_intro_v1");
    if (hasSeenIntro) {
      setIntroFinished(true);
    }
  }, []);

  const handleFinishIntro = () => {
    localStorage.setItem("safo_intro_v1", "true");
    setIntroFinished(true);
  };

  return (
    <>
      {!introFinished && <IntroScreen onFinish={handleFinishIntro} />}
      <div className={introFinished ? "block" : "hidden h-0 overflow-hidden"}>
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/questoes" element={<ProtectedRoute><Questoes /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
          <Route path="/resumos" element={<ProtectedRoute><Resumos /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path="/medalhas" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute><AdminRoute><Navigate to="/painel" replace /></AdminRoute></ProtectedRoute>} />
          
          <Route path="/painel" element={<ProtectedRoute><AdminRoute><AdminDashboard /></AdminRoute></ProtectedRoute>} />
          <Route path="/painel/usuarios" element={<ProtectedRoute><AdminRoute><AdminUsers /></AdminRoute></ProtectedRoute>} />
          <Route path="/painel/estrutura" element={<ProtectedRoute><AdminRoute><AdminStructure /></AdminRoute></ProtectedRoute>} />
          <Route path="/painel/questoes" element={<ProtectedRoute><AdminRoute><AdminQuestions /></AdminRoute></ProtectedRoute>} />
          <Route path="/painel/conteudo" element={<ProtectedRoute><AdminRoute><AdminContent /></AdminRoute></ProtectedRoute>} />
          <Route path="/painel/mensagens" element={<ProtectedRoute><AdminRoute><AdminMessages /></AdminRoute></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </div>
    </>
  );
};

const App = () => {
  useServiceWorker();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <AppErrorBoundary><AppRoutes /></AppErrorBoundary>
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

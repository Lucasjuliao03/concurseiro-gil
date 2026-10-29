import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled application error", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-6">
          <div className="max-w-sm text-center space-y-4">
            <h1 className="text-xl font-bold">Não foi possível abrir esta tela</h1>
            <p className="text-sm text-muted-foreground">Recarregue a página. Se o problema continuar, entre em contato com o suporte.</p>
            <button onClick={() => window.location.reload()} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
              Recarregar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

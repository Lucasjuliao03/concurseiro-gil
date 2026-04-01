import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { NotificationBanner } from "./NotificationBanner";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <NotificationBanner />
      <main className="mx-auto max-w-lg pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

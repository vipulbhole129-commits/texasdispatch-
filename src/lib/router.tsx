import { useMemo, type ReactNode } from "react";
import { Router as WouterRouter } from "wouter";

type AuthoritativeBrowserRouterProps = { children: ReactNode };

export function AuthoritativeBrowserRouter({
  children,
}: AuthoritativeBrowserRouterProps) {
  const base = useMemo(
    () => import.meta.env.BASE_URL.replace(/\/$/, ""),
    [],
  );

  return <WouterRouter base={base}>{children}</WouterRouter>;
}

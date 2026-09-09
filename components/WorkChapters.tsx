import type { ReactNode } from "react";

export default function WorkChapters({ children }: { children: ReactNode }) {
  return <div className="relative min-w-0">{children}</div>;
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type VeilState = "idle" | "cover" | "reveal";

const VeilContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function useVeilNavigate() {
  return useContext(VeilContext).navigate;
}

/**
 * Route Sakura Veil (ui-motion-plan2 §14): a soft blush veil blooms over the
 * page, the route changes underneath, then the veil dissolves. Navbar stays
 * stable for continuity. Reduced motion: immediate route change.
 */
export default function RouteVeilProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [state, setState] = useState<VeilState>("idle");
  const pendingRef = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  // Dissolve once the new route has mounted
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    setState("reveal");
    timers.current.push(window.setTimeout(() => setState("idle"), 450));
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (reduce) {
        router.push(href);
        return;
      }
      setState("cover");
      pendingRef.current = true;
      timers.current.push(window.setTimeout(() => router.push(href), 260));
      // Safety: never leave the veil stuck if navigation fails
      timers.current.push(
        window.setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current = false;
            setState("idle");
          }
        }, 2000)
      );
    },
    [pathname, reduce, router]
  );

  return (
    <VeilContext.Provider value={{ navigate }}>
      {children}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[55]"
        style={{
          pointerEvents: state === "cover" ? "auto" : "none",
          background:
            "radial-gradient(circle at 50% 44%, rgba(255,247,249,.99) 0%, rgba(249,231,236,.97) 52%, rgba(244,220,228,.95) 100%)",
        }}
        initial={false}
        animate={{ opacity: state === "cover" ? 1 : 0 }}
        transition={{ duration: state === "cover" ? 0.3 : 0.42, ease }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-48 w-48 -ml-24 -mt-24 rounded-full border border-[var(--sakura-accent)]"
          initial={false}
          animate={
            state === "cover"
              ? { scale: [0.5, 2.4], opacity: [0.4, 0] }
              : { scale: 0.5, opacity: 0 }
          }
          transition={{ duration: 0.55, ease }}
        />
      </motion.div>
    </VeilContext.Provider>
  );
}

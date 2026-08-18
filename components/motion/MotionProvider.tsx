"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Scene state model (ui-motion-plan2 §22):
 * boot → entry → entering → ready
 * "ready" covers INDEX / WORK / RESUME / CONTACT; route changes are handled by RouteVeil.
 */
export type ScenePhase = "boot" | "entry" | "entering" | "ready";

const SESSION_KEY = "kikiarya-entered";

// Runs before paint on the client so the gate never flashes for returning visitors.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MotionContext = createContext<{
  phase: ScenePhase;
  sceneReady: boolean;
  cursorActive: boolean;
  enter: () => void;
}>({ phase: "boot", sceneReady: false, cursorActive: false, enter: () => {} });

export function useMotionScene() {
  return useContext(MotionContext);
}

export function useSceneReady() {
  return useContext(MotionContext).sceneReady;
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<ScenePhase>("boot");
  const [cursorActive, setCursorActive] = useState(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const timers = useRef<number[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (phaseRef.current !== "boot") return;
    const entered = window.sessionStorage.getItem(SESSION_KEY) === "true";
    if (entered || pathname !== "/") {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setPhase("ready");
      setCursorActive(true);
    } else {
      setPhase("entry");
    }
  }, [pathname]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const enter = useCallback(() => {
    if (phaseRef.current !== "entry") return;
    window.sessionStorage.setItem(SESSION_KEY, "true");
    if (reduce) {
      setPhase("ready");
      setCursorActive(true);
      return;
    }
    setPhase("entering");
    // §3.2 timeline: hero starts revealing behind the dissolving veil (~380-700ms),
    // petal cursor takes over once the index is the active scene (~900ms).
    timers.current.push(window.setTimeout(() => setPhase("ready"), 420));
    timers.current.push(window.setTimeout(() => setCursorActive(true), 900));
  }, [reduce]);

  return (
    <MotionContext.Provider
      value={{ phase, sceneReady: phase === "ready", cursorActive, enter }}
    >
      {children}
    </MotionContext.Provider>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
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
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Cover is a first-class destination: Kikiarya. always returns here.
 * ENTER → Work home (/). ✿ → Personal (/notes, /life, /bookshelf).
 *
 * `/` SSRs as Cover so the first paint is never an empty background.
 * sessionStorage is only read after mount, to skip Cover for the same tab.
 */
export type ScenePhase = "entry" | "entering" | "ready";

const SESSION_KEY = "kikiarya-entered";

const MotionContext = createContext<{
  phase: ScenePhase;
  isCover: boolean;
  sceneReady: boolean;
  cursorActive: boolean;
  enter: () => void;
  enterWork: () => void;
  returnToCover: () => void;
}>({
  phase: "entry",
  isCover: true,
  sceneReady: false,
  cursorActive: false,
  enter: () => {},
  enterWork: () => {},
  returnToCover: () => {},
});

export function useMotionScene() {
  return useContext(MotionContext);
}

export function useSceneReady() {
  return useContext(MotionContext).sceneReady;
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<ScenePhase>(() =>
    pathname === "/" ? "entry" : "ready"
  );
  const [cursorActive, setCursorActive] = useState(() => pathname !== "/");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const timers = useRef<number[]>([]);
  const booted = useRef(false);

  useLayoutEffect(() => {
    if (booted.current) return;
    booted.current = true;
    if (pathnameRef.current !== "/") {
      setPhase("ready");
      setCursorActive(true);
      return;
    }
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      setPhase("ready");
      setCursorActive(true);
    }
  }, []);

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
    timers.current.push(window.setTimeout(() => setPhase("ready"), 680));
    timers.current.push(window.setTimeout(() => setCursorActive(true), 980));
  }, [reduce]);

  const enterWork = useCallback(() => {
    if (pathnameRef.current !== "/") router.push("/");
    enter();
  }, [enter, router]);

  const returnToCover = useCallback(() => {
    if (phaseRef.current !== "entry" && phaseRef.current !== "entering") {
      setPhase("entry");
      setCursorActive(false);
      window.scrollTo(0, 0);
    }
    if (pathnameRef.current !== "/") router.push("/");
  }, [router]);

  const isCover = phase === "entry" || phase === "entering";

  return (
    <MotionContext.Provider
      value={{
        phase,
        isCover,
        sceneReady: phase === "ready",
        cursorActive,
        enter,
        enterWork,
        returnToCover,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

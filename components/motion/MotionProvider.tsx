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
 * A full reload of `/` always starts on Cover. Enter is in-session only.
 */
export type ScenePhase = "entry" | "entering" | "ready";

const MotionContext = createContext<{
  phase: ScenePhase;
  isCover: boolean;
  sceneReady: boolean;
  cursorActive: boolean;
  arriveFrom: "load" | "world";
  enter: () => void;
  enterWork: () => void;
  returnToCover: () => void;
}>({
  phase: "entry",
  isCover: true,
  sceneReady: false,
  cursorActive: true,
  arriveFrom: "load",
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
  const cursorActive = true;
  const [arriveFrom, setArriveFrom] = useState<"load" | "world">("load");
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
    }
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const enter = useCallback(() => {
    if (phaseRef.current !== "entry") return;
    if (reduce) {
      setPhase("ready");
      return;
    }
    setPhase("entering");
    timers.current.push(window.setTimeout(() => setPhase("ready"), 720));
  }, [reduce]);

  const enterWork = useCallback(() => {
    if (pathnameRef.current !== "/") router.push("/");
    enter();
  }, [enter, router]);

  const returnToCover = useCallback(() => {
    if (phaseRef.current !== "entry" && phaseRef.current !== "entering") {
      setArriveFrom("world");
      setPhase("entry");
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
        arriveFrom,
        enter,
        enterWork,
        returnToCover,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { RotateCcw } from "lucide-react";
import AssistantPanel from "./AssistantPanel";
import { useMotionScene } from "../motion/MotionProvider";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

type PetStatus = "idle" | "waving" | "running" | "review";
type Dock = "left" | "right";
type Position = { x: number; y: number; dock: Dock };

const STORAGE_KEY = "kiki-assistant-position-v1";
const PET_WIDTH = 112;
const PET_HEIGHT = 128;
const EDGE = 16;
const TOP_SAFE = 88;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function defaultPosition(): Position {
  return {
    x: Math.max(EDGE, window.innerWidth - PET_WIDTH - 24),
    y: Math.max(TOP_SAFE, window.innerHeight - PET_HEIGHT - 24),
    dock: "right",
  };
}

function restorePosition(): Position {
  const fallback = defaultPosition();
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") as
      | { dock?: Dock; yRatio?: number }
      | null;
    if (!stored || (stored.dock !== "left" && stored.dock !== "right")) return fallback;
    const x = stored.dock === "left" ? EDGE : window.innerWidth - PET_WIDTH - EDGE;
    const usableHeight = Math.max(1, window.innerHeight - TOP_SAFE - PET_HEIGHT - EDGE);
    return {
      x: clamp(x, EDGE, window.innerWidth - PET_WIDTH - EDGE),
      y: clamp(TOP_SAFE + (stored.yRatio ?? 1) * usableHeight, TOP_SAFE, window.innerHeight - PET_HEIGHT - EDGE),
      dock: stored.dock,
    };
  } catch {
    return fallback;
  }
}

export default function DraggablePet() {
  const { sceneReady, isCover } = useMotionScene();
  const reduce = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<PetStatus>("idle");
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, dock: "right" });
  const positionRef = useRef(position);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  positionRef.current = position;

  const savePosition = useCallback((next: Position) => {
    const usableHeight = Math.max(1, window.innerHeight - TOP_SAFE - PET_HEIGHT - EDGE);
    const yRatio = clamp((next.y - TOP_SAFE) / usableHeight, 0, 1);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ dock: next.dock, yRatio }));
  }, []);

  const closeAssistant = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setPosition(restorePosition());
    setMounted(true);
    const onResize = () => setPosition(restorePosition());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      return;
    }
    setStatus("waving");
    const timer = window.setTimeout(() => {
      setStatus((current) => current === "waving" ? "idle" : current);
    }, reduce ? 180 : 1_050);
    return () => window.clearTimeout(timer);
  }, [open, reduce]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (open || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: positionRef.current.x,
      originY: positionRef.current.y,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || open) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    drag.moved = true;
    setPosition((current) => ({
      ...current,
      x: clamp(drag.originX + dx, EDGE, window.innerWidth - PET_WIDTH - EDGE),
      y: clamp(drag.originY + dy, TOP_SAFE, window.innerHeight - PET_HEIGHT - EDGE),
    }));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (!drag.moved) return;

    suppressClick.current = true;
    const dock: Dock = positionRef.current.x + PET_WIDTH / 2 < window.innerWidth / 2 ? "left" : "right";
    const next = {
      ...positionRef.current,
      x: dock === "left" ? EDGE : window.innerWidth - PET_WIDTH - EDGE,
      dock,
    };
    setPosition(next);
    savePosition(next);
    window.setTimeout(() => { suppressClick.current = false; }, 0);
  };

  const resetPosition = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setPosition(defaultPosition());
  };

  if (!mounted || !sceneReady || isCover) return null;

  return (
    <div className="assistant-shell" data-open={open} data-dock={position.dock}>
      <button
        type="button"
        className="assistant-pet-button"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant. Drag to move."}
        aria-expanded={open}
        aria-haspopup="dialog"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { dragRef.current = null; }}
        onClick={() => {
          if (!suppressClick.current) setOpen((value) => !value);
        }}
      >
        <span className={`assistant-pet-sprite pet-${status}`} aria-hidden="true" />
        <span className="assistant-pet-label">Ask Kiki · 问项目</span>
      </button>

      {open ? (
        <>
          <AssistantPanel
            side={position.dock}
            onClose={closeAssistant}
            onStatus={setStatus}
          />
          <button type="button" className="assistant-reset" onClick={resetPosition}>
            <RotateCcw size={13} aria-hidden="true" /> Reset position / 重置位置
          </button>
        </>
      ) : null}
    </div>
  );
}

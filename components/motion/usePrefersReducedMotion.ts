"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Framer's useReducedMotion() is `null` on the server and a boolean on the
 * client. Branching on it during render writes different HTML attributes
 * (style, animation, transform) and trips hydration.
 *
 * Until mount, treat motion as allowed so SSR and the first client paint
 * match. After mount, follow the real preference.
 */
export function usePrefersReducedMotion() {
  const raw = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? !!raw : false;
}

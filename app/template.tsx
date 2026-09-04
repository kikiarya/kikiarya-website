"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../components/motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fade plus a typography-style mask wipe behind the Route Veil.
 *  Work detail skips the mask so card → page can use a shared-element transition. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const pathname = usePathname();
  const workDetail = /^\/work\/[^/]+$/.test(pathname);

  if (workDetail) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, clipPath: "inset(0 0 14% 0)" }
      }
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: reduce ? 0.15 : 0.65, delay: 0.06, ease }}
    >
      {children}
    </motion.div>
  );
}

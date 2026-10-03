"use client";

import { useEffect } from "react";
import { initParallax, initReveals } from "@/lib/motion";

/**
 * Starts the site's motion once, at the root.
 *
 * Everything else — including every server component — opts in declaratively
 * with a class or a data attribute. See src/lib/motion.ts.
 */
export function MotionEngine() {
  useEffect(() => {
    const stopReveals = initReveals();
    const stopParallax = initParallax();
    return () => {
      stopReveals();
      stopParallax();
    };
  }, []);

  return null;
}

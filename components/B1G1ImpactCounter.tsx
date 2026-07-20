"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function B1G1ImpactCounter() {
  const [total, setTotal] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/b1g1-impact")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.totalImpact === "number") setTotal(data.totalImpact);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (total !== null) motionVal.set(total);
  }, [total, motionVal]);

  useEffect(() => {
    if (total === null || !ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = total.toLocaleString("en-US");
      return;
    }
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString("en-US");
    });
  }, [spring, total, reduceMotion]);

  if (total === null) return null;

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="tabular-nums"
    >
      0
    </motion.span>
  );
}

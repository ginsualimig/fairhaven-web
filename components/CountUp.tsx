"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
}

// Splits a display string like "14–15%" or "~15%" or "10 yrs" into a leading
// numeric run to animate, plus the prefix/suffix text to render statically.
function splitNumeric(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return { prefix, number: parseFloat(number), decimals: number.includes(".") ? number.split(".")[1].length : 0, suffix };
}

export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const parsed = splitNumeric(value);

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (isInView && parsed) {
      motionVal.set(parsed.number);
    }
  }, [isInView, parsed, motionVal]);

  useEffect(() => {
    if (!parsed || !ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = value;
      return;
    }
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`;
      }
    });
  }, [spring, parsed, reduceMotion, value]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      {reduceMotion ? value : `${parsed.prefix}0${parsed.suffix}`}
    </motion.span>
  );
}

"use client";

import { useState } from "react";
import { motion, useSpring } from "framer-motion";
import CountUp from "./CountUp";

interface StatCardProps {
  stat: string;
  label: string;
  tooltip?: string;
}

export default function StatCard({ stat, label, tooltip }: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    setRotateX(rx);
    setRotateY(ry);
  }

  function handleMouseLeave() {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <div style={{ perspective: "800px" }} className="relative">
      <motion.div
        className="rounded-lg border border-stone/10 bg-offwhite p-6 text-center cursor-default select-none"
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(15,23,42,0.12)" }}
        transition={{ duration: 0.25 }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CountUp value={stat} className="block text-3xl font-bold text-gold font-serif mb-1" />
        <div className="text-sm text-stone">{label}</div>

        {tooltip && hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy text-offwhite text-xs rounded px-3 py-1 z-10 pointer-events-none"
          >
            {tooltip}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-navy" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

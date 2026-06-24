import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ParallaxDecor() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const x1 = useTransform(springX, [-1, 1], [-12, 12]);
  const y1 = useTransform(springY, [-1, 1], [-8, 8]);
  const x2 = useTransform(springX, [-1, 1], [8, -8]);
  const y2 = useTransform(springY, [-1, 1], [6, -6]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reducedMotion);

    if (!finePointer || reducedMotion) return;

    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-8 -right-8 w-32 h-32 border border-ink/5 rounded-full"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute bottom-12 -left-6 w-20 h-20 border border-accent/10 rotate-45"
      />
      <motion.span
        style={{ x: x1, y: y2 }}
        className="absolute top-1/3 right-8 text-accent/20 text-2xl font-heading"
      >
        ❧
      </motion.span>
    </div>
  );
}

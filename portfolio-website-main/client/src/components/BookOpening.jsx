import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOK_TITLE } from '../config/book';

const STORAGE_KEY = 'antigravity-book-opened';

export default function BookOpening({ onComplete }) {
  const [phase, setPhase] = useState('closed');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const opened = localStorage.getItem(STORAGE_KEY);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (opened || reducedMotion) {
      onComplete();
      return;
    }

    setVisible(true);
    const t1 = setTimeout(() => setPhase('opening'), 400);
    const t2 = setTimeout(() => setPhase('open'), 2200);
    const t3 = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, 'true');
      setVisible(false);
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10001] flex items-center justify-center bg-ink/95"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        role="dialog"
        aria-label="Book opening animation"
        aria-live="polite"
      >
        <div className="relative w-[min(90vw,420px)] h-[min(70vh,560px)]" style={{ perspective: '2000px' }}>
          <motion.div
            className="absolute inset-0 bg-paper rounded-sm shadow-2xl border border-ink/20"
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
            animate={
              phase === 'closed'
                ? { rotateY: 0, scale: 0.92 }
                : phase === 'opening'
                  ? { rotateY: -25, scale: 0.96 }
                  : { rotateY: -160, scale: 1, opacity: 0 }
            }
            transition={{ duration: 1.4, ease: [0.22, 0.82, 0.22, 1] }}
          >
            <div className="absolute inset-0 paper-texture flex flex-col items-center justify-center p-8 text-center">
              <p className="text-accent font-heading italic text-lg mb-4">A Digital Portfolio</p>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-ink uppercase tracking-widest leading-tight">
                {BOOK_TITLE}
              </h1>
              <div className="w-16 h-px bg-ink/30 my-6" />
              <p className="text-inkLight font-body italic text-sm md:text-base max-w-xs">
                Turn the page to begin reading
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink/15 to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-paperDark rounded-sm -z-10 shadow-inner"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: phase === 'open' ? 0 : 0.6 }}
          />
        </div>

        {phase === 'closed' && (
          <motion.p
            className="absolute bottom-12 text-paper/60 font-heading text-xs uppercase tracking-[0.4em]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Opening…
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

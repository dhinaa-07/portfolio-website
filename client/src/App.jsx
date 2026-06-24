import React, { Suspense, lazy, useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ChatAssistant from './components/ChatAssistant';
import { getPageIndex } from './config/book';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const WorksPage = lazy(() => import('./pages/WorksPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const CraftPage = lazy(() => import('./pages/CraftPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function LoadingFallback() {
  return (
    <div className="book-loading flex items-center justify-center py-24" role="status" aria-live="polite">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-accent text-2xl font-heading animate-pulse" aria-hidden="true">❧</span>
        <span className="font-heading text-ink text-sm uppercase tracking-[0.4em]">Turning Page…</span>
      </motion.div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const previousPathRef = React.useRef(location.pathname);
  const previousIndex = getPageIndex(previousPathRef.current);
  const currentIndex = getPageIndex(location.pathname);
  const direction = currentIndex >= previousIndex ? 1 : -1;

  React.useEffect(() => {
    previousPathRef.current = location.pathname;
  }, [location.pathname]);

  const duration = reducedMotion ? 0.01 : 0.85;

  const pageTurnVariants = {
    initial: (d) => ({
      rotateY: d > 0 ? 8 : -8,
      rotateX: d > 0 ? 0.6 : -0.6,
      x: d > 0 ? 24 : -24,
      scale: 0.988,
      filter: reducedMotion ? 'none' : 'brightness(0.94)',
      transformOrigin: d > 0 ? 'right center' : 'left center',
      boxShadow: d > 0 ? '-16px 0 40px rgba(44,44,44,0.1)' : '16px 0 40px rgba(44,44,44,0.1)',
    }),
    animate: {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      scale: 1,
      filter: 'brightness(1)',
      boxShadow: '0 0 0 rgba(44,44,44,0)',
      transition: { duration, ease: [0.2, 0.82, 0.22, 1] },
    },
    exit: (d) => ({
      rotateY: d > 0 ? -115 : 115,
      rotateX: d > 0 ? -1.2 : 1.2,
      x: d > 0 ? -72 : 72,
      scaleX: 0.95,
      filter: reducedMotion ? 'none' : 'brightness(0.65)',
      transformOrigin: d > 0 ? 'left center' : 'right center',
      boxShadow: d > 0 ? '40px 0 72px rgba(44,44,44,0.22)' : '-40px 0 72px rgba(44,44,44,0.22)',
      transition: { duration, ease: [0.2, 0.82, 0.22, 1] },
    }),
  };

  const shadowVariants = {
    initial: (d) => ({ opacity: 0.28, x: d > 0 ? -14 : 14 }),
    animate: { opacity: 0, x: 0, transition: { duration: duration * 0.85 } },
    exit: (d) => ({
      opacity: [0.06, 0.55, 0.2],
      x: d > 0 ? [-4, -40, -64] : [4, 40, 64],
      transition: { duration, times: [0, 0.55, 1] },
    }),
  };

  return (
    <div className="book-stage relative w-full" style={{ perspective: reducedMotion ? 'none' : '2600px' }}>
      <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={pageTurnVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="book-page-turn w-full"
          style={{
            gridArea: '1 / 1',
            transformStyle: reducedMotion ? 'flat' : 'preserve-3d',
            backfaceVisibility: 'hidden',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        >
          <div className="book-page-content">
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/works" element={<WorksPage />} />
                <Route path="/works/:slug" element={<ProjectDetailPage />} />
                <Route path="/craft" element={<CraftPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<Navigate to="/craft" replace />} />
                <Route path="/projects" element={<Navigate to="/works" replace />} />
                <Route path="/team" element={<Navigate to="/journey" replace />} />
              </Routes>
            </Suspense>
          </div>
          {!reducedMotion && (
            <>
              <motion.div className="page-turn-shadow" custom={direction} variants={shadowVariants} />
              <motion.div
                className="page-turn-highlight"
                custom={direction}
                variants={shadowVariants}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AppShell() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full flex flex-col min-h-full book-app-shell"
    >
      <CustomCursor />
      <Navbar />
      <main className="relative z-10 flex-1 book-main">
        <AnimatedRoutes />
      </main>
      <Footer />

      {/* Dhina AI Chat Assistant (book-themed) */}
      <ChatAssistant
        theme="dark"
        isOpenExternal={isChatOpen}
        setIsOpenExternal={setIsChatOpen}
      />
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

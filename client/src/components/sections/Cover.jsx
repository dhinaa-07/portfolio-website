import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BookPage from '../BookPage';

export default function CoverPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <BookPage id="cover" chapter="Preface" title="AntiGravity" subtitle="Interactive Digital Portfolio · Vol. I">
      <div className="flex flex-col items-center justify-center text-center min-h-[42vh] md:min-h-[48vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 0.82, 0.22, 1] }}
        >
          <p className="text-accent font-heading italic text-base md:text-lg mb-4">
            B.Tech IT Student & Frontend Developer
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-4 text-ink uppercase leading-tight">
            Dhinakaran <span className="italic font-normal text-accent font-body lowercase">A</span>
          </h1>
          <div className="ornamental-rule short mx-auto my-6" />
          <p className="text-base md:text-lg text-inkLight max-w-lg mx-auto font-body italic leading-relaxed mb-10">
            A handcrafted digital publication exploring software engineering, full-stack development,
            and AI-powered solutions — page by page.
          </p>

          <button
            type="button"
            onClick={() => navigate('/about')}
            className="book-button"
          >
            Begin Reading
          </button>
        </motion.div>
      </div>
    </BookPage>
  );
}

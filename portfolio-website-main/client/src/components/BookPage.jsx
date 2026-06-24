import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getAdjacentPages, totalPages } from '../config/book';
import ParallaxDecor from './ParallaxDecor';

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 0.82, 0.22, 1], staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.82, 0.22, 1] } },
};

export default function BookPage({
  id,
  chapter,
  title,
  subtitle,
  children,
  className = '',
  pageNumber: customPageNumber,
  showDecor = true,
}) {
  const location = useLocation();
  const { pageNumber } = getAdjacentPages(location.pathname);
  const displayPage = customPageNumber ?? pageNumber;

  return (
    <article
      id={id}
      className={`book-page-viewport relative ${className}`}
      aria-label={title ? `${title} section` : 'Book page'}
    >
      {showDecor && <ParallaxDecor />}

      <motion.div
        className="book-page-inner page-border relative z-10 flex flex-col"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        {(chapter || title) && (
          <motion.header variants={itemVariants} className="book-page-header shrink-0">
            {chapter && (
              <p className="text-accent font-heading italic text-sm tracking-wide mb-1">
                Chapter {chapter}
              </p>
            )}
            {title && (
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink uppercase tracking-widest">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-inkLight font-body italic text-sm md:text-base mt-2">{subtitle}</p>
            )}
            <div className="ornamental-rule mt-4" aria-hidden="true" />
          </motion.header>
        )}

        <motion.div variants={itemVariants} className="book-page-body flex-1 min-h-0">
          {children}
        </motion.div>

        <motion.footer
          variants={itemVariants}
          className="book-page-footer shrink-0 flex items-center justify-between pt-4 mt-4 border-t border-ink/10"
          aria-label="Page number"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-inkLight font-heading">
            AntiGravity
          </span>
          <span className="text-xs font-heading text-inkLight tracking-widest">
            Page {String(displayPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </span>
        </motion.footer>
      </motion.div>
    </article>
  );
}

export { itemVariants, contentVariants };

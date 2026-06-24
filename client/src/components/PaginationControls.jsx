import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAdjacentPages, pages } from '../config/book';

const buttonClass =
  'inline-flex min-w-[5rem] items-center justify-center text-ink hover:text-accent transition-all duration-300 group bg-transparent border-none cursor-pointer uppercase tracking-widest text-[10px] font-heading font-bold hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
const spacerClass = 'inline-block min-w-[5rem]';

export default function PaginationControls({ prev, next, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageNumber } = getAdjacentPages(location.pathname);
  const totalPages = pages.length;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        navigate(typeof prev === 'string' ? prev : prev.path);
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        navigate(typeof next === 'string' ? next : next.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  const prevPath = typeof prev === 'string' ? prev : prev?.path;
  const prevName = typeof prev === 'string' ? 'Back' : prev?.name;
  const nextPath = typeof next === 'string' ? next : next?.path;
  const nextName = typeof next === 'string' ? 'Next' : next?.name;

  return (
    <nav
      aria-label="Page navigation"
      className="book-pagination shrink-0"
    >
      <span className="block text-center text-inkLight font-heading text-[10px] tracking-[0.35em] uppercase mb-3 opacity-80">
        {label ?? `Page ${String(pageNumber).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}`}
      </span>

      <div className="relative flex items-center justify-center gap-4 sm:gap-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-ink/15 -translate-y-1/2" aria-hidden="true" />

        {prevPath ? (
          <button
            type="button"
            onClick={() => navigate(prevPath)}
            className={`${buttonClass} relative z-10 bg-paper px-3`}
            aria-label={`Previous: ${prevName}`}
          >
            <span className="text-lg mr-2 font-normal text-inkLight group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true">
              ←
            </span>
            {prevName}
          </button>
        ) : (
          <span aria-hidden="true" className={`${spacerClass} relative z-10`} />
        )}

        <span className="text-xl leading-none text-accent relative z-10 bg-paper px-2" aria-hidden="true">
          ❧
        </span>

        {nextPath ? (
          <button
            type="button"
            onClick={() => navigate(nextPath)}
            className={`${buttonClass} relative z-10 bg-paper px-3`}
            aria-label={`Next: ${nextName}`}
          >
            {nextName}
            <span className="text-lg ml-2 font-normal text-inkLight group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">
              →
            </span>
          </button>
        ) : (
          <span aria-hidden="true" className={`${spacerClass} relative z-10`} />
        )}
      </div>
    </nav>
  );
}

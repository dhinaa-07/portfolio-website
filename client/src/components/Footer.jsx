import React from 'react';
import { Link } from 'react-router-dom';
import { pages, BOOK_TITLE } from '../config/book';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="book-footer shrink-0 bg-paperDark/80 border-t border-ink/10 relative z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[10px] uppercase tracking-[0.3em] text-inkLight font-heading">
          {BOOK_TITLE} · Vol. I · {currentYear}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {pages.slice(1).map((item) => (
            <Link key={item.path} to={item.path} className="footer-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

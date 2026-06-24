import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { pages, BOOK_TITLE } from '../config/book';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="book-nav fixed top-0 w-full z-50 bg-paper/95 backdrop-blur-sm border-b border-ink/10 shadow-sm" aria-label="Main navigation">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link to="/" className="group" aria-label={`${BOOK_TITLE} home`}>
            <span className="text-lg md:text-xl font-heading font-bold text-ink tracking-widest uppercase">
              Anti<span className="text-accent italic group-hover:opacity-90 transition-opacity">Gravity</span>
            </span>
          </Link>

          <div className="hidden lg:flex gap-1 items-center">
            {pages.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-ink hover:text-accent transition-colors p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-paper border-b border-ink/10 shadow-md">
          <div className="px-4 py-3 flex flex-col gap-1">
            {pages.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `nav-link-mobile ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

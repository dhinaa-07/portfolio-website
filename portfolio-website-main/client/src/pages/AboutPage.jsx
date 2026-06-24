import React from 'react';
import AboutStory from '../components/sections/AboutStory';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';

export default function AboutPage() {
  return (
    <div className="book-spread">
      <AboutStory />
      <PaginationControls prev={pages[0]} next={pages[2]} />
    </div>
  );
}

import React from 'react';
import WorksGallery from '../components/sections/WorksGallery';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';

export default function WorksPage() {
  return (
    <div className="book-spread">
      <WorksGallery />
      <PaginationControls prev={pages[2]} next={pages[4]} />
    </div>
  );
}

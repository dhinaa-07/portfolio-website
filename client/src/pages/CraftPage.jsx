import React from 'react';
import CraftSkills from '../components/sections/CraftSkills';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';

export default function CraftPage() {
  return (
    <div className="book-spread">
      <CraftSkills />
      <PaginationControls prev={pages[3]} next={pages[5]} />
    </div>
  );
}

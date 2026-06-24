import React from 'react';
import Cover from '../components/sections/Cover';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';

export default function Home() {
  return (
    <div className="book-spread">
      <Cover />
      <PaginationControls next={pages[1]} />
    </div>
  );
}

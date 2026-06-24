import React from 'react';
import JourneyTimeline from '../components/sections/JourneyTimeline';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';

export default function JourneyPage() {
  return (
    <div className="book-spread">
      <JourneyTimeline />
      <PaginationControls prev={pages[1]} next={pages[3]} />
    </div>
  );
}

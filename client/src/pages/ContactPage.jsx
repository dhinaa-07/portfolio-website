import React from 'react';
import ContactForm from '../components/sections/ContactForm';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';

export default function ContactPage() {
  return (
    <div className="book-spread">
      <ContactForm />
      <PaginationControls prev={pages[4]} />
    </div>
  );
}

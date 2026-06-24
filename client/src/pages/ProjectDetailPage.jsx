import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectCaseStudy from '../components/sections/ProjectCaseStudy';
import PaginationControls from '../components/PaginationControls';
import { pages } from '../config/book';
import { getProjectNavigation } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { prev, next } = getProjectNavigation(slug);

  const paginationPrev = prev
    ? { path: `/works/${prev.slug}`, name: prev.name }
    : pages[2];
  const paginationNext = next
    ? { path: `/works/${next.slug}`, name: next.name }
    : pages[4];

  return (
    <div className="book-spread">
      <ProjectCaseStudy slug={slug} />
      <PaginationControls
        prev={paginationPrev}
        next={paginationNext}
        label="Chapter III · Case Study"
      />
    </div>
  );
}

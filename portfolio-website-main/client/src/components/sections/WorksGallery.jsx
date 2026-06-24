import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookPage, { itemVariants } from '../BookPage';
import { projects } from '../../data/projects';

export default function WorksGallery() {
  return (
    <BookPage
      id="works"
      chapter="III"
      title="Selected Works"
      subtitle="Premium case studies — each opens as its own chapter"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {projects.map((project, index) => (
          <motion.div key={project.slug} variants={itemVariants}>
            <Link
              to={`/works/${project.slug}`}
              className="book-card group block h-full"
              aria-label={`Open case study: ${project.name}`}
            >
              <div
                className={`h-28 md:h-32 rounded-t-sm bg-gradient-to-br ${project.images[0].gradient} relative overflow-hidden`}
              >
                <span className="absolute top-3 right-3 w-8 h-8 border border-paper/30 bg-paper/10 backdrop-blur-sm flex items-center justify-center font-heading text-paper text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
              </div>
              <div className="p-4 border border-t-0 border-ink/10 bg-paperDark/50 group-hover:bg-paperDark transition-colors duration-300">
                <h3 className="font-heading font-bold text-ink text-base md:text-lg group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-accent italic font-body text-xs mt-1">{project.subtitle}</p>
                <p className="text-inkLight text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-[10px] uppercase tracking-widest font-heading text-inkLight group-hover:text-accent transition-colors">
                  Read Case Study →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </BookPage>
  );
}

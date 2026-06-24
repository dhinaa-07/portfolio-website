import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BookPage, { itemVariants } from '../BookPage';
import { getProjectBySlug, getProjectNavigation } from '../../data/projects';

function ImageGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-ink/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 0.82, 0.22, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${images[active].gradient}`}
            role="img"
            aria-label={images[active].caption}
          />
        </AnimatePresence>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/60 to-transparent p-3">
          <p className="text-paper text-xs font-body italic">{images[active].caption}</p>
        </div>
      </div>

      <div className="flex gap-2" role="tablist" aria-label={`${name} gallery`}>
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={img.caption}
            onClick={() => setActive(i)}
            className={`flex-1 h-12 rounded-sm border transition-all duration-300 bg-gradient-to-br ${img.gradient} ${
              active === i ? 'border-accent ring-1 ring-accent/40 scale-[1.02]' : 'border-ink/10 opacity-70 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CaseStudySection({ title, items }) {
  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-2">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-inkLight text-xs md:text-sm leading-relaxed">
            <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">❧</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ProjectCaseStudy({ slug }) {
  const project = getProjectBySlug(slug);
  const { prev, next } = getProjectNavigation(slug);

  if (!project) {
    return (
      <BookPage chapter="III" title="Not Found" subtitle="This chapter has not been written yet">
        <Link to="/works" className="book-link inline-block">
          Return to Works
        </Link>
      </BookPage>
    );
  }

  return (
    <BookPage
      id={`project-${slug}`}
      chapter="III"
      title={project.name}
      subtitle={project.subtitle}
      showDecor={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-h-[52vh] lg:max-h-none overflow-y-auto lg:overflow-visible custom-scrollbar pr-1">
        <motion.div variants={itemVariants}>
          <ImageGallery images={project.images} name={project.name} />
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-2">Overview</h3>
            <p className="text-inkLight text-xs md:text-sm leading-relaxed">{project.overview}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CaseStudySection title="Challenges" items={project.challenges} />
            <CaseStudySection title="Solutions" items={project.solutions} />
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="skill-tag text-[10px] md:text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {project.outcomes && <CaseStudySection title="Outcomes" items={project.outcomes} />}
        </div>
      </div>

      <nav
        aria-label="Case study navigation"
        className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-ink/10"
      >
        <Link to="/works" className="book-link text-[10px]">
          ← All Works
        </Link>
        <div className="flex gap-4">
          {prev && (
            <Link to={`/works/${prev.slug}`} className="book-link text-[10px]">
              ← {prev.name}
            </Link>
          )}
          {next && (
            <Link to={`/works/${next.slug}`} className="book-link text-[10px]">
              {next.name} →
            </Link>
          )}
        </div>
      </nav>
    </BookPage>
  );
}

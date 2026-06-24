import React from 'react';
import { motion } from 'framer-motion';
import BookPage, { itemVariants } from '../BookPage';

const categories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'JavaScript', level: 92 },
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 78 }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Express.js', level: 85 }
    ]
  },
  {
    title: 'Tools & Cloud',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 70 },
      { name: 'AWS & Vercel', level: 76 }
    ]
  }
];

const achievements = [
  { title: 'PyExpo Hackathon Winner', detail: 'Awarded ₹10,000 prize · Weather application & agri chatbot' },
  { title: 'Science Expo', detail: 'Engineered driving safety device alerting drivers if eyes close' },
];

const certifications = [
  'AWS Essentials — Coursera',
  'Introduction to Linux',
  'Core Java Specialization',
];

const serviceDomains = [
  'Software Engineering',
  'Full-Stack Development',
  'Roadside Systems',
  'Budget Analytics',
  'AI Streaming widgets'
];

const spokenLanguages = [
  'English',
  'Tamil'
];

export default function CraftSkills() {
  return (
    <BookPage
      id="craft"
      chapter="IV"
      title="The Craft"
      subtitle="Skills honed through practice, projects, and competition"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Skills categories */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest border-b border-ink/10 pb-1.5">
            Technical Repertoire
          </h3>
          <div className="space-y-5 max-h-[36vh] lg:max-h-none overflow-y-auto custom-scrollbar pr-1">
            {categories.map((cat) => (
              <div key={cat.title} className="space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-accent">
                  {cat.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-body text-ink">{skill.name}</span>
                        <span className="text-[10px] text-inkLight font-heading">{skill.level}%</span>
                      </div>
                      <div className="skill-bar" role="meter" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 0.82, 0.22, 1], delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Honors and Certifications */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-3">
              Honors
            </h3>
            <ul className="space-y-3">
              {achievements.map((item) => (
                <li key={item.title} className="border-l-2 border-accent pl-3">
                  <p className="font-heading font-bold text-ink text-sm">{item.title}</p>
                  <p className="text-inkLight text-xs mt-0.5">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-3">
              Certifications
            </h3>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-inkLight text-xs">
                  <span className="text-accent" aria-hidden="true">❧</span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-ink/10">
            <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-3">
              Service Domains
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {serviceDomains.map((domain) => (
                <span key={domain} className="text-[10px] px-2 py-0.5 bg-accent/8 text-inkLight border border-accent/5 rounded font-body">
                  {domain}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-ink/10">
            <h3 className="text-sm font-heading font-bold text-ink uppercase tracking-widest mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {spokenLanguages.map((lang) => (
                <span key={lang} className="text-[10px] px-2 py-0.5 bg-accent/8 text-inkLight border border-accent/5 rounded font-body">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </BookPage>
  );
}

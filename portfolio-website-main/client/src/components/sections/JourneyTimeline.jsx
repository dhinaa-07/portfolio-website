import React from 'react';
import { motion } from 'framer-motion';
import BookPage, { itemVariants } from '../BookPage';

const timeline = [
  {
    period: '2023 – Present',
    title: 'Frontend Developer & Market Research Analyst',
    org: 'ResQNow',
    type: 'experience',
    points: [
      'Contributed to the development of the ResQNow roadside assistance platform as a Frontend Developer and Market Research Analyst.',
      'Designed and developed responsive user interfaces using modern web technologies to enhance user experience and accessibility.',
      'Conducted market research and competitor analysis to identify customer needs, industry trends, and business opportunities.',
      'Gathered and analyzed user feedback to recommend product improvements and feature enhancements.',
      'Collaborated with the development team to define user workflows, UI/UX requirements, and frontend implementation strategies.',
      'Assisted in planning product features and customer-focused solutions based on market insights and user requirements.',
      'Supported product growth initiatives through data-driven decision-making and continuous improvement of the platform experience.',
    ],
  },
  {
    period: '2023 – 2027',
    title: 'B.Tech Information Technology',
    org: 'KGISL Institute of Technology CBE',
    type: 'education',
    points: [
      'Specializing in Data Structures, Algorithms, and Web Systems.'
    ]
  },
  {
    period: '07/2021 – 04/2023',
    title: 'Higher Secondary (12th Grade)',
    org: 'SRC Memorial Matric HR Sec School',
    type: 'education',
  },
  {
    period: '06/2020 – 06/2020',
    title: 'SSLC 10th Grade',
    org: 'SRC Memorial Matric HR Sec School',
    type: 'education',
  },
  {
    period: '2024',
    title: 'PyExpo Hackathon Winner',
    org: 'PyExpo',
    type: 'achievement',
    points: [
      'Winner (Awarded ₹10,000 prize)',
      'Developed a weather application and an agri chatbot during the hackathon.'
    ]
  },
  {
    period: '2022',
    title: 'Science Expo',
    org: 'Science Expo',
    type: 'achievement',
    points: [
      'Engineered a driving safety device that emits a loud sound to alert drivers if their eyes close, preventing potential accidents.'
    ]
  },
];

const typeStyles = {
  experience: 'border-accent/40 bg-accent/5',
  education: 'border-ink/15 bg-paperDark',
  achievement: 'border-accent/30 bg-paperDark',
};

export default function JourneyTimeline() {
  return (
    <BookPage
      id="journey"
      chapter="II"
      title="The Journey"
      subtitle="Experience, education, and milestones along the way"
    >
      <div className="relative max-h-[48vh] overflow-y-auto custom-scrollbar pr-2">
        <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-ink/15">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex items-start pl-8 pb-2"
            >
              <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 border-accent bg-paper z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              <div
                className={`w-full p-4 border rounded-sm shadow-sm ${typeStyles[item.type]}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-heading font-bold text-ink text-sm md:text-base">{item.title}</h3>
                  <span className="text-accent italic font-body text-xs whitespace-nowrap">{item.period}</span>
                </div>
                <p className="text-inkLight text-xs uppercase tracking-widest mb-2">{item.org}</p>
                {item.points && (
                  <ul className="list-disc list-inside text-inkLight text-xs md:text-sm space-y-1 marker:text-accent">
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BookPage>
  );
}

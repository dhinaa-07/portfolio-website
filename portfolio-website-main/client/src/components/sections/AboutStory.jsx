import React from 'react';
import { motion } from 'framer-motion';
import BookPage, { itemVariants } from '../BookPage';

export default function AboutStory() {
  return (
    <BookPage
      id="about"
      chapter="I"
      title="The Author"
      subtitle="A story written in code, curiosity, and continuous learning"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-justify">
        <motion.div variants={itemVariants} className="space-y-4">
          <p className="drop-cap text-base md:text-lg leading-relaxed">
            I am a motivated B.Tech Information Technology student driven by a passion for building
            software that solves real problems. My journey began with curiosity about how applications
            work — and evolved into creating them.
          </p>
          <p className="text-inkLight text-sm md:text-base leading-relaxed">
            From hackathon stages to startup initiatives like ResQNow, I have learned to blend
            technical execution with product thinking — designing interfaces that feel intentional
            and engineering systems that scale with purpose.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-inkLight text-sm md:text-base leading-relaxed">
            Recognized for technical excellence through competitive hackathons and application
            development, I bring strong analytical thinking, adaptability, and collaborative energy
            to every project I touch.
          </p>
          <blockquote className="border-l-2 border-accent pl-4 italic text-ink font-body text-sm md:text-base">
            "Technology is most powerful when it feels invisible — when the experience reads as
            naturally as turning a page."
          </blockquote>
        </motion.div>
      </div>

      <div className="ornamental-divider my-6 md:my-8" />
    </BookPage>
  );
}

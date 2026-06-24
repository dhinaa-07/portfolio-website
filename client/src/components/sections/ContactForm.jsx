import React, { useState } from 'react';
import BookPage, { itemVariants } from '../BookPage';
import { motion } from 'framer-motion';
import { API_URL } from '../../config';

export default function ContactForm() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending…');
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message dispatched successfully.');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('Unable to send message. Please try again.');
      }
    } catch {
      setStatus('Connection unavailable. Please try again later.');
    }
  };

  const inputClass =
    'w-full bg-transparent text-ink font-body text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 placeholder-ink/25 rounded-sm';

  return (
    <BookPage
      id="contact"
      chapter="V"
      title="Correspondence"
      subtitle="Open to projects, collaborations, and new chapters"
    >
      <div className="max-w-xl mx-auto">
        <motion.p variants={itemVariants} className="text-inkLight font-body text-center mb-6 text-sm leading-relaxed">
          Whether you have a project in mind or simply wish to connect — I welcome your message.
        </motion.p>

        <motion.form variants={itemVariants} className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                required
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={inputClass}
                placeholder="John"
                autoComplete="given-name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                required
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={inputClass}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              placeholder="john@example.com"
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="Write your missive here…"
            />
          </div>

          {status && (
            <p className="text-center font-heading text-accent italic text-sm" role="status">
              {status}
            </p>
          )}

          <div className="text-center pt-2">
            <button type="submit" className="book-button">
              Dispatch Message
            </button>
          </div>
        </motion.form>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-xs font-heading uppercase tracking-widest"
        >
          <a
            href="https://linkedin.com/in/dhinakaran-a"
            target="_blank"
            rel="noreferrer"
            className="book-social-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/hyper390"
            target="_blank"
            rel="noreferrer"
            className="book-social-link"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </BookPage>
  );
}

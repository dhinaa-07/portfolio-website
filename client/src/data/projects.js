export const projects = [
  {
    slug: 'resqnow',
    name: 'ResQNow',
    subtitle: 'Roadside Assistance Platform & Customer Workflows',
    tagline: 'Connecting drivers with help when every second counts.',
    overview: 'A comprehensive digital roadside assistance platform engineered to provide reliable and quick towing and mechanic booking services. Facilitated client discovery interviews and translated market research into responsive frontend interfaces.',
    challenges: [
      'Defining optimal workflows for stressed users in emergency vehicle situations.',
      'Optimizing the bundle size for low-bandwidth mobile connections.'
    ],
    solutions: [
      'Developed an extremely simple multi-step booking interface using lightweight React hooks and Tailwind CSS.',
      'Analyzed competitor products to shape the strategic features.'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Git'],
    outcomes: [
      'Created streamlined booking workflows, reducing average driver booking times from 5 minutes to 90 seconds.',
      'Built key UI structures approved by stakeholders.'
    ],
    images: [
      { id: 1, gradient: 'from-ink/80 to-accent/60', caption: 'Service request dashboard' },
      { id: 2, gradient: 'from-accent/50 to-ink/70', caption: 'Live assistance tracking flow' },
      { id: 3, gradient: 'from-ink/60 to-paperDark', caption: 'Mobile-first emergency interface' },
    ],
  },
  {
    slug: 'spendo',
    name: 'Spendo',
    subtitle: 'Budget Tracking App & Visual Analytics Engine',
    tagline: 'Personal finance made visible, intentional, and calm.',
    overview: 'A modern, responsive budgeting app designed to help users track transactions, visualize spending patterns through interactive SVG charts, and enforce monthly limits.',
    challenges: [
      'Handling complex client-side transaction filters.',
      'Rendering lightweight graphs that work flawlessly across mobile and desktop viewpoints.'
    ],
    solutions: [
      'Utilized local storage and optimized React hooks for sub-millisecond transaction updates.',
      'Constructed responsive modular SVG graphs representing category budgets.'
    ],
    technologies: ['React', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    outcomes: [
      'Built an intuitive budgeting helper that enables users to manage their cashflow.',
      'Resulted in clean code architecture with reusable analytical components.'
    ],
    images: [
      { id: 1, gradient: 'from-accent/40 to-ink/80', caption: 'Monthly overview dashboard' },
      { id: 2, gradient: 'from-ink/70 to-accent/30', caption: 'Category breakdown view' },
      { id: 3, gradient: 'from-paperDark to-ink/50', caption: 'Quick expense entry screen' },
    ],
  },
  {
    slug: 'ecommerce-engine',
    name: 'eCommerce Engine',
    subtitle: 'Scalable Architecture for High Volume Transactions',
    tagline: 'High-performance transactional backend with sub-200ms latencies.',
    overview: 'A highly resilient e-commerce platform built to manage spikes in concurrent checkouts. Implemented microservice interfaces and real-time product quantities updates.',
    challenges: [
      'Resolving database write deadlocks during high-traffic flash sales.',
      'Optimizing catalog reads for complex category combinations.'
    ],
    solutions: [
      'Integrated a Redis caching layer for quick product retrievals.',
      'Incorporated database connection pooling with optimized write indexes.'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'Redis', 'MongoDB'],
    outcomes: [
      'Accomplished a 400% increase in database concurrent spikes handling capacity.',
      'Reduced page checkout latency to under 200ms.'
    ],
    images: [
      { id: 1, gradient: 'from-ink/80 to-accent/60', caption: 'Catalog read speed stats' },
      { id: 2, gradient: 'from-accent/50 to-ink/70', caption: 'Redis checkout hitrate analytics' },
      { id: 3, gradient: 'from-ink/60 to-paperDark', caption: 'Transactional queue logs' },
    ],
  },
  {
    slug: 'ai-portfolio-assistant',
    name: 'AI Portfolio Assistant',
    subtitle: 'Conversational Digital Tooling for Developers',
    tagline: 'Embedded virtual agent streaming SSE responses.',
    overview: "An advanced digital assistant embedded within this portfolio. Resolves queries about Dhinakaran's credentials, experience, and projects in real-time using GPT-powered chat completion streams.",
    challenges: [
      'Creating a chatbot that streams server-sent events (SSE) while keeping typing animations, voice recognition inputs, and synthesis smooth.'
    ],
    solutions: [
      'Engineered a custom SSE event decoder in the frontend.',
      'A keyword-based fallback engine to maintain conversation flow even during API timeouts.'
    ],
    technologies: ['React', 'TypeScript', 'OpenAI API', 'Framer Motion', 'Tailwind CSS'],
    outcomes: [
      'Increased user retention on the portfolio page by 3 minutes, generating high satisfaction metrics for recruitment queries.'
    ],
    images: [
      { id: 1, gradient: 'from-accent/40 to-ink/80', caption: 'Real-time response stream view' },
      { id: 2, gradient: 'from-ink/70 to-accent/30', caption: 'Speech recognition engine metrics' },
      { id: 3, gradient: 'from-paperDark to-ink/50', caption: 'AI session engagement chart' },
    ],
  },
  {
    slug: 'weather-agri',
    name: 'Agri Weather Suite',
    subtitle: 'PyExpo Hackathon Winner supporting Local Farmers',
    tagline: 'Award-winning tools for farmers and field intelligence.',
    overview: 'An award-winning platform combining meteorology data with agricultural advisory advisory models to help farmers select optimal planting periods and query crop health suggestions.',
    challenges: [
      'Synthesizing disparate API payloads into a single user interface accessible to farmers with varying digital literacy.'
    ],
    solutions: [
      'Engineered a Python-based advisory engine linked with a weather alert system, outputting simplified advisories via a localized chatbot interface.'
    ],
    technologies: ['Python', 'PyExpo API', 'Tailwind CSS', 'API Integration'],
    outcomes: [
      'Won the PyExpo Hackathon with a cash prize of ₹10,000.',
      'Commended for its direct usability and societal impact.'
    ],
    images: [
      { id: 1, gradient: 'from-ink/80 to-accent/60', caption: 'Crop advisory advisor chatbot' },
      { id: 2, gradient: 'from-accent/50 to-ink/70', caption: 'Planting recommendation charts' },
      { id: 3, gradient: 'from-ink/60 to-paperDark', caption: 'Hackathon team victory photo' },
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectNavigation(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
    index,
  };
}

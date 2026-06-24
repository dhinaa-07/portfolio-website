const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// Helper sleep function for local typing streaming
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Load local data
const loadData = () => {
    try {
        const dataPath = path.join(__dirname, '../data');
        const profile = JSON.parse(fs.readFileSync(path.join(dataPath, 'profile.json'), 'utf8'));
        const projects = JSON.parse(fs.readFileSync(path.join(dataPath, 'projects.json'), 'utf8'));
        const experience = JSON.parse(fs.readFileSync(path.join(dataPath, 'experience.json'), 'utf8'));
        const skills = JSON.parse(fs.readFileSync(path.join(dataPath, 'skills.json'), 'utf8'));
        return { profile, projects, experience, skills };
    } catch (err) {
        console.error("Error loading local data:", err);
        return null;
    }
};

const buildContextString = (data) => {
    if (!data) return "No portfolio data available.";
    
    const { profile, projects, experience, skills } = data;
    
    const skillsStr = skills.join(', ');
    const projectsStr = projects.map(p => `${p.name}: ${p.description}`).join(' | ');
    const expStr = experience.map(e => `${e.title} at ${e.company}: ${e.description}`).join(' | ');
    
    return `
About: ${profile.about}
Contact: LinkedIn: ${profile.contact.linkedin}, GitHub: ${profile.contact.github}, Email: ${profile.contact.email}
Skills: ${skillsStr}
Projects: ${projectsStr}
Experience: ${expStr}
    `.trim();
};

router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const openAiKey = process.env.OPENAI_API_KEY;

        // If API key is missing, execute local fallback matching and stream the response
        if (!openAiKey || openAiKey === 'YOUR_OPENAI_API_KEY') {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.flushHeaders();

            const query = message.toLowerCase();
            let answer = "I am Dhina AI, the librarian of this digital portfolio. I am exclusively dedicated to answering questions about Dhinakaran's skills, projects, experience, education, and credentials. Please feel free to ask me about his work!";

            if (query.includes('skill') || query.includes('technolog') || query.includes('know')) {
                answer = `Dhinakaran has a solid technical foundation. Here is his repertoire:
- **Languages**: Python, TypeScript, Java, SQL, JavaScript
- **Frameworks & Libraries**: React.js, Express.js, Node.js, Tailwind CSS, Framer Motion
- **Business & Product**: Go-To-Market (GTM), Product Strategy, Market Research, Business Strategy, SaaS Product Development
- **Workflow & AI**: Claude AI workflows, API Integration, Cross-Functional Collaboration, Customer Discovery & Customer Acquisition, Client Relationship Management
- **Cloud & Databases**: MongoDB, Redis, Git, GitHub, Linux, AWS Essentials

He focuses on building scalable full-stack applications with beautiful, intuitive client layouts and data-driven solutions.`;
            } else if (query.includes('project') || query.includes('work') || query.includes('build')) {
                answer = `Dhinakaran has worked on several interesting projects:
1. **Roadside Assistance Website (ResQNow)**: Designed & developed responsive interfaces, user workflows, and towing/mechanic booking dashboards.
2. **Spendo - Budget Tracking App**: A personal finance manager utilizing local storage and modular SVG analytical graphs.
3. **Agri Weather Suite**: An award-winning weather forecasting and advisory platform for local farmers (won the PyExpo Hackathon).
4. **IoT Driver Safety Device**: An alarm sensor warning driving users whose eyes close to prevent potential accidents (Science Expo).`;
            } else if (query.includes('experience') || query.includes('job') || query.includes('resqnow')) {
                answer = `Dhinakaran's professional highlights:
- **Frontend Developer & Market Research Analyst at ResQNow** (2023 - Present):
  - Contributed to the ResQNow roadside assistance platform.
  - Designed & developed responsive UI using modern web tech for usability & accessibility.
  - Conducted market research & competitor analysis to find user needs & trends.
  - Gathered & analyzed customer feedback for product improvements.
  - Collaborated with development to define workflows, UI/UX, and frontend implementation.
  - Planned features and customer-focused solutions from market insights.
  - Supported growth through data-driven decisions.
- **PyExpo Hackathon Winner** (2024): Awarded ₹10,000 prize for weather/agri advisory crop planning chatbot.
- **Science Expo Participant**: Engineered driving safety device alerting drivers when eyes close.`;
            } else if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('kgisl')) {
                answer = `Dhinakaran's academic journey:
- **B.Tech in Information Technology** at **KGISL Institute of Technology CBE** (2023 – 2027). Focus areas include Data Structures, Algorithms, and Web Systems.
- **Higher Secondary (12th Grade)** at **SRC Memorial Matric HR Sec School** (07/2021 – 04/2023).
- **SSLC (10th Grade)** at **SRC Memorial Matric HR Sec School** (06/2020 – 06/2020).`;
            } else if (query.includes('contact') || query.includes('reach') || query.includes('email') || query.includes('linkedin') || query.includes('github') || query.includes('mail') || query.includes('phone') || query.includes('number') || query.includes('locate') || query.includes('address') || query.includes('live')) {
                answer = `Here are Dhinakaran's contact details:
- **Email**: [dhina06aru@gmail.com](mailto:dhina06aru@gmail.com)
- **Phone**: 7418574633
- **Location**: Erode, Tamil Nadu, IN
- **LinkedIn**: [Dhinakaran A](https://linkedin.com/in/dhinakaran-a)
- **GitHub**: [hyper390](https://github.com/hyper390)
- **Direct Mail**: You can also use the message dispatch form under the Correspondence section of this website.`;
            } else if (query.includes('antigraviti') || query.includes('team') || query.includes('company') || query.includes('author')) {
                answer = `**Antigraviti** is the collaborative development network that Dhinakaran is associated with. The team contains:
- **Elena Rostova**: Founder & CEO (AI systems)
- **Marcus Chen**: Chief Technology Officer (Ex-Google backend architect)
- **Sarah Jenkins**: Head of Design (UI/UX designer)
- **David Okafor**: Lead AI Engineer (Machine learning)

Our client reviews include CTOs of TechNova, InnovateX, and VP of GlobalNet praising the engineering precision.`;
            } else if (query.includes('pyexpo') || query.includes('hackathon') || query.includes('weather') || query.includes('chatbot') || query.includes('prize') || query.includes('award') || query.includes('agri')) {
                answer = `Dhinakaran won the **PyExpo Hackathon** and was awarded a **₹10,000 cash prize**. 

He engineered a weather forecasting application and an agricultural advisory chatbot to assist local farmers in crop planning. It queries weather data to suggest optimal planting periods based on crop cycles.`;
            } else if (query.includes('dhinakaran') || query.includes('who are you') || query.includes('about') || query.includes('hello') || query.includes('hi')) {
                answer = `Dhinakaran is a B.Tech Information Technology student at KGISL Institute of Technology CBE (2023 - 2027). He is a software developer with expertise in Python, SQL, web technologies, and AI integrations.

Ask me about his skills, projects, experience, or certifications, and I'll give you details!`;
            }

            // Slice answer into chunks and stream them to simulate typing
            const chunkSize = 15;
            for (let i = 0; i < answer.length; i += chunkSize) {
                const chunkText = answer.substring(i, i + chunkSize);
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
                await sleep(30); // 30ms sleep for realistic text emission
            }

            res.write(`data: [DONE]\n\n`);
            res.end();
            return;
        }

        const data = loadData();
        const contextString = buildContextString(data);

        const systemPrompt = `You are Dhina AI, the personal AI librarian assistant of Dhinakaran's interactive book portfolio. You MUST ONLY answer questions related to Dhinakaran's portfolio, projects, skills, education, and experience. 
If a user asks a question unrelated to Dhinakaran or his portfolio, politely decline to answer and guide them back to asking about his professional background. Be elegant, concise, and professional, fitting the aesthetic of a classic hardcover book.
        
Knowledge Base:
${contextString}`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...(history || []).map(msg => ({
                role: msg.role === 'ai' ? 'assistant' : 'user',
                content: msg.content
            })),
            { role: 'user', content: message }
        ];

        const openai = new OpenAI({ apiKey: openAiKey });

        // Set up Server-Sent Events headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const stream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
                res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
            }
        }

        res.write(`data: [DONE]\n\n`);
        res.end();

    } catch (err) {
        console.error("Chat route error:", err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.write(`data: ${JSON.stringify({ error: 'Internal server error during generation.' })}\n\n`);
            res.end();
        }
    }
});

module.exports = router;

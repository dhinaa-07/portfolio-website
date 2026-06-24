const mongoose = require('mongoose');
const PortfolioData = require('./models/PortfolioData');

const seedData = [
  // Education
  { type: 'education', data: { degree: 'B.TECH INFORMATION TECHNOLOGY', institution: 'KGISL INSTITUTE OF TECHNOLOGY CBE', period: '2023 – 2027' } },
  { type: 'education', data: { degree: 'Higher Secondary 12th Grade', institution: 'SRC MEMORIAL MATRIC HR SEC SCHOOL', period: '07/2021 – 04/2023' } },
  { type: 'education', data: { degree: 'SSLC 10th Grade', institution: 'SRC MEMORIAL MATRIC HR SEC SCHOOL', period: '06/2020 – 06/2020' } },
  
  // Projects
  { type: 'project', data: { name: 'Roadside Assistance Website', description: 'A platform designed to provide quick and reliable roadside assistance services, featuring responsive UI and streamlined user workflows.' } },
  { type: 'project', data: { name: 'Spendo - Budget Tracking App', description: 'A budget tracking application that helps users manage their finances effectively with intuitive interfaces and data tracking.' } },

  // Skills
  { type: 'skill', data: { name: 'Python' } },
  { type: 'skill', data: { name: 'TypeScript' } },
  { type: 'skill', data: { name: 'Express.js' } },
  { type: 'skill', data: { name: 'Go-To-Market (GTM)' } },
  { type: 'skill', data: { name: 'Java' } },
  { type: 'skill', data: { name: 'React.js' } },
  { type: 'skill', data: { name: 'API Integration' } },
  { type: 'skill', data: { name: 'Cross-Functional Collaboration' } },
  { type: 'skill', data: { name: 'Customer Discovery & Customer Acquisition' } },
  { type: 'skill', data: { name: 'Node.js' } },
  { type: 'skill', data: { name: 'Product Strategy' } },
  { type: 'skill', data: { name: 'Market Research' } },
  { type: 'skill', data: { name: 'Claude AI workflows' } },
  { type: 'skill', data: { name: 'Business Strategy' } },
  { type: 'skill', data: { name: 'Client Relationship Management' } },
  { type: 'skill', data: { name: 'SaaS Product Development' } },
];

mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
.then(async () => {
    console.log("MongoDB Connected for Seeding");
    await PortfolioData.deleteMany({}); // Clear old data
    await PortfolioData.insertMany(seedData);
    console.log("Data Seeded Successfully");
    mongoose.connection.close();
}).catch(err => {
    console.log("MongoDB Connection Error: ", err);
    process.exit(1);
});

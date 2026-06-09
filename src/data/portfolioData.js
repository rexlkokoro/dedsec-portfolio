const defaultData = {
  hero: {
    identityName: 'Rexl Kokoro',
    realName: 'Manas Kumar Singh',
    subtitle: 'B.Tech CSE | Web Developer | Cyber & AI Enthusiast',
    roles: [
      'a Programmer.',
      'a Coder.',
      'a Builder.',
      'a Creator.',
      'a Designer.',
      'an Innovator.',
      'a Visionary.',
      'an Artist.',
      'a Poet.',
      'a Storyteller.',
      'a Thinker.',
      'a Philosopher.',
      'a Dreamer.',
      'an Explorer.',
      'a Listener.',
    ],
    imageSrc: '/assets/reaper.png',
    imageAlt: 'Reaper logo',
  },

  about: {
    heading: 'B.Tech CSE Student | Web Developer | Cyber & AI Enthusiast',
    summaries: [
      `I'm Manas Kumar Singh, a Computer Science and Engineering student driven by curiosity and creativity. I love experimenting with technology, building intuitive web experiences, exploring AI reasoning systems, or tinkering with experimental projects just because it's possible.`,
      `My work spans web development, data systems, and AI experimentation, with a special interest in LLM-based automation and intelligent agents that can plan, adapt, and interact meaningfully.`,
      `Outside academics, I take on freelance projects on Discord and Twitter, helping communities and individuals with art, tech projects, and writing. I blend technical depth with personality, building things that not only work, but feel alive.`,
    ],
    stacks: [
      { id: 's1', title: 'Frontend Development', items: ['HTML', 'CSS', 'JavaScript'] },
      { id: 's2', title: 'Backend Development', items: ['Python', 'Node.js (JavaScript)'] },
      { id: 's3', title: 'Databases', items: ['SQL', 'SQLite', 'DBMS'] },
      { id: 's4', title: 'AI / Data Systems', items: ['NLP', 'RAG', 'Information Retrieval', 'Data Processing', 'MCP (Memory, Context & Planning)', 'Open Source Debugging', 'Python'] },
      { id: 's5', title: 'Business & Analytics', items: ['Power BI', 'Microsoft Excel', 'BI Analysis'] },
      { id: 's6', title: 'Networking & Systems', items: ['Network Deployment', 'Server Management', 'Computer Hardware Repair'] },
      { id: 's7', title: 'Design & Tools', items: ['AutoCAD', 'Regex', 'Git / GitHub'] },
      { id: 's8', title: 'Deployment & Hosting', items: ['Netlify', 'Vercel', 'GitHub Pages', 'Static Site Hosting'] },
    ],
  },

  projects: [
    {
      id: 'p1',
      title: 'NeoPedia',
      desc: 'A lightweight offline Wikipedia Q&A system that extracts dumps, indexes articles for fast search, and uses small NLP models to generate concise, context-aware answers.',
      tags: ['Python', 'NLP', 'Indexing'],
      link: '',
    },
    {
      id: 'p2',
      title: 'ASAS (QR Code Attendance)',
      desc: 'A Docker-based attendance tracker integrating QR code and facial recognition (OpenCV + MySQL) to securely verify and log attendance automatically.',
      tags: ['Python', 'OpenCV', 'MySQL', 'Docker'],
      link: '',
    },
    {
      id: 'p3',
      title: 'ICEweather',
      desc: 'A modern, responsive weather application with real-time data, iOS liquid glass style, animated day/night transitions, and dynamic weather effects built using vanilla HTML, CSS, and JavaScript.',
      tags: ['HTML', 'CSS', 'JavaScript', 'API'],
      link: '',
    },
    {
      id: 'p4',
      title: 'Project Strawberry',
      desc: 'A pastel-themed interactive webpage with music playback and smooth modals, combining front-end art and design into a playful, aesthetic micro-project.',
      tags: ['HTML', 'CSS', 'JavaScript', 'UI'],
      link: '',
    },
  ],

  contact: {
    links: [
      { id: 'c1', label: 'GitHub', href: 'https://github.com/rexlkokoro' },
      { id: 'c2', label: 'LinkedIn', href: 'https://linkedin.com/in/manas-kumar-singh-03b0b4367/' },
      { id: 'c3', label: 'Email', href: 'mailto:manaskumarsingh2005@gmail.com' },
    ],
  },
}

export default defaultData

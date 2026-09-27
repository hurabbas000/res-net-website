export interface Program {
  slug: string;
  title: string;
  shortDesc: string;
  duration: string;
  level: string;
  icon: string;
  description: string;
  curriculum: string[];
  outcomes: string[];
  color: 'navy' | 'brand' | 'accent';
}

export const programs: Program[] = [
  {
    slug: 'foundations',
    title: 'Research Foundations Workshop',
    shortDesc: 'Build a strong foundation in medical research through practical learning.',
    duration: '4 weeks',
    level: 'Beginner',
    icon: 'Compass',
    description:
      'A structured, hands-on introduction to medical research methodology. You will move from curiosity to a well-formed research question, understand study designs, and read literature with confidence. No prior research experience required.',
    curriculum: [
      'What is research? The scientific method in medicine',
      'Formulating a research question using PICO',
      'Understanding study designs: observational vs experimental',
      'Searching PubMed and building a search strategy',
      'Critical appraisal of published papers',
      'Research ethics and informed consent basics',
      'Writing a research protocol',
    ],
    outcomes: [
      'Frame a clear, answerable research question using PICO',
      'Identify the right study design for your question',
      'Search PubMed efficiently and build a reproducible search strategy',
      'Critically appraise a published paper',
      'Draft a simple research protocol',
    ],
    color: 'navy',
  },
  {
    slug: 'ai-research',
    title: 'AI in Medical Research',
    shortDesc: 'Learn to use AI responsibly throughout the research workflow.',
    duration: '6 weeks',
    level: 'Intermediate',
    icon: 'BrainCircuit',
    description:
      'AI is transforming how research is conducted. This program teaches you to use AI tools ethically and effectively — from accelerating literature reviews to cleaning data and drafting manuscripts. You will learn what AI can do, what it cannot, and how to stay academically honest.',
    curriculum: [
      'The AI landscape for medical research',
      'Prompt engineering for literature discovery',
      'Using AI for data cleaning and exploratory analysis',
      'AI-assisted writing: drafting, not authoring',
      'Plagiarism, authorship, and AI disclosure guidelines',
      'Tools: ChatGPT, Elicit, Consensus, Rayyan',
      'Hands-on project: AI-assisted rapid review',
    ],
    outcomes: [
      'Write effective prompts for research tasks',
      'Use AI tools to accelerate literature screening',
      'Apply AI for data cleaning and basic analysis',
      'Understand ethical boundaries and disclosure norms',
      'Complete an AI-assisted rapid review project',
    ],
    color: 'brand',
  },
  {
    slug: 'bootcamp',
    title: 'Original Research Bootcamp',
    shortDesc: 'Design, conduct, and publish your own original research project.',
    duration: '12 weeks',
    level: 'Intermediate',
    icon: 'Rocket',
    description:
      'Our flagship program. You will design and conduct an original research study — from protocol to manuscript. Each cohort is paired with a mentor who guides you through data collection, analysis, and writing. By the end, you will have a manuscript ready for submission.',
    curriculum: [
      'Refining your research question and protocol',
      'Sample size calculation and sampling methods',
      'Data collection tools and REDCap',
      'Statistical analysis with SPSS / R',
      'Results interpretation and visualization',
      'Manuscript writing: IMRaD structure',
      'Choosing a journal and submission process',
      'Peer review and responding to reviewers',
    ],
    outcomes: [
      'Design and execute an original research study',
      'Collect and manage data using REDCap',
      'Perform statistical analysis using SPSS or R',
      'Write a complete manuscript in IMRaD format',
      'Navigate the journal submission process',
    ],
    color: 'accent',
  },
  {
    slug: 'systematic-review',
    title: 'Systematic Review & Meta-analysis Masterclass',
    shortDesc: 'Master evidence synthesis using internationally accepted methodologies.',
    duration: '8 weeks',
    level: 'Advanced',
    icon: 'Layers',
    description:
      'Systematic reviews are the highest level of evidence. This masterclass takes you through the entire process — from registration on PROSPERO to meta-analysis in RevMan. You will produce a review protocol ready for registration and execution.',
    curriculum: [
      'Introduction to evidence synthesis',
      'Protocol development and PROSPERO registration',
      'Comprehensive search strategy across databases',
      'Screening with Rayyan and Covidence',
      'Risk of bias assessment (RoB 2, ROBINS-I)',
      'Data extraction and synthesis',
      'Meta-analysis with RevMan: forest plots and heterogeneity',
      'PRISMA reporting and GRADE assessment',
    ],
    outcomes: [
      'Develop a systematic review protocol',
      'Register your protocol on PROSPERO',
      'Conduct screening and risk of bias assessment',
      'Perform a meta-analysis in RevMan',
      'Report findings following PRISMA guidelines',
    ],
    color: 'navy',
  },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: ' Jari Haider',
    role: '1st Year MBBS, Sindh Medical College',
    quote:
      "The session was a great starting point for me to learn about research from the basics. It helped me understand the research process and improve my approach to academic writing. I’m looking forward to more sessions from Res.Net in the future.",
    initials: 'JH',
  },
  {
    name: 'Wajahat Abbas',
    role: '1st Year MBBS, Karachi Medical & Dental College',
    quote:
      "It was a great experience attending the workshop. I learned a lot about the purpose of research and the basics of Letter to the Editor. It was very helpful, and I look forward to taking future workshops like this.",
    initials: 'WA',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFAQs: FAQItem[] = [
  {
    question: 'Who should enroll in Res.Net programs?',
    answer: 'Our programs are designed for medical students, interns, residents, and early-career researchers looking to build practical research skills.',
  },
  {
    question: 'What makes Res.Net different from other research workshops?',
    answer: 'Res.Net goes beyond lectures by combining structured learning, hands-on projects, expert mentorship, and a collaborative research community.',
  },
  {
    question: 'What skills will I gain during the program?',
    answer: 'Depending on the program, you will develop skills in research methodology, literature review, study design, data analysis, scientific writing, AI-assisted research, and publication practices.',
  },
  {
    question: 'Will I receive a certificate and publication support?',
    answer: 'Yes. Participants who successfully complete program requirements receive a certificate, and selected programs provide guidance toward publication-ready research.',
  },
  {
    question: 'How do I enroll in a workshop?',
    answer: 'Visit the Programs page, choose the workshop that matches your goals, and complete the online registration process.',
  },
  {
    question: 'Can I join the Res.Net team?',
    answer: 'Yes. We periodically welcome passionate medical students and researchers to join our growing team. Visit the Team page or Contact Us to learn about current opportunities.',
  },
];

export const workshopFAQs: FAQItem[] = [
  {
    question: 'How do I register for a program?',
    answer:
      'Click "Register Interest" on any program card. You will be asked for your name, email, and which cohort you prefer. We will follow up with enrollment details and payment options.',
  },
  {
    question: 'Can I take multiple programs at once?',
    answer:
      'We recommend starting with one program at a time, especially if you are new to research. However, the AI in Medical Research program pairs well with either the Bootcamp or the Systematic Review Masterclass.',
  },
  {
    question: 'What software or tools do I need?',
    answer:
      'You need a computer with internet access. Specific tools vary by program — PubMed (free), Rayyan (free), SPSS or R, and RevMan (free). We provide guidance on installing everything before each program begins.',
  },
  {
    question: 'Is there a refund policy?',
    answer:
      'Yes. If you withdraw before the second session, you receive a full refund. After the second session, refunds are pro-rated based on sessions completed.',
  },
];

export interface ResourceItem {
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const resources: ResourceItem[] = [
  { title: 'Research Roadmap', description: 'A visual guide from idea to publication.', icon: 'Map', category: 'Getting Started' },
  { title: 'Research Checklist', description: 'Essential steps before starting any study.', icon: 'CheckSquare', category: 'Getting Started' },
  { title: 'PICO Builder', description: 'Frame your research question the right way.', icon: 'HelpCircle', category: 'Getting Started' },
  { title: 'PRISMA Checklist', description: 'Report your systematic review correctly.', icon: 'ListChecks', category: 'Review' },
  { title: 'PubMed Guide', description: 'Master literature search in 10 steps.', icon: 'Search', category: 'Literature' },
  { title: 'Search Strategy Template', description: 'Document your search for reproducibility.', icon: 'Filter', category: 'Literature' },
  { title: 'Data Extraction Sheet', description: 'Structured template for extracting study data.', icon: 'Table', category: 'Data' },
  { title: 'Protocol Template', description: 'Start your research protocol with structure.', icon: 'FileText', category: 'Getting Started' },
  { title: 'Reference Management Guide', description: 'Zotero, Mendeley, and EndNote compared.', icon: 'BookMarked', category: 'Writing' },
  { title: 'Journal Selection Guide', description: 'Find the right journal for your manuscript.', icon: 'Target', category: 'Publishing' },
  { title: 'AI Prompt Library', description: 'Ready-to-use prompts for research tasks.', icon: 'Sparkles', category: 'AI' },
  { title: 'Scientific Writing Templates', description: 'IMRaD templates for your manuscript.', icon: 'PenLine', category: 'Writing' },
];

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export const coreValues: CoreValue[] = [
  {
    title: 'Excellence',
    description: 'We hold our teaching, mentorship, and your work to the highest academic standards.',
    icon: 'Award',
  },
  {
    title: 'Integrity',
    description: 'Honesty in research is non-negotiable. We teach ethical practice from day one.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Innovation',
    description: 'We embrace new tools, including AI, while staying grounded in scientific rigor.',
    icon: 'Lightbulb',
  },
  {
    title: 'Collaboration',
    description: 'Research is a team sport. We connect students across institutions and disciplines.',
    icon: 'Users',
  },
  {
    title: 'Accessibility',
    description: 'Quality research education should not be locked behind expensive degrees.',
    icon: 'DoorOpen',
  },
];

export interface RoadmapStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const roadmapSteps: RoadmapStep[] = [
  { step: '01', title: 'Student', description: 'You start with curiosity and a desire to contribute to science.', icon: 'GraduationCap' },
  { step: '02', title: 'Research Foundations', description: 'Learn the language of research — questions, designs, and literature.', icon: 'Compass' },
  { step: '03', title: 'AI in Medical Research', description: 'Leverage AI tools to accelerate your review and analysis.', icon: 'BrainCircuit' },
  { step: '04', title: 'Original Research Bootcamp', description: 'Conduct your own study with mentorship end-to-end.', icon: 'Rocket' },
  { step: '05', title: 'Systematic Review & Meta-analysis', description: 'Synthesize evidence at the highest methodological standard.', icon: 'Layers' },
  { step: '06', title: 'Publication', description: 'Submit your manuscript and respond to reviewers with confidence.', icon: 'FileText' },
];

export interface EventItem {
  title: string;
  date: string;
  time: string;
  format: 'Online' | 'In-Person';
  location?: string;
  description: string;
  icon: string;
  recurring?: boolean;
}

// Placeholder events — edit dates/details to match what's actually scheduled.
export const events: EventItem[] = [
  {
    title: 'Research Foundations Workshop — New Cohort Kickoff',
    date: 'Oct 18, 2026',
    time: '6:00 PM PKT',
    format: 'Online',
    description:
      'Join the opening session of our next Research Foundations cohort and meet your fellow researchers before the program begins.',
    icon: 'Compass',
  },
  {
    title: 'AI in Medical Research — Live Info Session',
    date: 'Oct 25, 2026',
    time: '7:00 PM PKT',
    format: 'Online',
    description:
      'A free live walkthrough of the AI in Medical Research curriculum, with time for Q&A before registration opens.',
    icon: 'BrainCircuit',
  },
  {
    title: 'Monthly Journal Club',
    date: 'Every Last Friday',
    time: '8:00 PM PKT',
    format: 'Online',
    description:
      'A facilitator walks through a landmark paper for an hour of critical appraisal and open discussion — open to all Res.Net members.',
    icon: 'BookOpen',
    recurring: true,
  },
  {
    title: 'Community Meetup',
    date: 'Every Second Saturday',
    time: '5:00 PM PKT',
    format: 'Online',
    description:
      'An informal monthly gathering to share progress, get peer feedback on your research, and network with other students.',
    icon: 'Users',
    recurring: true,
  },
];

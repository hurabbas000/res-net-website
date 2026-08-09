import { useState, useEffect } from 'react';
import { BookOpen, BrainCircuit, FlaskConical, FileText } from 'lucide-react';

const workshops = [
  {
    id: 'foundations',
    title: 'Research Foundations Workshop',
    icon: BookOpen,
    level: 'Beginner',
    students: 234,
    rating: 4.9,
    outcomes: [
      'Study Designs',
      'Literature Search',
      'Letter to the Editor',
      'Journal Guidelines',
    ],
  },
  {
    id: 'ai-research',
    title: 'AI in Medical Research',
    icon: BrainCircuit,
    level: 'Intermediate',
    students: 156,
    rating: 4.8,
    outcomes: [
      'AI for Literature Review',
      'AI for Data Analysis',
      'AI for Scientific Writing',
      'Prompt Engineering',
    ],
  },
  {
    id: 'bootcamp',
    title: 'Original Research Bootcamp',
    icon: FlaskConical,
    level: 'Intermediate',
    students: 89,
    rating: 4.9,
    outcomes: [
      'Study Design',
      'Data Collection',
      'Statistical Analysis',
      'Manuscript Writing',
    ],
  },
  {
    id: 'systematic',
    title: 'Systematic Review & Meta-analysis Masterclass',
    icon: FileText,
    level: 'Advanced',
    students: 67,
    rating: 5.0,
    outcomes: [
      'Literature Screening',
      'Risk of Bias Assessment',
      'Meta-analysis',
      'Publication & Reporting',
    ],
  },
];

export function PlatformPreview() {
  const [activeWorkshop, setActiveWorkshop] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkshop((prev) => (prev + 1) % workshops.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const workshop = workshops[activeWorkshop];
  const Icon = workshop.icon;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Workshop Card */}
      <div
        className={`p-5 rounded-3xl border-2 transition-all duration-500 transform hover:scale-[1.02] h-[250px] w-full flex flex-col ${
          'bg-white dark:bg-navy-700 border-brand-200 dark:border-brand-700 shadow-xl shadow-brand-500/10'
        }`}
      >
        {/* Header with Icon and Title */}
        <div className="flex items-start gap-3 mb-3 flex-shrink-0">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/50 dark:to-brand-800/50 flex items-center justify-center shadow-lg flex-shrink-0">
            <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              {workshop.level}
            </span>
            <h4 className="font-heading font-bold text-lg text-navy-700 dark:text-white leading-tight h-[2.5rem] overflow-hidden">
              {workshop.title}
            </h4>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-1 mb-3 flex-1">
          {workshop.outcomes.map((outcome, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-brand-500 text-xs">✓</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {outcome}
              </span>
            </div>
          ))}
        </div>

        {/* Coming Soon Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-yellow-500 text-xs">🟡</span>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
            Coming Soon
          </span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-3 mt-4">
        {workshops.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveWorkshop(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === activeWorkshop ? 'w-8 bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg shadow-brand-500/30' : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

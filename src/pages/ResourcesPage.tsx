import { useState } from 'react';
import {
  Map,
  CheckSquare,
  HelpCircle,
  ListChecks,
  Search,
  Filter,
  Table,
  FileText,
  BookMarked,
  Target,
  Sparkles,
  PenLine,
  Download,
  type LucideIcon,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Accordion';
import { resources } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  Map,
  CheckSquare,
  HelpCircle,
  ListChecks,
  Search,
  Filter,
  Table,
  FileText,
  BookMarked,
  Target,
  Sparkles,
  PenLine,
};

const categories = ['All', 'Getting Started', 'Literature', 'Review', 'Data', 'Writing', 'Publishing', 'AI'];

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  const handleDownload = (title: string) => {
    const blob = new Blob(
      [`Res.Net — ${title}\n\nThis is a placeholder download for the "${title}" resource.\nReplace this with the actual file when available.`],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="Resources — Research Network (Res.Net)"
        description="Free research resources for medical students: research roadmap, PICO builder, PRISMA checklist, PubMed guide, AI prompt library, and more."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-heading font-semibold tracking-wider uppercase text-brand-500 mb-3">
            Resources
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-700 dark:text-white leading-tight text-balance">
            Your Research Toolkit
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Free, downloadable resources to support your research journey. Templates, checklists,
            and guides — all designed for medical students.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-navy-700 text-white'
                    : 'bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-gray-300 hover:bg-navy-100 dark:hover:bg-navy-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource, i) => {
              const Icon = iconMap[resource.icon] || FileText;
              return (
                <Card key={`${resource.title}-${i}`} hover className="p-6 flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-brand-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-navy-400 dark:text-gray-400 uppercase tracking-wider">
                        {resource.category}
                      </span>
                      <h3 className="font-heading font-semibold text-navy-700 dark:text-white mt-0.5">
                        {resource.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                    {resource.description}
                  </p>
                  <button
                    onClick={() => handleDownload(resource.title)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-brand-400 hover:text-navy-700 dark:hover:text-brand-300 transition-colors self-start"
                  >
                    <Download className="h-4 w-4" /> Download
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-10 bg-gradient-to-br from-navy-50 to-brand-50 dark:from-navy-800 dark:to-navy-700">
            <h2 className="font-heading font-bold text-2xl text-navy-700 dark:text-white">
              Want More Resources?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Our Workshop programs include comprehensive resource packs, templates, and datasets.
              Enroll to unlock the full library.
            </p>
            <div className="mt-6">
              <a
                href="#/academy"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 transition-all"
              >
                Explore Workshops Programs
              </a>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

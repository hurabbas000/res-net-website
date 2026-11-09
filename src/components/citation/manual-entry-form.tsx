import { useState } from 'react';
import { SourceMetadata, Author, SourceType } from '@/types/citation';

type CitationStyle = 'ama' | 'vancouver' | 'apa' | 'harvard' | 'mla' | 'chicago' | 'ieee';

const fieldClassName =
  'w-full rounded-lg px-3 py-2 border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-navy-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none text-sm';
const labelClassName = 'block text-sm font-medium text-navy-700 dark:text-gray-200 mb-2';

interface ManualEntryFormProps {
  onCitationGenerated: (metadata: SourceMetadata) => void;
  onCancel: () => void;
}

export default function ManualEntryForm({ onCitationGenerated, onCancel }: ManualEntryFormProps) {
  const [sourceType, setSourceType] = useState<SourceType>('journal-article');
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('ama');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState<Author[]>([{ lastName: '', firstName: '' }]);
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddAuthor = () => {
    setAuthors([...authors, { lastName: '', firstName: '' }]);
  };

  const handleRemoveAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = { ...updatedAuthors[index], [field]: value };
    setAuthors(updatedAuthors);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!journal.trim()) {
      newErrors.journal = 'Journal is required';
    }

    if (!year.trim()) {
      newErrors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = 'Year must be a 4-digit number';
    }

    const validAuthors = authors.filter(a => a.lastName || a.firstName);
    if (validAuthors.length === 0) {
      newErrors.authors = 'At least one author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validateForm()) {
      return;
    }

    const metadata: SourceMetadata = {
      sourceType,
      title: title.trim(),
      authors: authors.filter(a => a.lastName || a.firstName),
      journal: journal.trim(),
      year: year ? parseInt(year) : undefined,
      volume: volume.trim() || undefined,
      issue: issue.trim() || undefined,
      pages: pages.trim() || undefined,
      doi: doi.trim() || undefined,
      url: url.trim() || undefined,
    };

    onCitationGenerated(metadata);
  };

  return (
    <div className="mt-6 rounded-xl bg-navy-50 dark:bg-navy-900/50 border border-navy-100 dark:border-navy-700 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-semibold text-navy-700 dark:text-white">Manual Citation Entry</h3>
        <button
          onClick={onCancel}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-navy-700 dark:hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-6">
        {/* Source Type Selector */}
        <div>
          <label className={labelClassName}>Source Type</label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value as SourceType)}
            className={fieldClassName}
          >
            <option value="journal-article">Journal Article</option>
            <option value="website">Content-1 Website</option>
            <option value="book">Book</option>
            <option value="book-chapter">Book Chapter</option>
            <option value="report">Report</option>
            <option value="conference-paper">Conference Paper</option>
            <option value="thesis">Thesis/Dissertation</option>
            <option value="preprint">Preprint</option>
          </select>
        </div>

        {/* Citation Style Selector */}
        <div>
          <label className={labelClassName}>Citation Style</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCitationStyle('ama')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'ama'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              AMA
            </button>
            <button
              onClick={() => setCitationStyle('vancouver')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'vancouver'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              Vancouver
            </button>
            <button
              onClick={() => setCitationStyle('apa')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'apa'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              APA 7
            </button>
            <button
              onClick={() => setCitationStyle('harvard')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'harvard'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              Harvard
            </button>
            <button
              onClick={() => setCitationStyle('mla')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'mla'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              MLA 9
            </button>
            <button
              onClick={() => setCitationStyle('chicago')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'chicago'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              Chicago
            </button>
            <button
              onClick={() => setCitationStyle('ieee')}
              className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
                citationStyle === 'ieee'
                  ? 'bg-navy-700 text-white'
                  : 'rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              IEEE
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className={labelClassName}>
            Title <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${fieldClassName} ${
              errors.title ? 'border-red-500 dark:border-red-500' : ''
            }`}
            placeholder="Article title"
          />
          {errors.title && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.title}</p>}
        </div>

        {/* Authors */}
        <div>
          <label className={labelClassName}>
            Authors <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {authors.map((author, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Last name"
                    value={author.lastName || ''}
                    onChange={(e) => handleAuthorChange(index, 'lastName', e.target.value)}
                    className={fieldClassName}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="First name"
                    value={author.firstName || ''}
                    onChange={(e) => handleAuthorChange(index, 'firstName', e.target.value)}
                    className={fieldClassName}
                  />
                </div>
                {authors.length > 1 && (
                  <button
                    onClick={() => handleRemoveAuthor(index)}
                    className="rounded-lg px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddAuthor}
              className="text-sm text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 font-medium"
            >
              + Add Author
            </button>
          </div>
          {errors.authors && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.authors}</p>}
        </div>

        {/* Journal */}
        <div>
          <label className={labelClassName}>
            Journal <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input
            type="text"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className={`${fieldClassName} ${
              errors.journal ? 'border-red-500 dark:border-red-500' : ''
            }`}
            placeholder="Journal name"
          />
          {errors.journal && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.journal}</p>}
        </div>

        {/* Year */}
        <div>
          <label className={labelClassName}>
            Year <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`${fieldClassName} ${
              errors.year ? 'border-red-500 dark:border-red-500' : ''
            }`}
            placeholder="2020"
          />
          {errors.year && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.year}</p>}
        </div>

        {/* Volume and Issue */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClassName}>Volume</label>
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className={fieldClassName}
              placeholder="10"
            />
          </div>
          <div>
            <label className={labelClassName}>Issue</label>
            <input
              type="text"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className={fieldClassName}
              placeholder="2"
            />
          </div>
        </div>

        {/* Pages */}
        <div>
          <label className={labelClassName}>Pages</label>
          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className={fieldClassName}
            placeholder="123-145"
          />
        </div>

        {/* DOI */}
        <div>
          <label className={labelClassName}>DOI</label>
          <input
            type="text"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            className={fieldClassName}
            placeholder="10.1234/example"
          />
        </div>

        {/* URL */}
        <div>
          <label className={labelClassName}>URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={fieldClassName}
            placeholder="https://example.com"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full rounded-xl px-8 py-3 bg-navy-700 text-white font-heading font-semibold hover:bg-navy-600 transition-colors"
        >
          Generate Citation
        </button>
      </div>
    </div>
  );
}

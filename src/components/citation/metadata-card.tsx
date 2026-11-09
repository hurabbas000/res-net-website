import { useState } from 'react';
import { SourceMetadata, Author } from '@/types/citation';
import { formatAMACitation } from '@/lib/formatters/ama-formatter';
import { formatVancouverCitation } from '@/lib/formatters/vancouver-formatter';
import { formatAPACitation } from '@/lib/formatters/apa-formatter';
import { formatHarvardCitation } from '@/lib/formatters/harvard-formatter';
import { formatMLACitation } from '@/lib/formatters/mla-formatter';
import { formatChicagoCitation } from '@/lib/formatters/chicago-formatter';
import { formatIEEECitation } from '@/lib/formatters/ieee-formatter';

type CitationStyle = 'ama' | 'vancouver' | 'apa' | 'harvard' | 'mla' | 'chicago' | 'ieee';

const fieldClassName =
  'w-full rounded-lg px-3 py-2 border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-navy-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none text-sm';

interface MetadataCardProps {
  metadata: SourceMetadata;
  onUpdate: (updatedMetadata: SourceMetadata) => void;
  onAddToReferenceList?: () => void;
}

export default function MetadataCard({ metadata, onUpdate, onAddToReferenceList }: MetadataCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMetadata, setEditedMetadata] = useState<SourceMetadata>({ ...metadata });
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('ama');
  const [copiedReference, setCopiedReference] = useState(false);
  const [copiedInText, setCopiedInText] = useState(false);

  const handleEdit = () => {
    setEditedMetadata({ ...metadata });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    onUpdate(editedMetadata);
    setIsEditing(false);
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    const updatedAuthors = [...(editedMetadata.authors || [])];
    updatedAuthors[index] = { ...updatedAuthors[index], [field]: value };
    setEditedMetadata({ ...editedMetadata, authors: updatedAuthors });
  };

  const handleAddAuthor = () => {
    const updatedAuthors = [...(editedMetadata.authors || []), { lastName: '', firstName: '' }];
    setEditedMetadata({ ...editedMetadata, authors: updatedAuthors });
  };

  const handleRemoveAuthor = (index: number) => {
    const updatedAuthors = editedMetadata.authors?.filter((_, i) => i !== index);
    setEditedMetadata({ ...editedMetadata, authors: updatedAuthors });
  };

  const handleFieldChange = (field: keyof SourceMetadata, value: string | number | undefined) => {
    setEditedMetadata({ ...editedMetadata, [field]: value });
  };

  const handleStyleChange = (style: CitationStyle) => {
    setCitationStyle(style);
  };

  const formatCitation = () => {
    switch (citationStyle) {
      case 'ama':
        return formatAMACitation(metadata);
      case 'vancouver':
        return formatVancouverCitation(metadata);
      case 'apa':
        return formatAPACitation(metadata);
      case 'harvard':
        return formatHarvardCitation(metadata);
      case 'mla':
        return formatMLACitation(metadata);
      case 'chicago':
        return formatChicagoCitation(metadata);
      case 'ieee':
        return formatIEEECitation(metadata);
      default:
        return formatAMACitation(metadata);
    }
  };

  const handleCopyReference = async () => {
    try {
      const citation = formatCitation();
      await navigator.clipboard.writeText(citation.reference);
      setCopiedReference(true);
      setTimeout(() => setCopiedReference(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers or permission errors
      const citation = formatCitation();
      const textArea = document.createElement('textarea');
      textArea.value = citation.reference;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedReference(true);
        setTimeout(() => setCopiedReference(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyInText = async () => {
    try {
      const citation = formatCitation();
      await navigator.clipboard.writeText(citation.inText);
      setCopiedInText(true);
      setTimeout(() => setCopiedInText(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers or permission errors
      const citation = formatCitation();
      const textArea = document.createElement('textarea');
      textArea.value = citation.inText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedInText(true);
        setTimeout(() => setCopiedInText(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  const citation = formatCitation();

  if (isEditing) {
    return (
      <div className="mt-6 min-w-0 rounded-2xl p-5 sm:p-6 bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-heading text-lg font-semibold text-navy-700 dark:text-white">Edit Source Details</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-navy-700 dark:hover:text-white border border-navy-200 dark:border-navy-600 hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg px-4 py-2 text-sm font-heading font-semibold text-white bg-navy-700 hover:bg-navy-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Title</label>
            <input
              type="text"
              value={editedMetadata.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Authors</label>
            <div className="space-y-2">
              {editedMetadata.authors?.map((author, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start">
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
                  <button
                    onClick={() => handleRemoveAuthor(index)}
                    className="rounded-lg px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddAuthor}
                className="text-sm text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 font-medium"
              >
                + Add Author
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Journal</label>
            <input
              type="text"
              value={editedMetadata.journal || ''}
              onChange={(e) => handleFieldChange('journal', e.target.value)}
              className={fieldClassName}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Publication Year</label>
              <input
                type="text"
                value={editedMetadata.year || ''}
                onChange={(e) => handleFieldChange('year', e.target.value ? parseInt(e.target.value) : undefined)}
                className={fieldClassName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Volume</label>
              <input
                type="text"
                value={editedMetadata.volume || ''}
                onChange={(e) => handleFieldChange('volume', e.target.value)}
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Issue</label>
              <input
                type="text"
                value={editedMetadata.issue || ''}
                onChange={(e) => handleFieldChange('issue', e.target.value)}
                className={fieldClassName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">Pages</label>
              <input
                type="text"
                value={editedMetadata.pages || ''}
                onChange={(e) => handleFieldChange('pages', e.target.value)}
                className={fieldClassName}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">DOI</label>
            <input
              type="text"
              value={editedMetadata.doi || ''}
              onChange={(e) => handleFieldChange('doi', e.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">PMID</label>
            <input
              type="text"
              value={editedMetadata.pmid || ''}
              onChange={(e) => handleFieldChange('pmid', e.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-1">URL</label>
            <input
              type="text"
              value={editedMetadata.url || ''}
              onChange={(e) => handleFieldChange('url', e.target.value)}
              className={fieldClassName}
            />
          </div>
        </div>
      </div>
    );
  }

  const formatAuthors = (authors?: Author[]) => {
    if (!authors || authors.length === 0) return null;
    return authors.map((author, index) => {
      const name = author.fullName || `${author.lastName}${author.firstName ? `, ${author.firstName}` : ''}`;
      return index === 0 ? name : `, ${name}`;
    });
  };

  const formatVolumeIssue = () => {
    const parts = [];
    if (metadata.volume) parts.push(`Vol. ${metadata.volume}`);
    if (metadata.issue) parts.push(`No. ${metadata.issue}`);
    return parts.length > 0 ? parts.join(', ') : null;
  };

  const getMissingFields = () => {
    const missing: string[] = [];
    const fieldLabels: Record<string, string> = {
      title: 'Title',
      authors: 'Authors',
      journal: 'Journal',
      year: 'Publication Year',
      volume: 'Volume',
      issue: 'Issue',
      pages: 'Pages',
      doi: 'DOI',
      pmid: 'PMID',
    };

    if (!metadata.title) missing.push(fieldLabels.title);
    if (!metadata.authors || metadata.authors.length === 0) missing.push(fieldLabels.authors);
    if (!metadata.journal) missing.push(fieldLabels.journal);
    if (!metadata.year) missing.push(fieldLabels.year);
    if (!metadata.volume) missing.push(fieldLabels.volume);
    if (!metadata.issue) missing.push(fieldLabels.issue);
    if (!metadata.pages) missing.push(fieldLabels.pages);
    if (!metadata.doi) missing.push(fieldLabels.doi);
    if (!metadata.pmid) missing.push(fieldLabels.pmid);

    return missing;
  };

  return (
    <div className="mt-6 min-w-0 space-y-6">
      {/* Citation Style Selector */}
      <div className="min-w-0 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-heading text-lg font-semibold text-navy-700 dark:text-white">Citation Style</h3>
          <button
            onClick={handleEdit}
            className="rounded-lg px-4 py-2 text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
          >
            Edit Metadata
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStyleChange('ama')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'ama'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            AMA
          </button>
          <button
            onClick={() => handleStyleChange('vancouver')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'vancouver'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            Vancouver
          </button>
          <button
            onClick={() => handleStyleChange('apa')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'apa'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            APA 7
          </button>
          <button
            onClick={() => handleStyleChange('harvard')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'harvard'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            Harvard
          </button>
          <button
            onClick={() => handleStyleChange('mla')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'mla'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            MLA 9
          </button>
          <button
            onClick={() => handleStyleChange('chicago')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'chicago'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            Chicago
          </button>
          <button
            onClick={() => handleStyleChange('ieee')}
            className={`rounded-lg px-4 py-2 text-sm font-heading font-medium transition-colors ${
              citationStyle === 'ieee'
                ? 'bg-navy-700 text-white'
                : 'rounded-lg bg-navy-50 dark:bg-navy-900 text-gray-700 dark:text-gray-200 hover:bg-navy-100 dark:hover:bg-navy-700'
            }`}
          >
            IEEE
          </button>
        </div>
      </div>

      {/* Source Details */}
      <div className="min-w-0 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-brand-500"></div>
          <h3 className="font-heading text-lg font-semibold text-navy-700 dark:text-white">Source identified</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Metadata retrieved successfully</p>

        <div className="space-y-4">
          {metadata.title && (
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Title</p>
              <p className="text-base text-navy-700 dark:text-gray-100 font-medium">{metadata.title}</p>
            </div>
          )}

          {metadata.authors && metadata.authors.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Authors</p>
              <p className="text-sm text-navy-700 dark:text-gray-100">{formatAuthors(metadata.authors)}</p>
            </div>
          )}

          {metadata.journal && (
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Journal</p>
              <p className="text-sm text-navy-700 dark:text-gray-100">{metadata.journal}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metadata.year && (
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Publication Year</p>
                <p className="text-sm text-navy-700 dark:text-gray-100">{metadata.year}</p>
              </div>
            )}

            {formatVolumeIssue() && (
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Volume/Issue</p>
                <p className="text-sm text-navy-700 dark:text-gray-100">{formatVolumeIssue()}</p>
              </div>
            )}
          </div>

          {metadata.pages && (
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Pages</p>
              <p className="text-sm text-navy-700 dark:text-gray-100">{metadata.pages}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metadata.doi && (
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">DOI</p>
                <p className="text-sm text-navy-700 dark:text-gray-100 font-mono break-words [overflow-wrap:anywhere]">{metadata.doi}</p>
              </div>
            )}

            {metadata.pmid && (
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">PMID</p>
                <p className="text-sm text-navy-700 dark:text-gray-100 font-mono break-words [overflow-wrap:anywhere]">{metadata.pmid}</p>
              </div>
            )}
          </div>

          {metadata.url && (
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">URL</p>
              <a
                href={metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block max-w-full text-sm text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 hover:underline break-words [overflow-wrap:anywhere]"
              >
                {metadata.url}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Formatted Citation */}
      <div className="min-w-0 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold text-navy-700 dark:text-white mb-4">Citation</h3>
        <div className="rounded-xl bg-navy-50 dark:bg-navy-900 p-4 mb-3">
          <p className="text-sm text-navy-700 dark:text-gray-100 font-mono break-words [overflow-wrap:anywhere]">{citation.reference}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopyReference}
            className="rounded-lg px-4 py-2 text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors flex items-center gap-2"
            aria-label="Copy citation to clipboard"
          >
            {copiedReference ? 'Copied ✓' : 'Copy Citation'}
          </button>
          {onAddToReferenceList && (
            <button
              onClick={onAddToReferenceList}
              className="rounded-lg px-4 py-2 text-sm font-heading font-semibold text-white bg-navy-700 hover:bg-navy-600 transition-colors"
            >
              Add to Reference List
            </button>
          )}
        </div>
      </div>

      {/* In-Text Citation */}
      <div className="min-w-0 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold text-navy-700 dark:text-white mb-4">In-text citation</h3>
        <div className="rounded-xl bg-navy-50 dark:bg-navy-900 p-4 mb-3">
          <p className="text-sm text-navy-700 dark:text-gray-100 font-mono break-words [overflow-wrap:anywhere]">{citation.inText}</p>
        </div>
        <button
          onClick={handleCopyInText}
          className="rounded-lg px-4 py-2 text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors flex items-center gap-2"
          aria-label="Copy in-text citation to clipboard"
        >
          {copiedInText ? 'Copied ✓' : 'Copy'}
        </button>
      </div>

      {/* Citation Verification Notice */}
      <div className="rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-brand-600 dark:text-brand-300 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-navy-700 dark:text-gray-100 mb-1">
              Generated from available source metadata. Please verify the citation details before using it in academic work.
            </p>
            {getMissingFields().length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-1">
                  Some source details could not be verified.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Missing fields: {getMissingFields().join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { Upload, FileCheck2 } from 'lucide-react';
import { inputClass } from './Accordion';

/** Styled <select> dropdown matching the project's input styling. */
export function SelectField({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${inputClass} appearance-none bg-white dark:bg-navy-800 cursor-pointer`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

/** Pill-style single-select radio group. */
export function RadioGroup({
  name,
  value,
  onChange,
  options,
  disabled,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const checked = value === opt;
        return (
          <label
            key={opt}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${
              checked
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                : 'border-navy-200 dark:border-navy-600 text-navy-600 dark:text-gray-300 hover:border-brand-300'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={checked}
              onChange={() => onChange(opt)}
              disabled={disabled}
              className="sr-only"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

/** Pill-style multi-select checkbox group. */
export function CheckboxGroup({
  values,
  onChange,
  options,
  disabled,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  options: string[];
  disabled?: boolean;
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <label
            key={opt}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${
              checked
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                : 'border-navy-200 dark:border-navy-600 text-navy-600 dark:text-gray-300 hover:border-brand-300'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(opt)}
              disabled={disabled}
              className="sr-only"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

/** Single confirmation checkbox with a label (used for consent). */
export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        className={`flex items-start gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-300 dark:border-navy-600 text-brand-600 focus:ring-2 focus:ring-brand-400"
        />
        <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-500 pl-8">{error}</p>}
    </div>
  );
}

/** 1–5 rating scale, used for feedback/self-assessment questions. */
export function RatingScale({
  name,
  value,
  onChange,
  lowLabel,
  highLabel,
  disabled,
}: {
  name: string;
  value: number | null;
  onChange: (v: number) => void;
  lowLabel?: string;
  highLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${
              value === n
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                : 'border-navy-200 dark:border-navy-600 text-navy-600 dark:text-gray-300 hover:border-brand-300'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              disabled={disabled}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
      {(lowLabel || highLabel) && (
        <div className="flex justify-between mt-1.5 text-xs text-gray-400">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];

export function validateReceiptFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) return 'File is too large. Maximum size is 5MB.';
  if (ACCEPTED_TYPES.length && !ACCEPTED_TYPES.includes(file.type) && file.type !== '') {
    return 'Please upload a JPG, PNG, or PDF file.';
  }
  return null;
}

/** Drag/click file upload box for the payment receipt. */
export function FileUpload({
  file,
  onChange,
  disabled,
  error,
}: {
  file: File | null;
  onChange: (f: File | null, error?: string | null) => void;
  disabled?: boolean;
  error?: string;
}) {
  const handleFile = (f: File | null) => {
    if (!f) {
      onChange(null);
      return;
    }
    const validationError = validateReceiptFile(f);
    if (validationError) {
      onChange(null, validationError);
      return;
    }
    onChange(f, null);
  };

  return (
    <div>
      <label
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-all ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${
          error
            ? 'border-red-300 bg-red-50 dark:bg-red-900/10'
            : file
            ? 'border-brand-400 bg-brand-50/50 dark:bg-brand-900/10'
            : 'border-navy-200 dark:border-navy-600 hover:border-brand-400 bg-navy-50/50 dark:bg-navy-800/50'
        }`}
      >
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          disabled={disabled}
          className="hidden"
        />
        {file ? (
          <>
            <FileCheck2 className="h-6 w-6 text-brand-500" />
            <span className="text-sm font-medium text-navy-700 dark:text-gray-200 break-all px-4">
              {file.name}
            </span>
            <span className="text-xs text-gray-400">Click to replace</span>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-sm font-medium text-navy-600 dark:text-gray-300">
              Click to upload payment receipt
            </span>
            <span className="text-xs text-gray-400">JPG, PNG or PDF, max 5MB</span>
          </>
        )}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

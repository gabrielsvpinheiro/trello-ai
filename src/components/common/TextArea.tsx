'use client';

interface TextAreaProps {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
}

export function TextArea({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  label,
  rows = 2,
  disabled = false,
}: TextAreaProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        disabled={disabled}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-gray-200 focus:border-gray-300 focus:z-10 sm:text-sm ${className}`}
      />
    </div>
  );
} 
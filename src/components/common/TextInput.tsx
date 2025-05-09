'use client';

interface TextInputProps {
  id: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
}

export function TextInput({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  label,
}: TextInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-gray-200 focus:border-gray-300 focus:z-10 sm:text-sm ${className}`}
      />
    </div>
  );
}
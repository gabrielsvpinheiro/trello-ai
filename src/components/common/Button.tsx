'use client'

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string; 
  ariaLabel?: string;
  disabled?: boolean;
}

export function Button({
  onClick,
  text,
  type = "button",
  className = "",
  ariaLabel,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer group relative flex justify-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || text}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

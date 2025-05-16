'use client';

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full">
        <svg
            className="animate-spin h-10 w-10 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="4"
            stroke="#4A5568"
            />
            <path
            className="opacity-75"
            fill="#4A5568"
            d="M4.93 4.93a10 10 0 0 1 14.14 14.14l-1.41-1.41a8 8 0 1 0-11.31-11.31L4.93 4.93z"
            />
        </svg>
        </div>
    );
}
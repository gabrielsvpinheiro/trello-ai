'use client'

export function Logo() {
    return (
        <svg
        width="100"
        height="50"
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
            <polyline
            points="20,25 40,10 40,40"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <polyline
            points="60,10 60,40 80,25"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
    )
}
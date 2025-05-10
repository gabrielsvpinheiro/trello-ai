'use client'

interface BlockProps {
    title: string;
    description: string;
}

export function Block({title, description}: BlockProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-white text-xl font-semibold">{title}</h2>
        <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}
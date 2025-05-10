'use client';

interface TaskCardProps {
  task: { id: number; title: string; content: string };
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: any, source: string) => void;
  source: string;
}

export function TaskCard({ task, onDragStart, source }: TaskCardProps) {
  return (
    <div
      className="bg-gray-700 p-4 rounded-lg shadow-md mb-2"
      draggable
      onDragStart={(e) => onDragStart(e, task, source)}
    >
      <h3 className="text-white text-md">{task.title}</h3>
      <p className="text-gray-400 text-sm">{task.content}</p>
    </div>
  );
}
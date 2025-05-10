import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: { id: number; title: string; content: string }[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, target: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: any, source: string) => void;
  source: string;
}

export function TaskColumn({ title, tasks, onDragOver, onDrop, onDragStart, source }: TaskColumnProps) {
  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-md"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, source)}
    >
      <h2 className="text-white text-lg font-semibold pb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDragStart={onDragStart} source={source} />
      ))}
    </div>
  );
}
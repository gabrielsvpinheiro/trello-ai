'use client';

import { Task } from "@/types/task";
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, target: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task, source: string) => void;
  source: string;
  handleDeleteTask: (taskId: number) => void;
}

export function TaskColumn({ title, tasks, onDragOver, onDrop, onDragStart, source, handleDeleteTask }: TaskColumnProps) {
  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-md"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, source)}
    >
      <h2 className="text-white text-lg font-semibold pb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDragStart={onDragStart} source={source} handleDeleteTask={handleDeleteTask}/>
      ))}
    </div>
  );
}
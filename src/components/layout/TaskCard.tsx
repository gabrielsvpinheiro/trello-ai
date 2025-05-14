'use client';

import { Task } from "@/types/task";
import RemoveIcon from "../common/RemoveIcon";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task, source: string) => void;
  source: string;
  handleDeleteTask: (taskId: number) => void;
}

export function TaskCard({ task, onDragStart, source, handleDeleteTask }: TaskCardProps) {
  return (
    <div
      className="bg-gray-700 p-4 rounded-lg shadow-md mb-2"
      draggable
      onDragStart={(e) => onDragStart(e, task, source)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white text-md">{task.title}</h3>
        <button onClick={() => handleDeleteTask(task.id)}>
          <RemoveIcon />
        </button>
      </div>
      <p className="text-gray-400 text-sm">{task.content}</p>
    </div>
  );
}
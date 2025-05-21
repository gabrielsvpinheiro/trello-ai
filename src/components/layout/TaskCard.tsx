'use client';

import { useState } from 'react';
import { Task } from "@/types/task";
import RemoveIcon from "../common/RemoveIcon";
import { EditTaskForm } from './EditTaskForm';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task, source: string) => void;
  source: string;
  handleDeleteTask: (taskId: number) => void;
  handleEditTask: (taskId: number, title: string, content: string) => Promise<void>;
}

export function TaskCard({ task, onDragStart, source, handleDeleteTask, handleEditTask }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-2">
        <EditTaskForm
          task={task}
          onSave={handleEditTask}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      className="bg-gray-700 p-4 rounded-lg shadow-md mb-2"
      draggable
      onDragStart={(e) => onDragStart(e, task, source)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white text-md">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-white"
          >
            ✎
          </button>
          <button onClick={() => handleDeleteTask(task.id)}>
            <RemoveIcon />
          </button>
        </div>
      </div>
      <p className="text-gray-400 text-sm">{task.content}</p>
    </div>
  );
}
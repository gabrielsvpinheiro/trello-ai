'use client';

import { useState } from 'react';
import { Task } from "@/types/task";
import RemoveIcon from "../common/RemoveIcon";
import { EditTaskForm } from './EditTaskForm';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
  task: Task;
  source: string;
  handleDeleteTask: (taskId: number) => Promise<void>;
  handleEditTask: (taskId: number, title: string, content: string) => Promise<void>;
}

export function TaskCard({ task, source, handleDeleteTask, handleEditTask }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      task,
      type: source,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await handleDeleteTask(task.id);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-2">
        <EditTaskForm
          task={task}
          onSave={async (taskId, title, content) => {
            await handleEditTask(taskId, title, content);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-700 p-4 rounded-lg shadow-md mb-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white text-md">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-gray-400 hover:text-white"
          >
            ✎
          </button>
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-white"
          >
            <RemoveIcon />
          </button>
        </div>
      </div>
      <p className="text-gray-400 text-sm">{task.content}</p>
    </div>
  );
}
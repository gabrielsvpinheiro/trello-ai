'use client';

import { useState } from "react";
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
  onCreateTask?: (title: string, content: string) => Promise<void>;
}

export function TaskColumn({
  title,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  source,
  handleDeleteTask,
  onCreateTask,
}: TaskColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreateTask) return;
    setCreating(true);
    await onCreateTask(newTitle, newContent);
    setNewTitle("");
    setNewContent("");
    setShowForm(false);
    setCreating(false);
  };

  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-md"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, source)}
    >
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        {source === "backlog" && onCreateTask && (
          <button
            className="text-white bg-gray-600 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-500 cursor-pointer"
            onClick={() => setShowForm((v) => !v)}
            aria-label="Add task"
            type="button"
          >
            +
          </button>
        )}
      </div>
      {showForm && source === "backlog" && onCreateTask && (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
          <input
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
            disabled={creating}
          />
          <textarea
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Content..."
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            rows={2}
            disabled={creating}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
              disabled={creating}
            >
              {creating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-900 cursor-pointer"
              onClick={() => setShowForm(false)}
              disabled={creating}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDragStart={onDragStart}
          source={source}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
}
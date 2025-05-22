'use client';

import { useState } from "react";
import { Task } from "@/types/task";
import { TaskCard } from './TaskCard';
import { TextInput } from '../common/TextInput';
import { TextArea } from '../common/TextArea';
import { Button } from '../common/Button';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  source: string;
  handleDeleteTask: (taskId: number) => Promise<void>;
  handleEditTask: (taskId: number, title: string, content: string) => Promise<void>;
  onCreateTask?: (title: string, content: string) => Promise<void>;
  isOver?: boolean;
}

export function TaskColumn({
  title,
  tasks,
  source,
  handleDeleteTask,
  handleEditTask,
  onCreateTask,
  isOver = false,
}: TaskColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);

  const { setNodeRef } = useDroppable({
    id: source,
    data: {
      type: source,
    },
  });

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
      ref={setNodeRef}
      className={`flex flex-col w-full h-full min-h-[500px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-all duration-200 ${
        isOver ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
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
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
          <TextInput
            id="new-title"
            name="title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            required
            className="rounded-t-md"
            label="Title"
            disabled={creating}
          />
          <TextArea
            id="new-content"
            name="content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="rounded-b-md"
            label="Content"
            disabled={creating}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              text={creating ? "Saving..." : "Save"}
              disabled={creating}
              className="bg-gray-600 hover:bg-gray-900"
            />
            <Button
              type="button"
              text="Cancel"
              onClick={() => setShowForm(false)}
              disabled={creating}
              className="bg-gray-600 hover:bg-gray-900"
            />
          </div>
        </form>
      )}
      
      <SortableContext
        items={tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            source={source}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ))}
      </SortableContext>
    </div>
  );
}
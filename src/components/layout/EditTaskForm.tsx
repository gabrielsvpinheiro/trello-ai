'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { TextInput } from '../common/TextInput';
import { TextArea } from '../common/TextArea';
import { Button } from '../common/Button';

interface EditTaskFormProps {
  task: Task;
  onSave: (taskId: number, title: string, content: string) => Promise<void>;
  onCancel: () => void;
}

export function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(task.id, title, content);
      onCancel();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <TextInput
        id="edit-title"
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="rounded-t-md"
        label="Title"
      />
      <TextArea
        id="edit-content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        className="rounded-b-md"
        label="Content"
        disabled={isSaving}
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          text={isSaving ? "Saving..." : "Save"}
          disabled={isSaving}
          className="bg-gray-800 hover:bg-gray-900"
        />
        <Button
          type="button"
          text="Cancel"
          onClick={onCancel}
          disabled={isSaving}
          className="bg-gray-800 hover:bg-gray-900"
        />
      </div>
    </form>
  );
} 
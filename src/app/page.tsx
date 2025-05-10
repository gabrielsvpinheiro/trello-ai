'use client';

import { useState } from "react";
import LogOut from "@/components/auth/LogOut";
import { TaskColumn } from "../components/layout/TaskColumn";
import { Task } from "@/types/task";

export default function Home() {
  const [backlog, setBacklog] = useState<Task[]>([
    { id: 1, title: "Task 1", content: "Task 1 content" },
    { id: 2, title: "Task 2", content: "Task 2 content" },
  ]);
  const [inProgress, setInProgress] = useState<Task[]>([
    { id: 3, title: "Task 3", content: "Task 3 content" },
  ]);
  const [done, setDone] = useState<Task[]>([
    { id: 4, title: "Task 4", content: "Task 4 content" },
    { id: 5, title: "Task 5", content: "Task 5 content" },
  ]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: any, source: string) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("source", source);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    const source = e.dataTransfer.getData("source");

    if (source === "backlog") setBacklog((prev) => prev.filter((t) => t.id !== task.id));
    if (source === "inProgress") setInProgress((prev) => prev.filter((t) => t.id !== task.id));
    if (source === "done") setDone((prev) => prev.filter((t) => t.id !== task.id));

    if (target === "backlog") setBacklog((prev) => [...prev, task]);
    if (target === "inProgress") setInProgress((prev) => [...prev, task]);
    if (target === "done") setDone((prev) => [...prev, task]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl">
          <TaskColumn
            title="Backlog"
            tasks={backlog}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            source="backlog"
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgress}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            source="inProgress"
          />
          <TaskColumn
            title="Done"
            tasks={done}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            source="done"
          />
        </div>
        <div className="mt-8">
          <LogOut />
        </div>
      </div>
    </>
  );
}
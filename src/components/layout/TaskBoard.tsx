'use client';

import { TaskColumn } from "./TaskColumn";
import { Task } from "@/types/task";
import Loading from "../common/Loading";
import { useTaskBoard } from "@/hooks/useTaskBoard";
import { AITaskInput } from "../common/AITaskInput";

export function TaskBoard() {
  const {
    backlog,
    inProgress,
    done,
    loading,
    updateTaskStatus,
    handleDeleteTask,
    handleCreateTask,
    handleEditTask,
  } = useTaskBoard();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task, source: string) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("source", source);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task")) as Task;
    if (task.status !== target) {
      updateTaskStatus(task, target);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAICreateTask = (title: string, content: string) => {
    handleCreateTask(title, content);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-6xl">
      <AITaskInput onCreateTask={handleAICreateTask} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        <TaskColumn
          title="Backlog"
          tasks={backlog}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          source="backlog"
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          onCreateTask={handleCreateTask}
        />
        <TaskColumn
          title="In Progress"
          tasks={inProgress}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          source="inProgress"
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
        <TaskColumn
          title="Done"
          tasks={done}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          source="done"
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      </div>
    </div>
  );
}
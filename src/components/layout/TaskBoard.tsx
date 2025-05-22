'use client';

import { TaskColumn } from "./TaskColumn";
import { Task } from "@/types/task";
import Loading from "../common/Loading";
import { useTaskBoard } from "@/hooks/useTaskBoard";
import { AITaskInput } from "@/components/layout/AITaskInput";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

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
    handleReorderTasks,
  } = useTaskBoard();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setOverColumn(null);
      return;
    }

    const activeTask = active.data.current?.task as Task;
    const overTask = over.data.current?.task as Task;
    const overColumn = over.data.current?.type as string;

    if (!activeTask || !overTask) {
      setActiveId(null);
      setOverColumn(null);
      return;
    }

    if (activeTask.status === overColumn) {
      const tasks = overColumn === "backlog" ? backlog :
                   overColumn === "inProgress" ? inProgress :
                   done;
      
      const oldIndex = tasks.findIndex((task) => task.id === activeTask.id);
      const newIndex = tasks.findIndex((task) => task.id === overTask.id);
      
      if (oldIndex !== newIndex) {
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        handleReorderTasks(newTasks, overColumn);
      }
    }

    setActiveId(null);
    setOverColumn(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setOverColumn(null);
      return;
    }

    const activeTask = active.data.current?.task as Task;
    const overColumn = over.data.current?.type as string;

    if (!activeTask || !overColumn) return;

    setOverColumn(overColumn);

    if (activeTask.status !== overColumn) {
      updateTaskStatus(activeTask, overColumn);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverColumn(null);
  };

  if (loading) {
    return <Loading />;
  }

  const activeTask = [...backlog, ...inProgress, ...done].find(
    (task) => task.id === Number(activeId)
  );

  return (
    <div className="flex flex-col items-center w-full max-w-6xl">
      <AITaskInput onCreateTask={handleCreateTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <TaskColumn
            title="Backlog"
            tasks={backlog}
            source="backlog"
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            onCreateTask={handleCreateTask}
            isOver={overColumn === "backlog"}
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgress}
            source="inProgress"
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            isOver={overColumn === "inProgress"}
          />
          <TaskColumn
            title="Done"
            tasks={done}
            source="done"
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            isOver={overColumn === "done"}
          />
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-sm opacity-80">
              <h3 className="font-medium text-gray-900 dark:text-white">{activeTask.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activeTask.content}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
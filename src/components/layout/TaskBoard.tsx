'use client';

import { useEffect, useState, useCallback } from "react";
import { TaskColumn } from "./TaskColumn";
import { Task } from "@/types/task";
import { supabase } from "@/api/client";
import Loading from "../common/Loading";

export function TaskBoard() {
  const [backlog, setBacklog] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      setLoading(false);
      return;
    }

    setBacklog(data?.filter((task: Task) => task.status === "backlog") || []);
    setInProgress(data?.filter((task: Task) => task.status === "inProgress") || []);
    setDone(data?.filter((task: Task) => task.status === "done") || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateTaskStatus = async (task: Task, newStatus: string) => {
    await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', task.id);

    setBacklog((prev) => prev.filter((t) => t.id !== task.id));
    setInProgress((prev) => prev.filter((t) => t.id !== task.id));
    setDone((prev) => prev.filter((t) => t.id !== task.id));

    const updatedTask = { ...task, status: newStatus };
    if (newStatus === "backlog") setBacklog((prev) => [...prev, updatedTask]);
    if (newStatus === "inProgress") setInProgress((prev) => [...prev, updatedTask]);
    if (newStatus === "done") setDone((prev) => [...prev, updatedTask]);
  };

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

  const handleDeleteTask = async (taskId: number) => {
    await supabase.from('tasks').delete().eq('id', taskId);
    setBacklog((prev) => prev.filter((task) => task.id !== taskId));
    setInProgress((prev) => prev.filter((task) => task.id !== taskId));
    setDone((prev) => prev.filter((task) => task.id !== taskId));
  };

    const handleCreateTask = async (title: string, content: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title,
        content,
        status: 'backlog',
        user_id: user.id,
      })
      .select()
      .single();
    if (!error && data) {
      setBacklog((prev) => [data, ...prev]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl">
      <TaskColumn
        title="Backlog"
        tasks={backlog}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        source="backlog"
        handleDeleteTask={handleDeleteTask}
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
      />
      <TaskColumn
        title="Done"
        tasks={done}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        source="done"
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
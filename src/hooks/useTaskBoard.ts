import { useState, useCallback, useEffect } from 'react';
import { Task } from '@/types/task';
import { supabase } from '@/api/client';

export function useTaskBoard() {
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
      .order('status', { ascending: true })
      .order('order', { ascending: true });

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
    const { data: maxOrderData } = await supabase
      .from('tasks')
      .select('order')
      .eq('status', newStatus)
      .order('order', { ascending: false })
      .limit(1);

    const newOrder = maxOrderData?.[0]?.order ?? -1;

    await supabase
      .from('tasks')
      .update({ 
        status: newStatus,
        order: newOrder + 1
      })
      .eq('id', task.id);

    setBacklog((prev) => prev.filter((t) => t.id !== task.id));
    setInProgress((prev) => prev.filter((t) => t.id !== task.id));
    setDone((prev) => prev.filter((t) => t.id !== task.id));

    const updatedTask = { ...task, status: newStatus, order: newOrder + 1 };
    if (newStatus === "backlog") setBacklog((prev) => [...prev, updatedTask]);
    if (newStatus === "inProgress") setInProgress((prev) => [...prev, updatedTask]);
    if (newStatus === "done") setDone((prev) => [...prev, updatedTask]);
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

    const { data: maxOrderData } = await supabase
      .from('tasks')
      .select('order')
      .eq('status', 'backlog')
      .order('order', { ascending: false })
      .limit(1);

    const newOrder = maxOrderData?.[0]?.order ?? -1;

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title,
        content,
        status: 'backlog',
        user_id: user.id,
        order: newOrder + 1
      })
      .select()
      .single();
    if (!error && data) {
      setBacklog((prev) => [data, ...prev]);
    }
  };

  const handleEditTask = async (taskId: number, title: string, content: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ title, content })
      .eq('id', taskId)
      .select()
      .single();

    if (!error && data) {
      const updateTaskInList = (list: Task[]) =>
        list.map((task) => (task.id === taskId ? data : task));

      setBacklog((prev) => updateTaskInList(prev));
      setInProgress((prev) => updateTaskInList(prev));
      setDone((prev) => updateTaskInList(prev));
    }
  };

  const handleReorderTasks = async (tasks: Task[], status: string) => {
    if (status === "backlog") setBacklog(tasks);
    if (status === "inProgress") setInProgress(tasks);
    if (status === "done") setDone(tasks);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const updates = tasks.map((task, index) => ({
      id: task.id,
      order: index,
      status: status
    }));

    const { error } = await supabase
      .from('tasks')
      .upsert(updates, { onConflict: 'id' });

    if (error) {
      console.error('Error updating task order:', error);
    }
  };

  return {
    backlog,
    inProgress,
    done,
    loading,
    updateTaskStatus,
    handleDeleteTask,
    handleCreateTask,
    handleEditTask,
    handleReorderTasks,
  };
} 
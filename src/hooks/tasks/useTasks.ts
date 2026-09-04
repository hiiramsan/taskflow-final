import { useCallback, useEffect, useState } from "react";
import type { Task } from "../../types";
import { getTasks } from "../../services/taskService";

interface UseTasksResult {
    tasks: Task[],
    loading: boolean,
    error: string | null
    refetch: () => void,
    addTask: (task: Task) => void,
    replaceTask: (temporaryId: number, task: Task) => void,
    removeTask: (taskId: number) => void,
    updateTaskStatus: (taskId: number, status: Task['status']) => void,
}

export function useTasks(projectId: number | null): UseTasksResult {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    const refetch = useCallback(() => {
        setReloadKey((key) => key + 1)
    }, []);

    const addTask = useCallback((task: Task) => {
        setTasks((current) => [task, ...current])
    }, [])

    const replaceTask = useCallback((temporaryId: number, task: Task) => {
        setTasks((current) => current.map((item) => item.id === temporaryId ? task : item))
    }, [])

    const removeTask = useCallback((taskId: number) => {
        setTasks((current) => current.filter((item) => item.id !== taskId))
    }, [])

    const updateTaskStatus = useCallback((taskId: number, status: Task['status']) => {
        setTasks((current) => current.map((item) => item.id === taskId ? { ...item, status } : item))
    }, [])

    useEffect(() => {
        let cancelled = false
        setLoading(true);
        setError(null)

        getTasks(projectId)
            .then((data) => {
                if (!cancelled) setTasks(data)
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar tareas')
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }

    }, [reloadKey])

    return { tasks, loading, error, refetch, addTask, replaceTask, removeTask, updateTaskStatus }

}
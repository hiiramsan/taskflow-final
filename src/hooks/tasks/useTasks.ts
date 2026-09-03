import { useCallback, useEffect, useState } from "react";
import type { Task } from "../../types";
import { getTasks } from "../../services/taskService";

interface UseTasksResult {
    tasks: Task[],
    loading: boolean,
    error: string | null
    refetch: () => void
}

export function useTasks(projectId: number | null): UseTasksResult {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    const refetch = useCallback(() => {
        setReloadKey((key) => key + 1)
    }, []);

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

    return { tasks, loading, error, refetch }

}
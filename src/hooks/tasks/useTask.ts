import { useCallback, useEffect, useState } from 'react'
import { getTaskById } from '../../services/taskService'
import type { Task } from '../../types'

export function useTask(taskId: number | null) {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    if (taskId === null) {
      setTask(null)
      setLoading(false)
      setError(null)
      return () => {
        cancelled = true
      }
    }

    setLoading(true)
    setError(null)

    getTaskById(taskId)
      .then((data) => {
        if (!cancelled) setTask(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar la tarea')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [taskId, reloadKey])

  return { task, loading, error, refetch }
}

import { useState } from 'react'
import { updateTaskStatus } from '../../services/taskService'
import type { Task } from '../../types'

interface UseUpdateTaskStatusOptions {
  taskId: number | null
  onSuccess?: (task: Task) => void
}

export function useUpdateTaskStatus({ taskId, onSuccess }: UseUpdateTaskStatusOptions) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function changeStatus(status: Task['status']) {
    if (taskId === null || updating) return false

    setUpdating(true)
    setError(null)

    try {
      const updatedTask = await updateTaskStatus(taskId, status)
      onSuccess?.(updatedTask)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado de la tarea')
      return false
    } finally {
      setUpdating(false)
    }
  }

  return { updating, error, changeStatus }
}

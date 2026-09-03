import { useState } from 'react'
import { deleteTask } from '../../services/taskService'

interface UseDeleteTaskOptions {
  taskId: number | null
  onSuccess?: () => void
}

export function useDeleteTask({ taskId, onSuccess }: UseDeleteTaskOptions) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function removeTask() {
    if (taskId === null || deleting) return false

    setDeleting(true)
    setError(null)

    try {
      await deleteTask(taskId)
      onSuccess?.()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la tarea')
      return false
    } finally {
      setDeleting(false)
    }
  }

  return { deleting, error, removeTask }
}

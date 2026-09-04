import { useState } from 'react'
import { updateTaskStatus } from '../../services/taskService'
import type { Task } from '../../types'

interface UseUpdateTaskStatusOptions {
  taskId: number | null
  currentStatus: Task['status']
  assigneeId?: number | null
  onOptimisticUpdate?: (status: Task['status']) => void
  onRollback?: (status: Task['status']) => void
}

export function useUpdateTaskStatus({ taskId, currentStatus, assigneeId, onOptimisticUpdate, onRollback }: UseUpdateTaskStatusOptions) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function changeStatus(status: Task['status']) {
    if (taskId === null || updating) return false

    if (status === 'DONE' && assigneeId == null) {
      setError('Assign a user before marking this task as done.')
      return false
    }

    setUpdating(true)
    setError(null)
    onOptimisticUpdate?.(status)

    try {
      await updateTaskStatus(taskId, status)
      return true
    } catch (err) {
      onRollback?.(currentStatus)
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado de la tarea')
      return false
    } finally {
      setUpdating(false)
    }
  }

  return { updating, error, changeStatus }
}

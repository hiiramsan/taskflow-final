import { useState } from 'react'
import type { NewTask, Task } from '../../types'
import { createProjectTask } from '../../services/taskService'

interface UseCreateTaskOptions {
  projectId: number | null
  onOptimisticAdd?: (task: Task) => void
  onSuccess?: (task: Task, optimisticTaskId: number) => void
  onRollback?: (taskId: number) => void
}

export function useCreateTask({ projectId, onOptimisticAdd, onSuccess, onRollback }: UseCreateTaskOptions) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<NewTask['priority']>('MED')
  const [assigneeId, setAssigneeId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validAssignee = assigneeId === '' || Number(assigneeId) > 0
  const valid = projectId !== null && title.trim().length >= 3 && validAssignee

  function reset() {
    setTitle('')
    setDescription('')
    setPriority('MED')
    setAssigneeId('')
    setDueDate('')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || submitting || projectId === null) return

    setSubmitting(true)
    setError(null)

    const optimisticTask: Task = {
      id: -Date.now(),
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status: 'TODO',
      projectId,
      assigneeId: assigneeId === '' ? undefined : Number(assigneeId),
      dueDate: dueDate || undefined,
    }
    onOptimisticAdd?.(optimisticTask)

    try {
      const createdTask = await createProjectTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        assigneeId: assigneeId === '' ? undefined : Number(assigneeId),
        dueDate: dueDate || undefined,
      }, projectId)
      reset()
      onSuccess?.(createdTask, optimisticTask.id)
    } catch (err) {
      onRollback?.(optimisticTask.id)
      setError(err instanceof Error ? err.message : 'Error al crear la tarea')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    assigneeId,
    setAssigneeId,
    dueDate,
    setDueDate,
    submitting,
    error,
    valid,
    handleSubmit,
  }
}
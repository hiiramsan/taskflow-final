import { useEffect, useState } from 'react'
import { updateTask } from '../../services/taskService'
import type { NewTask, Task } from '../../types'

interface UseUpdateTaskOptions {
  task: Task | null
  onSuccess?: (task: Task) => void
}

export function useUpdateTask({ task, onSuccess }: UseUpdateTaskOptions) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<NewTask['priority']>('MED')
  const [assigneeId, setAssigneeId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTitle(task?.title ?? '')
    setDescription(task?.description ?? '')
    setPriority(task?.priority ?? 'MED')
    setAssigneeId(task?.assigneeId?.toString() ?? '')
    setDueDate(task?.dueDate ?? '')
    setError(null)
  }, [task])

  const validAssignee = assigneeId === '' || Number(assigneeId) > 0
  const valid = task !== null && title.trim().length >= 3 && validAssignee

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!valid || submitting || task === null) return

    setSubmitting(true)
    setError(null)

    try {
      const body: NewTask = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        assigneeId: assigneeId === '' ? undefined : Number(assigneeId),
        dueDate: dueDate || undefined,
      }
      const updatedTask = await updateTask(body, task.id)
      onSuccess?.(updatedTask)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea')
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

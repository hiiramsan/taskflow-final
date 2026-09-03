import { useEffect, useState } from 'react'
import { updateProjectById } from '../../services/projectService'
import type { NewProject, Project } from '../../types'

interface UseUpdateProjectOptions {
  project: Project | null
  onSuccess?: (project: Project) => void
}

export function useUpdateProject({ project, onSuccess }: UseUpdateProjectOptions) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setName(project?.name ?? '')
    setDescription(project?.description ?? '')
    setError(null)
  }, [project])

  const valid = name.trim().length >= 3 && project !== null

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!valid || submitting || project === null) return

    setSubmitting(true)
    setError(null)

    try {
      const body: NewProject = {
        name: name.trim(),
        description: description.trim() || undefined,
      }
      const updatedProject = await updateProjectById(project.id, body)
      onSuccess?.(updatedProject)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el proyecto')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    name,
    setName,
    description,
    setDescription,
    submitting,
    error,
    valid,
    handleSubmit,
  }
}

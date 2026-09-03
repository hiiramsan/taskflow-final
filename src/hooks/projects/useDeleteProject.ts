import { useState } from 'react'
import { deleteProjectById } from '../../services/projectService'

interface UseDeleteProjectOptions {
  projectId: number | null
  onSuccess?: () => void
}

export function useDeleteProject({ projectId, onSuccess }: UseDeleteProjectOptions) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function deleteProject() {
    if (projectId === null || deleting) return false

    setDeleting(true)
    setError(null)

    try {
      await deleteProjectById(projectId)
      onSuccess?.()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el proyecto')
      return false
    } finally {
      setDeleting(false)
    }
  }

  return { deleting, error, deleteProject }
}

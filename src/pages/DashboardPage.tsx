import ProjectCard from '../components/ProjectCard'
import { ProjectForm } from '../components/ProjectForm'
import { useProjects } from '../hooks/projects/useProjects'
import { useProjectForm } from '../hooks/projects/useProjectForm'
import { LoaderCircle, Plus } from 'lucide-react'
import { useState } from 'react'

export function DashboardPage() {
  const { projects, loading, error, refetch } = useProjects()
  const [formOpen, setFormOpen] = useState(false)
  const projectForm = useProjectForm({
    onSuccess: () => {
      setFormOpen(false)
      refetch()
    },
  })

  const handleToggleForm = (): void => {
    setFormOpen((open) => !open)
  }

  return (
    <div className='flex min-h-screen w-full flex-col gap-4 p-20'>
      <div className='flex flex-row items-end justify-between'>
        <div>
          <p className='font-mono text-gray-600'>TASKFLOW API</p>
          <h1 className='font-geist text-6xl font-semibold'>Projects<span className='text-lime-500'>.</span></h1>
        </div>
        <button
          type='button'
          aria-expanded={formOpen}
          className='flex cursor-pointer flex-row items-center justify-between border border-gray-400 px-2 py-1 font-mono transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white'
          onClick={handleToggleForm}
        >
          <span className='font-mono uppercase'>{formOpen ? 'Close' : 'New Project'}</span>
          <Plus strokeWidth={1.5} size={20} className={formOpen ? 'rotate-45 transition-transform' : 'transition-transform'} />
        </button>
      </div>

      {formOpen && <ProjectForm {...projectForm} onClose={() => setFormOpen(false)} />}

      <div className='grid grid-cols-1 gap-6 border-t border-gray-500 py-10 sm:grid-cols-2 lg:grid-cols-3'>
        {loading && <div className='col-span-full flex min-h-48 items-center justify-center'><LoaderCircle className='animate-spin text-gray-600' size={32} aria-label='Loading projects' /></div>}
        {error && <p role='alert' className='border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</p>}
        {!loading && !error && projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
          />
        ))}
        {!loading && !error && projects.length === 0 && (
          <p className='font-mono text-sm text-gray-600'>No projects.</p>
        )}
      </div>
    </div>
  )
}

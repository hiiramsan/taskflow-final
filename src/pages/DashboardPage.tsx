import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'

export function DashboardPage() {
  const { projects } = useProjects()

  return (
    <div className='flex flex-col min-h-screen p-20 w-full gap-10'>
      <div className='flex flex-col '>
        <p className='font-mono text-gray-600'>TASKFLOW API</p>
        <h1 className='text-6xl font-geist font-semibold'>Projects<span className='text-lime-500'>.</span></h1>
      </div>
      <div className="border-t border-gray-500 py-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
          />
        ))}

      </div>
    </div>
  )
}

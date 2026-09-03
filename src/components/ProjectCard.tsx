import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
    id: number
    name: string
    description?: string
}

const ProjectCard = ({ id, name, description }: ProjectCardProps) => {
    return (
        <Link
            to={`/projects/${id}`}
            className='block aspect-110/45 border border-gray-300 hover:bg-white bg-[#F9F7F4] cursor-pointer hover:border-[#333] transition-all duration-300 ease-in-out hover:-translate-y-1'
        >
            <div className='flex flex-col w-full h-full p-5 justify-between'>
                <div className='flex flex-row justify-between align-top'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-geist font-medium'>{name}</h2>
                        <p className='font-light text-gray-600'>
                            {description || 'No description'}
                        </p>
                    </div>
                    <div>
                        <ArrowUpRight strokeWidth={1} color='#333' />
                    </div>
                </div>

                <div className='font-light font-mono text-gray-600 uppercase text-sm'>
                    Project
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
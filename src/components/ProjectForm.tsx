import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ProjectFormProps {
  name: string
  setName: (value: string) => void
  description: string
  setDescription: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
  onClose: () => void
  title?: string
  submitLabel?: string
}

export function ProjectForm({
  name,
  setName,
  description,
  setDescription,
  submitting,
  error,
  valid,
  handleSubmit,
  onClose,
  title = 'Nuevo proyecto',
  submitLabel,
}: ProjectFormProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-gray-900/45 p-4 backdrop-blur-sm sm:p-8'
      role='presentation'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby='project-form-title'
        className='relative max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto border border-gray-900 bg-[#f5f3ee] p-6 shadow-2xl sm:p-10'
      >
        <button
          type='button'
          aria-label='Cerrar formulario'
          title='Cerrar formulario'
          className='absolute right-4 top-4 cursor-pointer border border-gray-400 p-1 text-gray-700 transition hover:border-gray-900 hover:bg-white hover:text-gray-900'
          onClick={onClose}
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6'>
            <div>
              <h2 id='project-form-title' className='font-geist text-3xl font-semibold'>{title}</h2>
            </div>

            {error && (
              <p role='alert' className='border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {error}
              </p>
            )}

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Nombre
              <input
                className='border border-gray-400 bg-white px-3 py-3 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className='font-sans text-xs text-gray-500'>Mínimo 3 caracteres</span>
            </label>

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Descripción
              <textarea
                className='min-h-24 resize-y border border-gray-400 bg-white px-3 py-3 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </label>

            <button
              type='submit'
              disabled={!valid || submitting}
              className='cursor-pointer border border-gray-900 bg-gray-900 px-4 py-3 font-mono text-white transition hover:bg-lime-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {submitting ? 'Saving...' : submitLabel ?? 'Save project'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
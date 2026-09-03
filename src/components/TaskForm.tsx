import { useEffect } from 'react'
import { X } from 'lucide-react'

interface TaskFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  priority: 'LOW' | 'MED' | 'HIGH'
  setPriority: (value: 'LOW' | 'MED' | 'HIGH') => void
  assigneeId: string
  setAssigneeId: (value: string) => void
  dueDate: string
  setDueDate: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

export function TaskForm({
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
  onClose,
}: TaskFormProps) {
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
      className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/45 p-4 backdrop-blur-sm sm:p-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto border border-gray-900 bg-[#f5f3ee] p-6 shadow-2xl sm:p-10"
      >
        <button
          type="button"
          aria-label="Close task form"
          title="Close task form"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer border border-gray-400 p-1 text-gray-700 transition hover:border-gray-900 hover:bg-white hover:text-gray-900"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <h2 id="task-form-title" className="font-geist text-3xl font-semibold">New task</h2>
            </div>

            {error && <p role="alert" className="border border-red-400 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

            <label className="flex flex-col gap-1 font-mono text-sm text-gray-600">
              Title
              <input className="border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>

            <label className="flex flex-col gap-1 font-mono text-sm text-gray-600">
              Description
              <textarea className="min-h-20 resize-y border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="flex min-w-0 flex-col gap-1 font-mono text-sm text-gray-600">
                Priority
                <select className="w-full border border-gray-400 bg-white px-2 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" value={priority} onChange={(e) => setPriority(e.target.value as 'LOW' | 'MED' | 'HIGH')}>
                  <option value="LOW">Low</option>
                  <option value="MED">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </label>

              <label className="flex min-w-0 flex-col gap-1 font-mono text-sm text-gray-600">
                Assignee ID
                <input className="w-full border border-gray-400 bg-white px-2 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" type="number" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} />
              </label>

              <label className="flex min-w-0 flex-col gap-1 font-mono text-sm text-gray-600">
                Due date
                <input className="w-full border border-gray-400 bg-white px-2 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </label>
            </div>

            <button type="submit" disabled={!valid || submitting} className="cursor-pointer border border-gray-900 bg-gray-900 px-4 py-2.5 font-mono text-white transition hover:bg-lime-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Creating...' : 'Create task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
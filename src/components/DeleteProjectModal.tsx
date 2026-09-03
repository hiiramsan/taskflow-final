interface DeleteProjectModalProps {
  deleting: boolean
  error: string | null
  onClose: () => void
  onConfirm: () => void | Promise<unknown>
}

export default function DeleteProjectModal({
  deleting,
  error,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/45 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-project-title"
        className="w-full max-w-md border border-gray-900 bg-[#f5f3ee] p-6 shadow-2xl sm:p-8"
      >
        <div className="flex flex-col gap-5">
          <div>
            <h2 id="delete-project-title" className="font-geist text-2xl font-semibold">Delete project?</h2>
            <p className="mt-2 font-mono text-sm text-gray-600">
              This action cannot be undone. The project and its tasks will be removed.
            </p>
          </div>

          {error && (
            <p role="alert" className="border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={deleting}
              onClick={onClose}
              className="cursor-pointer border border-gray-400 px-4 py-3 font-mono text-gray-700 transition hover:border-gray-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={onConfirm}
              className="cursor-pointer border border-red-400 bg-red-100 px-4 py-3 font-mono text-red-700 transition hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? 'Deleting...' : 'Delete project'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

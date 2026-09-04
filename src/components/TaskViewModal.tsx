import { X } from "lucide-react";
import { useEffect } from "react";
import { useDeleteTask } from "../hooks/tasks/useDeleteTask";
import { useTask } from "../hooks/tasks/useTask";
import { useUpdateTask } from "../hooks/tasks/useUpdateTask";
import { useUpdateTaskStatus } from "../hooks/tasks/useUpdateTaskStatus";
import type { Task } from "../types";
import StatusSelector from "./StatusSelector";

interface TaskViewModalProps {
  task: Task;
  onClose: () => void;
  onSaved?: () => void;
  onDeleted?: () => void;
}

function toStatusId(status: Task["status"]): "todo" | "in-progress" | "done" {
  return status === "IN_PROGRESS" ? "in-progress" : status === "DONE" ? "done" : "todo";
}

function toTaskStatus(status: "todo" | "in-progress" | "done"): Task["status"] {
  return status === "in-progress" ? "IN_PROGRESS" : status === "done" ? "DONE" : "TODO";
}

export default function TaskViewModal({ task, onClose, onSaved, onDeleted }: TaskViewModalProps) {
  const { task: currentTask, loading, error: taskError, refetch } = useTask(task.id);
  const viewedTask = currentTask ?? task;
  const taskUpdate = useUpdateTask({
    task: currentTask,
    onSuccess: () => {
      refetch();
      onSaved?.();
    },
  });
  const taskStatus = useUpdateTaskStatus({
    taskId: viewedTask.id,
    currentStatus: viewedTask.status,
    assigneeId: viewedTask.assigneeId,
  });
  const taskDelete = useDeleteTask({
    taskId: viewedTask.id,
    onSuccess: onDeleted,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !taskUpdate.submitting && !taskDelete.deleting) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, taskDelete.deleting, taskUpdate.submitting]);

  const isDirty = currentTask !== null && (
    taskUpdate.title !== currentTask.title ||
    taskUpdate.description !== (currentTask.description ?? "") ||
    taskUpdate.priority !== currentTask.priority ||
    taskUpdate.assigneeId !== (currentTask.assigneeId?.toString() ?? "") ||
    taskUpdate.dueDate !== (currentTask.dueDate ?? "")
  );

  async function handleStatusChange(status: "todo" | "in-progress" | "done") {
    const updated = await taskStatus.changeStatus(toTaskStatus(status));
    if (updated) {
      refetch();
      onSaved?.();
    }
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center overflow-hidden bg-gray-900/45 px-4 pt-20 backdrop-blur-sm sm:px-8 sm:pt-24"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-view-title"
        className="relative w-full max-w-3xl border border-gray-900 bg-[#f5f3ee] p-4 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          aria-label="Close task details"
          title="Close task details"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer border border-gray-400 p-1 text-gray-700 transition hover:border-gray-900 hover:bg-white hover:text-gray-900"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {loading && <p className="font-mono text-sm text-gray-600">Loading task...</p>}
        {taskError && <p role="alert" className="border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">{taskError}</p>}

        {!loading && (
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-mono text-sm uppercase text-gray-500">Task details</p>
              <h2 id="task-view-title" className="font-geist text-3xl font-semibold">{viewedTask.title}</h2>
            </div>

            <label className="flex flex-col gap-1 font-mono text-sm text-gray-600">
              Title
              <input className="border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" value={taskUpdate.title} onChange={(event) => taskUpdate.setTitle(event.target.value)} />
            </label>

            <label className="flex flex-col gap-1 font-mono text-sm text-gray-600">
              Description
              <textarea className="min-h-16 resize-y border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" value={taskUpdate.description} onChange={(event) => taskUpdate.setDescription(event.target.value)} rows={2} />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex min-w-0 flex-col gap-1 font-mono text-sm text-gray-600">
                Priority
                <select className="w-full border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" value={taskUpdate.priority} onChange={(event) => taskUpdate.setPriority(event.target.value as Task["priority"])}>
                  <option value="LOW">Low</option>
                  <option value="MED">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </label>

              <label className="flex min-w-0 flex-col gap-1 font-mono text-sm text-gray-600">
                Assignee ID
                <input className="w-full border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" type="number" value={taskUpdate.assigneeId} onChange={(event) => taskUpdate.setAssigneeId(event.target.value)} />
              </label>

              <label className="flex min-w-0 flex-col gap-1 font-mono text-sm text-gray-600">
                Due date
                <input className="w-full border border-gray-400 bg-white px-3 py-2 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900" type="date" value={taskUpdate.dueDate} onChange={(event) => taskUpdate.setDueDate(event.target.value)} />
              </label>

              <div className="flex flex-col gap-1 font-mono text-sm text-gray-600">
                Status
                <div className="min-h-10">
                  <StatusSelector
                    status={toStatusId(viewedTask.status)}
                    onChange={handleStatusChange}
                    disabled={taskStatus.updating}
                  />
                </div>
              </div>
            </div>

            {(taskUpdate.error || taskStatus.error || taskDelete.error) && (
              <p role="alert" className="border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
                {taskUpdate.error || taskStatus.error || taskDelete.error}
              </p>
            )}

            <div className="flex flex-col gap-2 border-t border-gray-400 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" disabled={taskDelete.deleting} onClick={taskDelete.removeTask} className="cursor-pointer border border-red-400 bg-red-100 px-4 py-2.5 font-mono text-red-700 transition hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-60">
                {taskDelete.deleting ? "Deleting..." : "Delete task"}
              </button>
              <button type="button" disabled={!isDirty || !taskUpdate.valid || taskUpdate.submitting} onClick={() => taskUpdate.handleSubmit({ preventDefault: () => undefined } as React.FormEvent)} className="cursor-pointer border border-gray-900 bg-gray-900 px-4 py-2.5 font-mono text-white transition hover:bg-lime-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60">
                {taskUpdate.submitting ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

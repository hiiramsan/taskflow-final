import { ChevronDown, Plus, Search } from "lucide-react";

export type StatusFilter = "ALL" | "TODO" | "IN_PROGRESS" | "DONE";
export type PriorityFilter = "ALL" | "LOW" | "MED" | "HIGH";

interface TasksOptionsBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityChange: (value: PriorityFilter) => void;
  onNewTask: () => void;
}

export default function TasksOptionsBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onNewTask,
}: TasksOptionsBarProps) {
  return (
    <div className="flex flex-col gap-3 border-y border-gray-400 py-4 lg:flex-row lg:items-center">
      <label className="relative flex min-w-0 flex-1 items-center">
        <Search size={18} className="pointer-events-none absolute left-3 text-gray-500" />
        <span className="sr-only">Search tasks by name</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks by name"
          className="w-full border border-gray-400 bg-white py-3 pl-10 pr-3 text-base text-gray-900 outline-none transition focus:border-gray-900 font-mono"
        />
      </label>

      <div className="relative">
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          aria-label="Filter tasks by status"
          className="appearance-none border border-gray-400 bg-white px-3 py-3 pr-9 font-mono text-sm text-gray-700 outline-none transition focus:border-gray-900 cursor-pointer"
        >
          <option value="ALL">All statuses</option>
          <option value="TODO">To do</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="DONE">Done</option>
        </select>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
        />
      </div>

      <div className="relative">
        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value as PriorityFilter)}
          aria-label="Filter tasks by priority"
          className="appearance-none border border-gray-400 bg-white px-3 py-3 pr-9 font-mono text-sm text-gray-700 outline-none transition focus:border-gray-900 cursor-pointer"
        >
          <option value="ALL">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MED">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
        />
      </div>

      <button
        type="button"
        onClick={onNewTask}
        className="flex cursor-pointer items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-4 py-3 font-mono text-white transition hover:bg-lime-500 hover:text-gray-900"
      >
        <Plus size={18} strokeWidth={1.5} />
        <span>New task</span>
      </button>
    </div>
  );
}

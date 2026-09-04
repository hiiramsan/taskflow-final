import type { Task } from "../types";
import TaskCard from "./TaskCard";

interface TasksListProps {
  filteredTasks: Task[];
  onStatusChange?: (taskId: number, status: Task['status']) => void;
  onStatusRollback?: (taskId: number, status: Task['status']) => void;
  onTaskClick?: (task: Task) => void;
}

export default function TasksList({ filteredTasks, onStatusChange, onStatusRollback, onTaskClick }: TasksListProps) {
  return (
    <section className="grid grid-cols-3 divide-x divide-gray-400">
      {/* Seccion TODO */}
      <div className="pr-4 column">
        <div className="tab-header flex flex-row justify-start items-center gap-2 border-b border-gray-900 py-1 mb-4">
          <div className="p-1 rounded-full bg-gray-600"></div>
          <p className="font-mono uppercase text-gray-600">TO DO</p>
        </div>
        <div className="card-container flex flex-col gap-4">
          {filteredTasks
            .filter((task) => task.status === "TODO")
            .map((task) => (
              <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} onStatusRollback={onStatusRollback} onClick={() => onTaskClick?.(task)} />
            ))}
        </div>
      </div>

      {/* Seccion IN PROGRESS */}
      <div className="px-6 column">
        <div className="tab-header flex flex-row justify-start items-center gap-2 border-b border-gray-900 py-1 mb-4">
          <div className="p-1 rounded-full bg-yellow-600"></div>
          <p className="font-mono uppercase text-gray-600">IN PROGRESS</p>
        </div>
        <div className="card-container flex flex-col gap-4">
          {filteredTasks
            .filter((task) => task.status === "IN_PROGRESS")
            .map((task) => (
              <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} onStatusRollback={onStatusRollback} onClick={() => onTaskClick?.(task)} />
            ))}
        </div>
      </div>

      {/* Seccion DONE */}
      <div className="px-6 column">
        <div className="tab-header flex flex-row justify-start items-center gap-2 border-b border-gray-900 py-1 mb-4">
          <div className="p-1 rounded-full bg-green-600"></div>
          <p className="font-mono uppercase text-gray-600">DONE</p>
        </div>
        <div className="card-container flex flex-col gap-4">
          {filteredTasks
            .filter((task) => task.status === "DONE")
            .map((task) => (
              <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} onStatusRollback={onStatusRollback} onClick={() => onTaskClick?.(task)} />
            ))}
        </div>
      </div>
    </section>
  );
}

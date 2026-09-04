import { CalendarDays } from "lucide-react"
import { useState } from "react"
import StatusSelector from "./StatusSelector"
import type { Task } from "../types";
import { formatDueDate } from "../utils/formatDate";
import { useUpdateTaskStatus } from "../hooks/tasks/useUpdateTaskStatus";

interface TaskCardProps {
    task: Task;
    onStatusChange?: (taskId: number, status: Task['status']) => void;
    onStatusRollback?: (taskId: number, status: Task['status']) => void;
    onClick?: () => void;
}

const priorityStyles = {
    LOW: {
        badge: "border-green-300 bg-green-100",
        dot: "bg-green-300",
        text: "text-green-700",
    },
    MED: {
        badge: "border-yellow-300 bg-yellow-50",
        dot: "bg-yellow-300",
        text: "text-yellow-700",
    },
    HIGH: {
        badge: "border-red-300 bg-red-100",
        dot: "bg-red-400",
        text: "text-red-700",
    },
}

const TaskCard = ({ task, onStatusChange, onStatusRollback, onClick }: TaskCardProps) => {

    const { updating, error, changeStatus } = useUpdateTaskStatus({
        taskId: task.id,
        currentStatus: task.status,
        assigneeId: task.assigneeId,
        onOptimisticUpdate: (status) => onStatusChange?.(task.id, status),
        onRollback: (status) => onStatusRollback?.(task.id, status),
    });

    const handleStatusChange = async (newStatus: Task["status"]) => {
        await changeStatus(newStatus);
    };

    const [statusSelectorOpen, setStatusSelectorOpen] = useState(false)
    const priorityStyle = priorityStyles[task.priority]

    return (
        <div
            className={`${statusSelectorOpen ? "relative z-20" : ""} border border-gray-400 hover:bg-white bg-[#F9F7F4] cursor-pointer hover:border-[#333] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#B3B3B3] p-4 flex flex-col gap-4`}
            onClick={onClick}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onClick?.();
            }}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className="card-head flex flex-row justify-between items-start">
                <div>
                    <p className="font-bold text-sm">{task.title}</p>
                    <p className="text-sm font-mono">{task.description}</p>
                </div>
                <div className={`flex flex-row items-center justify-between rounded-full border py-0.5 px-2 text-xs gap-1 ${priorityStyle.badge}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`}></div>
                    <p className={`uppercase font-mono ${priorityStyle.text}`}>{task.priority}</p>
                </div>
            </div>
            <div className="flex row justify-between">
                <div className="flex gap-2 items-center justify-between">
                    <CalendarDays size={16} />
                    <p className="font-mono text-sm">{task.dueDate ? formatDueDate(task.dueDate) : 'No due date'}</p>
                </div>
                <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                    <StatusSelector
                        status={task.status === "IN_PROGRESS" ? "in-progress" : task.status === "DONE" ? "done" : "todo"}
                        onOpenChange={setStatusSelectorOpen}
                        disabled={updating}
                        onChange={(newStatus) => {
                            handleStatusChange(newStatus === "in-progress" ? "IN_PROGRESS" : newStatus === "done" ? "DONE" : "TODO")
                        }}
                    />
                </div>
            </div>
            {error && <p role="alert" className="text-right text-xs text-red-700">{error}</p>}

        </div>
    )
}

export default TaskCard
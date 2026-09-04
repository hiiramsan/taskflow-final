import type { PriorityFilter, StatusFilter } from "../components/TasksOptionsBar";
import type { Task } from "../types";

export function filterTasks(
  tasks: Task[],
  searchTerm: string,
  statusFilter: StatusFilter,
  priorityFilter: PriorityFilter,
): Task[] {
  const normalizedSearch = searchTerm.toLowerCase();

  return tasks.filter((task) => {
    const matchesName = task.title.toLowerCase().includes(normalizedSearch);
    const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesName && matchesStatus && matchesPriority;
  });
}
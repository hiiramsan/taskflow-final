
import { Link, useNavigate, useParams } from "react-router-dom"
import { useProject } from "../hooks/projects/useProject";
import { useUpdateProject } from "../hooks/projects/useUpdateProject";
import { useDeleteProject } from "../hooks/projects/useDeleteProject";
import { useTasks } from "../hooks/tasks/useTasks";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useState } from "react";
import TasksList from "../components/TasksList";
import TaskViewModal from "../components/TaskViewModal";
import { TaskForm } from "../components/TaskForm";
import DeleteProjectModal from "../components/DeleteProjectModal";
import TasksOptionsBar, {
  type PriorityFilter,
  type StatusFilter,
} from "../components/TasksOptionsBar";
import { useCreateTask } from "../hooks/tasks/useCreateTask";
import { ProjectForm } from "../components/ProjectForm";
import type { Task } from "../types";

const ProjectPage = () => {

  const { projectId } = useParams();
  const navigate = useNavigate();

  const id = Number(projectId);
  const validId = Number.isNaN(id) ? null : id;

  const { project, loading: projectLoading, error: projectError, refetch: refetchProject } = useProject(validId)
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const projectUpdate = useUpdateProject({
    project,
    onSuccess: () => {
      setProjectFormOpen(false);
      refetchProject();
    },
  });
  const { deleteProject, deleting, error: deleteError } = useDeleteProject({
    projectId: validId,
    onSuccess: () => navigate('/dashboard'),
  });

  const { tasks, loading: tasksLoading, error: tasksError, refetch, addTask, replaceTask, removeTask, updateTaskStatus } = useTasks(validId);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('ALL');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const taskForm = useCreateTask({
    projectId: validId,
    onOptimisticAdd: addTask,
    onSuccess: (createdTask, optimisticTaskId) => {
      replaceTask(optimisticTaskId, createdTask);
      setTaskFormOpen(false);
    },
    onRollback: removeTask,
  });

  if (projectLoading) return <div className="flex min-h-screen items-center justify-center"><LoaderCircle className="animate-spin text-gray-600" size={32} aria-label="Loading project" /></div>
  if (projectError) return <p>Failed to fetch project</p>
  if (!project) return <p>Project not found lol</p>
  if (tasksLoading) return <div className="flex min-h-screen items-center justify-center"><LoaderCircle className="animate-spin text-gray-600" size={32} aria-label="Loading tasks" /></div>;
  if (tasksError) return <p>Failed to fetch tasks</p>;

  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;
    return matchesName && matchesStatus && matchesPriority;
  });

  return (
    <main className="flex flex-col min-h-screen w-full p-20 gap-4">
      <div className="flex flex-col gap-">
        <Link to={'/dashboard'} className="flex flex-row gap-2 items-center hover:underline">
          <ArrowLeft color="gray" size={16} />
          <p className="uppercase font-mono text-gray-500">Go back to projects</p>
        </Link>
        <div className="flex flex-row justify-between items-end gap-2">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-5xl">{project.name}</h1>
            <p className="font-mono text-gray-700">{project.description}</p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setProjectFormOpen(true);
              }}
              className="font-mono border border-gray-400 py-1 px-2 cursor-pointer hover:bg-white transition-all duration-300 ease-in-out hover:-translate-y-1"
            >
              Update Project
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={() => setDeleteModalOpen(true)}
              className="font-mono border border-red-400 bg-red-100 py-1 px-2 cursor-pointer hover:bg-red-300 transition-all duration-300 ease-in-out hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? 'Deleting...' : 'Delete Project'}
            </button>
          </div>

        </div>
      </div>
      <TasksOptionsBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        onNewTask={() => setTaskFormOpen(true)}
      />

      <TasksList
        filteredTasks={filteredTasks}
        onStatusChange={updateTaskStatus}
        onStatusRollback={updateTaskStatus}
        onTaskClick={setSelectedTask}
      />

      {selectedTask && (
        <TaskViewModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSaved={() => {
            setSelectedTask(null);
            refetch();
          }}
          onDeleted={() => {
            setSelectedTask(null);
            refetch();
          }}
        />
      )}

      {taskFormOpen && (
        <TaskForm {...taskForm} onClose={() => setTaskFormOpen(false)} />
      )}

      {projectFormOpen && (
        <ProjectForm
          {...projectUpdate}
          title="Update project"
          submitLabel="Update project"
          onClose={() => setProjectFormOpen(false)}
        />
      )}

      {deleteModalOpen && (
        <DeleteProjectModal
          deleting={deleting}
          error={deleteError}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={deleteProject}
        />
      )}

    </main>
  )
}

export default ProjectPage;
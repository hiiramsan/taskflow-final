import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom"
import { TaskForm } from "../components/TaskForm";
import { useProject } from "../hooks/useProject";
import { useTasks } from "../hooks/useTasks";
import { useCreateTask } from "../hooks/useCreateTask";

const ProjectPage = () => {

  const { projectId } = useParams();

  const id = Number(projectId);
  const validId = Number.isNaN(id) ? null : id;

  const { project, loading: projectLoading, error: projectError } = useProject(validId)

  const {tasks, loading: tasksLoading, error: tasksError, refetch} = useTasks(validId);
  const [formOpen, setFormOpen] = useState(false);
  const taskForm = useCreateTask({
    projectId: validId,
    onSuccess: () => {
      setFormOpen(false);
      refetch();
    },
  });

  if(projectLoading) return  <p>Loading...</p>
  if(projectError) return <p>Failed to fetch project</p>
  if(!project) return <p>Project not found lol</p>
  if (tasksLoading) return <p>Loading tasks...</p>;
  if (tasksError) return <p>Failed to fetch tasks</p>;

  console.log(tasks)

  return (
    <main className="todo-page">
      <div className="todo-page-header">
        <h1>{project.name}</h1>
        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Nueva tarea
        </Button>
      </div>
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Nueva tarea</DialogTitle>
        <DialogContent>
          <TaskForm
            {...taskForm}
          />
        </DialogContent>
      </Dialog>
      <div className="todo-list">
        {tasks.map(task => (
          <article className="todo-item" key={task.id}>
            <div className="todo-item-content">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className="todo-item-details">
              <p>Due: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <span className="todo-status">{task.status}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ProjectPage
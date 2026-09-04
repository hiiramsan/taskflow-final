import type { NewTask, Task } from "../types";
import { httpClient } from "./httpClient";

export async function getTasks(projectId: number | null): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(`/projects/${projectId}/tasks`)
    return response.data;
}

export async function createProjectTask(body: NewTask, projectId: number): Promise<Task> {
    const { data } = await httpClient.post<Task>(`/projects/${projectId}/tasks`, body);
    return data;
}

export async function updateTask(body: NewTask, taskId: number): Promise<Task> {
    const { data } = await httpClient.put<Task>(`/tasks/${taskId}`, body);
    return data;
}

export async function deleteTask(taskId: number): Promise<void> {
    await httpClient.delete(`/tasks/${taskId}`);
}

export async function getTaskById(taskId: number): Promise<Task> {
    const { data } = await httpClient.get<Task>(`/tasks/${taskId}`);
    return data;
}

export async function updateTaskStatus(taskId: number, status: Task['status']): Promise<Task> {
    const { data } = await httpClient.patch<Task>(`/tasks/${taskId}/status`, { status });
    return data;
}


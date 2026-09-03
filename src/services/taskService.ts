import type { NewTask, Task } from "../types";
import { httpClient } from "./httpClient";

export async function getTasks(projectId: number | null): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(`/projects/${projectId}/tasks`)
    console.log("Tasks API response:", response.data);
    return response.data;
}

export async function createProjectTask(body: NewTask, projectId: number): Promise<Task> {
    const { data } = await httpClient.post<Task>(`/projects/${projectId}/tasks`, body);
    return data;

}


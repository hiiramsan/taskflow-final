import { httpClient } from './httpClient'
import type { NewProject, Project } from '../types'

export async function getProjects(): Promise<Project[]> {
  const { data } = await httpClient.get<Project[]>('/projects')
  return data
}

export async function createProject(body: NewProject): Promise<Project> {
  const { data } = await httpClient.post<Project>('/projects', body)
  return data
}

export async function getProjectById(id: number | null): Promise<Project> {
  if (id === null) {
    throw new Error('A project ID is required to fetch a project')
  }
  const { data } = await httpClient.get<Project>(`/projects/${id}`);
  return data;
}

export async function deleteProjectById(id: number | null): Promise<void> {
  if (id === null) {
    throw new Error('A project ID is required to delete a project')
  }

  await httpClient.delete(`/projects/${id}`);
}

export async function updateProjectById(id: number | null, body: NewProject): Promise<Project> {
  if (id === null) {
    throw new Error('A project ID is required to update a project')
  }
  const { data } = await httpClient.put<Project>(`/projects/${id}`, body)
  return data
}


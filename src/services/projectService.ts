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
  const {data} = await httpClient.get<Project>(`/projects/${id}`);
  return data;
}
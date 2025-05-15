'use server'

import { env } from 'cloudflare:workers'
import { adjustProbability } from '@/utils'
import { Task } from './types'

const remoteResourcesPath = env.REMOTE_RESOURCES_PATH || import.meta.env.VITE_REMOTE_RESOURCES_PATH

export async function listTasks() {
  const response = await fetch(remoteResourcesPath, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
  const tasks = response.ok ? ((await response.json()) as unknown as Task[]) : []
  return tasks.sort((a, b) =>
    b.createdAt && a.createdAt ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : 0
  )
}

export async function createTask(formData: FormData) {
  const probability = formData.get('probability')
  const newTask: Omit<Task, 'id'> = {
    createdAt: new Date().toISOString(),
    name: formData.get('taskName') as string,
    description: formData.get('description') as string,
    dueAt: formData.get('dueAt') as string,
    probability: probability ? Number(probability as string) : null,
  }
  await fetch(remoteResourcesPath, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newTask),
  })
}

export async function patchTask(formData: FormData) {
  const id = formData.get('id') as string
  const description = formData.get('description') as string
  const probability = adjustProbability(Number(formData.get('probability') as string), description)
  const updatedTask: Partial<Omit<Task, 'id' | 'createdAt'>> = {
    name: formData.get('taskName') as string,
    description,
    dueAt: formData.get('dueAt') as string,
    probability,
  }
  await fetch(`${remoteResourcesPath}/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updatedTask),
  })
  return updatedTask
}

export async function deleteTask(formData: FormData) {
  const id = formData.get('id') as string
  await fetch(`${remoteResourcesPath}/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  })
}

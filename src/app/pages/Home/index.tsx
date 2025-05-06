'use server'

import { Suspense } from 'react'
import { createTask, listTasks } from './actions'
import { TaskItem } from './TaskItem'

export function TaskForm() {
  return (
    <form action={createTask} className="mb-6 flex flex-col gap-2">
      <input
        type="text"
        name="taskName"
        placeholder="Task name"
        className="w-full p-2 border outline-0 border-neutral-300 focus:border-neutral-600 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Task description"
        className="w-full p-2 border outline-0 border-neutral-300 focus:border-neutral-600 rounded"
        required
      />
      <input
        type="datetime-local"
        name="dueAt"
        className="w-full p-2 border outline-0 border-neutral-300 focus:border-neutral-600 rounded"
        required
      />
      <input
        type="number"
        name="probability"
        min={0}
        max={100}
        className="w-full p-2 border outline-0 border-neutral-300 focus:border-neutral-600 rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
        {'Add task'}
      </button>
    </form>
  )
}

export async function HomeContent() {
  const sortedTasks = await listTasks()

  return (
    <>
      <TaskForm />
      <div className="space-y-4">
        <p className="font-semibold">{`You have ${sortedTasks.length} task${sortedTasks.length == 1 ? '' : 's'}`}</p>
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  )
}

export async function Home() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">{'Loading...'}</div>}>
        <HomeContent />
      </Suspense>
    </div>
  )
}

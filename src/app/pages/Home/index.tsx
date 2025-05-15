'use server'

import { Suspense } from 'react'
import { listTasks } from './actions'
import { TaskItem } from './TaskItem'
import { TaskForm } from './TaskForm'

export async function HomeContent() {
  const sortedTasks = await listTasks()

  return (
    <>
      <div className="flex justify-end">
        <TaskForm />
      </div>
      <hr className="my-4" />
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

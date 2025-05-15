'use client'

import { useState } from 'react'
import { TaskItem } from './TaskItem'
import { Task } from './types'

export function TaskList({ sortedTasks = [] }: { sortedTasks: Task[] }) {
  const [tasks, setTasks] = useState(sortedTasks)

  return (
    <>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </>
  )
}

'use client'

import { useEffect } from 'react'
import { TaskItem } from './TaskItem'
import { Task } from './types'
import { atom, useAtom } from 'jotai'

export const tasksAtom = atom<Task[]>([])

export function TaskList({ sortedTasks = [] }: { sortedTasks: Task[] }) {
  const [tasks, setTasks] = useAtom(tasksAtom)

  useEffect(() => {
    setTasks(sortedTasks)
  }, [setTasks, sortedTasks])

  return (
    <>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </>
  )
}

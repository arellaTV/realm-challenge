'use client'

import { Button } from '@/components/ui/button'
import { createTask } from './actions'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

export function TaskForm() {
  const [open, setOpen] = useState(false)
  const handleSubmit = async (formData: FormData) => {
    await createTask(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="cursor-pointer">New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a New Task</DialogTitle>
        <form action={handleSubmit} className="mb-6 flex flex-col gap-2">
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
      </DialogContent>
    </Dialog>
  )
}

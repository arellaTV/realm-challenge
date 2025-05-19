'use client'

import { ChangeEvent, SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react'
import { debounce, toLocalDatetimeInputValue } from '@/utils'
import { deleteTask, patchTask } from './actions'
import { Task } from './types'
import { useAtom } from 'jotai'
import { tasksAtom } from './TaskList'

export function TaskItem({ task }: { task: Task }) {
  const updateFormRef = useRef<HTMLFormElement>(null)
  const [, setTasks] = useAtom(tasksAtom)

  const [name, setName] = useState(task.name || '')
  const [description, setDescription] = useState(task.description || '')
  const [dueAt, setDueAt] = useState(task.dueAt || '')
  const [probability, setProbability] = useState(task.probability || '')

  const debouncedSave = useMemo(
    () =>
      debounce(() => {
        updateFormRef.current?.requestSubmit()
      }, 300),
    []
  )

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
      debouncedSave()
    },
    [debouncedSave]
  )

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value)
      debouncedSave()
    },
    [debouncedSave]
  )

  const handleChangeDueAt = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const localDate = new Date(event.target.value) // assumes local time
      setDueAt(localDate.toISOString()) // store as UTC ISO
      debouncedSave()
    },
    [debouncedSave]
  )

  const handleChangeProbability = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setProbability(event.target.value)
      debouncedSave()
    },
    [debouncedSave]
  )

  const handleFieldBlur = useCallback(() => {
    updateFormRef.current?.requestSubmit()
  }, [])

  const onPatch = useCallback(async (formData: FormData) => {
    const updatedTask = await patchTask(formData)
    setProbability(updatedTask.probability || '')
  }, [])

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault()

    // Remove the task from state first
    setTasks((oldTaskList) => oldTaskList.filter((oldTask) => oldTask.id !== task.id))

    // Then use the deleteTask action to send a delete API call to persist the change
    const form = new FormData()
    form.set('id', task.id.toString())
    deleteTask(form)
  }

  return (
    <div data-id={task.id} className="relative border border-neutral-400 p-4 rounded shadow">
      <form ref={updateFormRef} action={onPatch} className="flex flex-col grow">
        <input name="id" hidden value={task.id} readOnly />
        <div className="flex grow text-lg font-semibold leading-8 items-center gap-1">
          <div className="border border-transparent">{`#${task.id}`}</div>
          <input
            name="taskName"
            type="text"
            value={name}
            onChange={handleChangeName}
            onBlur={handleFieldBlur}
            maxLength={30}
            className="grow outline-0 border border-transparent hover:border-neutral-300 focus:border-neutral-600 rounded mr-24"
          />
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-600 font-medium flex items-center gap-2 justify-between">
            <div>
              {'Due: '}
              <input
                name="dueAt"
                type="datetime-local"
                value={toLocalDatetimeInputValue(dueAt)}
                onChange={handleChangeDueAt}
                onBlur={handleFieldBlur}
                className="outline-0 border border-transparent hover:border-neutral-300 focus:border-neutral-600 rounded"
              />
            </div>
            <div>
              {'Probability: '}
              <input
                name="probability"
                type="number"
                min={0}
                max={100}
                value={probability}
                onChange={handleChangeProbability}
                onBlur={handleFieldBlur}
                className="outline-0 border border-transparent hover:border-neutral-300 focus:border-neutral-600 rounded"
              />
            </div>
          </div>
          <textarea
            name="description"
            rows={3}
            value={description}
            onChange={handleChangeDescription}
            onBlur={handleFieldBlur}
            maxLength={512}
            className="leading-tight resize-none w-full outline-0 border border-transparent hover:border-neutral-300 focus:border-neutral-600 rounded"
          />
        </div>
      </form>
      <form onSubmit={handleDelete} className="absolute top-4 right-4">
        <input name="id" hidden value={task.id} readOnly />
        <button className="px-2 py-0.5 border border-red-600 text-red-600 rounded text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {'Remove'}
        </button>
      </form>
    </div>
  )
}

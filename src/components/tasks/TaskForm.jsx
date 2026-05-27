import { useState } from 'react'

const emptyTask = {
  title: '',
  priority: 'Medium',
}

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState(emptyTask)

  function handleSubmit(event) {
    event.preventDefault()

    if (!task.title.trim()) {
      return
    }

    onAddTask({
      title: task.title.trim(),
      priority: task.priority,
    })
    setTask(emptyTask)
  }

  return (
    <form className="grid gap-3 md:grid-cols-[1fr_10rem_auto]" onSubmit={handleSubmit}>
      <input
        className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        placeholder="Add today's work item..."
        value={task.title}
        onChange={(event) =>
          setTask((currentTask) => ({ ...currentTask, title: event.target.value }))
        }
      />

      <select
        className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        value={task.priority}
        onChange={(event) =>
          setTask((currentTask) => ({
            ...currentTask,
            priority: event.target.value,
          }))
        }
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button
        className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md"
        type="submit"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm

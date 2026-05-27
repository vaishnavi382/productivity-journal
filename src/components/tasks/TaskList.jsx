const priorityStyles = {
  High: 'bg-rose-50 text-rose-700 ring-rose-100',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
        No tasks match this filter.
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-soft"
        >
          <input
            checked={task.completed}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            type="checkbox"
            onChange={() => onToggleTask(task.id)}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`break-words text-sm font-bold ${
                  task.completed ? 'text-slate-400 line-through' : 'text-slate-950'
                }`}
              >
                {task.title}
              </h3>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                  priorityStyles[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {task.completed ? 'Completed' : 'Pending'}
            </p>
          </div>

          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            type="button"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  )
}

export default TaskList

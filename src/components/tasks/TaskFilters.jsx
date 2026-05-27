const filters = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
]

function TaskFilters({ activeFilter, onChange }) {
  return (
    <div className="flex rounded-lg bg-slate-100 p-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`rounded-md px-3 py-2 text-xs font-bold transition ${
            activeFilter === filter.id
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          type="button"
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilters

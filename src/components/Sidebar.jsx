const navItems = [
  { id: 'home', label: 'Home', icon: '</>' },
  { id: 'history', label: 'History', icon: '[]' },
  { id: 'dashboard', label: 'Dashboard', icon: '%%' },
]

function Sidebar({ activePage, onNavigate, diaryName, onEditName }) {
  return (
    <aside className="flex w-full flex-col justify-between border-b border-slate-200 bg-white px-4 py-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-6">
      <div>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
            DevDiary
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">{diaryName}</h2>
        </div>

        <nav className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                activePage === item.id
                  ? 'bg-slate-950 text-white shadow-soft'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
              type="button"
              onClick={() => onNavigate(item.id)}
            >
              <span className="grid h-8 w-8 place-items-center rounded-md bg-white/15 font-mono text-xs">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Profile
        </p>
        <p className="mt-2 truncate text-sm font-semibold text-slate-800">
          {diaryName}
        </p>
        <button
          className="mt-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          type="button"
          onClick={onEditName}
        >
          Edit Diary Name
        </button>
      </section>
    </aside>
  )
}

export default Sidebar

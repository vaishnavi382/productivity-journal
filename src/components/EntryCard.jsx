function EntryCard({ entry, onDelete }) {
  const entryDate = new Date(entry.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <p className="font-bold text-slate-950">{entryDate}</p>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            {entry.mood}
          </span>
          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            type="button"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <EntrySection title="Learned" text={entry.learned} />
        <EntrySection title="Built" text={entry.built} />
        <EntrySection title="Problems" text={entry.problems} />
        <EntrySection title="Solutions" text={entry.solutions} />
        <EntrySection title="Tomorrow" text={entry.goals} />
      </div>
    </article>
  )
}

function EntrySection({ title, text }) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {title}
      </h3>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
        {text}
      </p>
    </section>
  )
}

export default EntryCard

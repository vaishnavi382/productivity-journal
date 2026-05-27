import { useMemo, useState } from 'react'
import EntryCard from '../components/EntryCard'

function History({ entries, onDeleteEntry }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEntries = useMemo(() => {
    const term = searchTerm.toLowerCase()

    return entries.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    )
  }, [entries, searchTerm])

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
            History
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Previous entries
          </h1>
        </div>
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100 md:max-w-sm"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onDelete={() => onDeleteEntry(entry.id)}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No matching entries yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default History

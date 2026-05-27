import JournalForm from '../components/JournalForm'

function Home({ diaryName, entries, onAddEntry }) {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-teal-300">
          Daily developer journal
        </p>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">
          Welcome to {diaryName}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Record small wins, tricky bugs, and tomorrow's next step. Consistency
          turns everyday notes into visible progress.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl font-bold text-slate-950">
            Today's journal
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Fill each field with a short, honest note. Future you will thank
            present you.
          </p>
          <div className="mt-6">
            <JournalForm onAddEntry={onAddEntry} />
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Quick progress</h2>
          <div className="mt-5 grid gap-4">
            <InfoRow label="Entries saved" value={entries.length} />
            <InfoRow
              label="Latest mood"
              value={entries[0]?.mood || 'Start with today'}
            />
            <InfoRow
              label="Last entry"
              value={
                entries[0]
                  ? new Date(entries[0].createdAt).toLocaleDateString('en-IN')
                  : 'No entries yet'
              }
            />
          </div>
        </aside>
      </section>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-bold text-slate-900">{value}</p>
    </div>
  )
}

export default Home

function MetricCard({ accent = 'teal', label, value, note }) {
  const accents = {
    teal: 'from-teal-500 to-cyan-500',
    indigo: 'from-indigo-500 to-sky-500',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-pink-500',
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${accents[accent]}`} />
      <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
      {note && <p className="mt-2 text-sm font-medium text-slate-500">{note}</p>}
    </article>
  )
}

export default MetricCard

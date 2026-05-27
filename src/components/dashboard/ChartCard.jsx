function ChartCard({ children, title, subtitle }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-soft">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="h-72">{children}</div>
    </section>
  )
}

export default ChartCard

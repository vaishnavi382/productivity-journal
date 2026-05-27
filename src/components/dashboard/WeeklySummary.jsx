function WeeklySummary({ data }) {
  const bestDay = [...data].sort((a, b) => b.completed - a.completed)[0]

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">Weekly activity</h2>
      <p className="mt-1 text-sm text-slate-500">
        Best focus day: {bestDay?.day || 'Start tracking'}
      </p>

      <div className="mt-5 grid grid-cols-7 gap-2">
        {data.map((day) => (
          <div key={day.day} className="text-center">
            <div className="flex h-24 items-end rounded-lg bg-slate-100 p-1">
              <div
                className="w-full rounded-md bg-teal-500 transition-all"
                style={{ height: `${Math.max(day.productivity, 8)}%` }}
                title={`${day.productivity}% productive`}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500">{day.day}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeeklySummary

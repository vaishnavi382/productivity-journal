import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartCard from '../components/dashboard/ChartCard'
import MetricCard from '../components/dashboard/MetricCard'
import WeeklySummary from '../components/dashboard/WeeklySummary'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import {
  getCodingConsistencyData,
  getMoodChartData,
  getWeeklyProductivityData,
} from '../utils/charts/productivityData'
import { getPriorityCounts, getTaskAnalytics } from '../utils/taskStats'

function Dashboard({ entries, onAddTask, onDeleteTask, onToggleTask, tasks }) {
  const [filter, setFilter] = useState('all')
  const analytics = useMemo(() => getTaskAnalytics(tasks), [tasks])
  const weeklyData = useMemo(() => getWeeklyProductivityData(tasks), [tasks])
  const moodData = useMemo(() => getMoodChartData(entries), [entries])
  const consistencyData = useMemo(
    () => getCodingConsistencyData(tasks, entries),
    [entries, tasks],
  )
  const priorityData = useMemo(() => getPriorityCounts(tasks), [tasks])

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    }

    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed)
    }

    return tasks
  }, [filter, tasks])

  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-lg bg-slate-950 text-white shadow-soft">
        <div className="grid gap-6 p-6 md:p-8 xl:grid-cols-[1fr_22rem] xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-300">
              Productivity command center
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black md:text-5xl">
              Track tasks, mood, and coding consistency in one place.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Plan the day, finish the work, and let the charts show your
              developer momentum over time.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Today's productivity
            </p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-6xl font-black">
                {analytics.productivity}%
              </span>
              <span className="pb-2 text-sm font-semibold text-teal-200">
                {analytics.completedToday} tasks done
              </span>
            </div>
            <div className="mt-5 h-2 rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-teal-300 transition-all"
                style={{ width: `${analytics.productivity}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          accent="teal"
          label="Completed today"
          note="Checked off today"
          value={analytics.completedToday}
        />
        <MetricCard
          accent="amber"
          label="Pending tasks"
          note="Still waiting for focus"
          value={analytics.pendingTasks}
        />
        <MetricCard
          accent="indigo"
          label="Productivity"
          note="Based on today's list"
          value={`${analytics.productivity}%`}
        />
        <MetricCard
          accent="rose"
          label="Current streak"
          note="Days with completed tasks"
          value={`${analytics.streak} days`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
                Daily task tracker
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Today's work queue
              </h2>
            </div>
            <TaskFilters activeFilter={filter} onChange={setFilter} />
          </div>

          <div className="mt-5">
            <TaskForm onAddTask={onAddTask} />
          </div>

          <div className="mt-5">
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={onDeleteTask}
              onToggleTask={onToggleTask}
            />
          </div>
        </div>

        <WeeklySummary data={weeklyData} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Weekly productivity graph"
          subtitle="Completion percentage across the last seven days."
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="productivityFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area
                dataKey="productivity"
                fill="url(#productivityFill)"
                stroke="#0f766e"
                strokeWidth={3}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Tasks completed per day"
          subtitle="Completed and pending work for each day."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis allowDecimals={false} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="completed" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Mood tracking graph"
          subtitle="Average journal mood score from 1 to 5."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis domain={[0, 5]} stroke="#64748b" />
              <Tooltip />
              <Line
                dataKey="mood"
                dot={{ fill: '#6366f1', strokeWidth: 2 }}
                stroke="#6366f1"
                strokeWidth={3}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Coding consistency chart"
          subtitle="Finished tasks compared with journal entries."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consistencyData}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis allowDecimals={false} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="tasks" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              <Bar dataKey="journal" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[18rem_1fr] lg:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Priority balance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick split of high, medium, and low priority work.
            </p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={priorityData}
                  dataKey="value"
                  fill="#14b8a6"
                  innerRadius={55}
                  label
                  nameKey="name"
                  outerRadius={90}
                  paddingAngle={4}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

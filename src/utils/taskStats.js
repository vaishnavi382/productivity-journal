export function getDateKey(dateValue) {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getDayLabel(dateValue) {
  return new Date(dateValue).toLocaleDateString('en-IN', {
    weekday: 'short',
  })
}

export function getLastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (6 - index))

    return {
      key: getDateKey(date),
      label: getDayLabel(date),
    }
  })
}

export function getTasksForDate(tasks, dateKey) {
  return tasks.filter((task) => getDateKey(task.createdAt) === dateKey)
}

export function getCompletedTasksForDate(tasks, dateKey) {
  return tasks.filter(
    (task) => task.completed && task.completedAt && getDateKey(task.completedAt) === dateKey,
  )
}

export function getTaskAnalytics(tasks) {
  const todayKey = getDateKey(new Date())
  const todayTasks = getTasksForDate(tasks, todayKey)
  const completedToday = getCompletedTasksForDate(tasks, todayKey).length
  const pendingTasks = tasks.filter((task) => !task.completed).length
  const activeToday = todayTasks.length + tasks.filter(
    (task) =>
      task.completed &&
      task.completedAt &&
      getDateKey(task.completedAt) === todayKey &&
      getDateKey(task.createdAt) !== todayKey,
  ).length
  const productivity =
    activeToday === 0 ? 0 : Math.round((completedToday / activeToday) * 100)

  return {
    completedToday,
    pendingTasks,
    productivity,
    streak: getTaskStreak(tasks),
    todayTasks,
  }
}

export function getTaskStreak(tasks) {
  const completedDays = new Set(
    tasks
      .filter((task) => task.completed && task.completedAt)
      .map((task) => getDateKey(task.completedAt)),
  )

  let streak = 0
  const currentDay = new Date()
  currentDay.setHours(0, 0, 0, 0)

  while (completedDays.has(getDateKey(currentDay))) {
    streak += 1
    currentDay.setDate(currentDay.getDate() - 1)
  }

  return streak
}

export function getPriorityCounts(tasks) {
  return ['High', 'Medium', 'Low'].map((priority) => ({
    name: priority,
    value: tasks.filter((task) => task.priority === priority).length,
  }))
}

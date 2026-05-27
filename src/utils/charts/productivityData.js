import { getDateKey, getLastSevenDays } from '../taskStats'

const moodScores = {
  Focused: 5,
  Happy: 4,
  Curious: 3,
  Tired: 2,
  Stuck: 1,
}

function getMoodScore(moodText = '') {
  const moodName = Object.keys(moodScores).find((mood) => moodText.includes(mood))

  return moodName ? moodScores[moodName] : 0
}

export function getWeeklyProductivityData(tasks) {
  return getLastSevenDays().map((day) => {
    const dayTasks = tasks.filter((task) => getDateKey(task.createdAt) === day.key)
    const completed = tasks.filter(
      (task) =>
        task.completed &&
        task.completedAt &&
        getDateKey(task.completedAt) === day.key,
    ).length
    const activeTaskCount =
      dayTasks.length +
      tasks.filter(
        (task) =>
          task.completed &&
          task.completedAt &&
          getDateKey(task.completedAt) === day.key &&
          getDateKey(task.createdAt) !== day.key,
      ).length

    return {
      day: day.label,
      completed,
      pending: dayTasks.filter((task) => !task.completed).length,
      productivity:
        activeTaskCount === 0 ? 0 : Math.round((completed / activeTaskCount) * 100),
    }
  })
}

export function getMoodChartData(entries) {
  return getLastSevenDays().map((day) => {
    const dayEntries = entries.filter((entry) => getDateKey(entry.createdAt) === day.key)
    const totalMood = dayEntries.reduce(
      (sum, entry) => sum + getMoodScore(entry.mood),
      0,
    )

    return {
      day: day.label,
      mood: dayEntries.length === 0 ? 0 : Math.round(totalMood / dayEntries.length),
      entries: dayEntries.length,
    }
  })
}

export function getCodingConsistencyData(tasks, entries) {
  return getLastSevenDays().map((day) => ({
    day: day.label,
    tasks: tasks.filter(
      (task) =>
        task.completed &&
        task.completedAt &&
        getDateKey(task.completedAt) === day.key,
    ).length,
    journal: entries.filter((entry) => getDateKey(entry.createdAt) === day.key).length,
  }))
}

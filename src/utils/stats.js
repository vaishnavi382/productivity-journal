export function getEntryDate(entry) {
  return new Date(entry.createdAt).toDateString()
}

export function getCurrentStreak(entries) {
  if (entries.length === 0) {
    return 0
  }

  const entryDays = new Set(entries.map(getEntryDate))
  let streak = 0
  const currentDay = new Date()

  while (entryDays.has(currentDay.toDateString())) {
    streak += 1
    currentDay.setDate(currentDay.getDate() - 1)
  }

  return streak
}

export function getMostCommonMood(entries) {
  if (entries.length === 0) {
    return 'No mood yet'
  }

  const moodCounts = entries.reduce((counts, entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1
    return counts
  }, {})

  return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]
}

export function getProductiveDaysCount(entries) {
  return new Set(entries.map(getEntryDate)).size
}

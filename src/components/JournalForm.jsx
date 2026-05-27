import { useState } from 'react'
import { moods } from '../data/moods'

const emptyForm = {
  learned: '',
  built: '',
  problems: '',
  solutions: '',
  goals: '',
  mood: moods[0].label,
}

function JournalForm({ onAddEntry }) {
  const [formData, setFormData] = useState(emptyForm)

  function updateField(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...formData,
    }

    onAddEntry(newEntry)
    setFormData(emptyForm)
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Textarea
        label="What did you learn today?"
        value={formData.learned}
        onChange={(value) => updateField('learned', value)}
      />
      <Textarea
        label="What did you build today?"
        value={formData.built}
        onChange={(value) => updateField('built', value)}
      />
      <Textarea
        label="Problems faced today"
        value={formData.problems}
        onChange={(value) => updateField('problems', value)}
      />
      <Textarea
        label="How did you solve them?"
        value={formData.solutions}
        onChange={(value) => updateField('solutions', value)}
      />
      <Textarea
        label="Tomorrow goals"
        value={formData.goals}
        onChange={(value) => updateField('goals', value)}
      />

      <label className="text-sm font-semibold text-slate-700">
        Mood
        <select
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          value={formData.mood}
          onChange={(event) => updateField('mood', event.target.value)}
        >
          {moods.map((mood) => (
            <option key={mood.value} value={mood.label}>
              {mood.icon} - {mood.label}
            </option>
          ))}
        </select>
      </label>

      <button
        className="rounded-lg bg-teal-600 px-5 py-3 font-bold text-white transition hover:bg-teal-700"
        type="submit"
      >
        Save Entry
      </button>
    </form>
  )
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <textarea
        className="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default JournalForm

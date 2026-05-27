import { useState } from 'react'

function NameModal({ currentName, onSave }) {
  const [name, setName] = useState(currentName)

  function handleSubmit(event) {
    event.preventDefault()

    if (name.trim()) {
      onSave(name.trim())
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4">
      <form
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft"
        onSubmit={handleSubmit}
      >
        <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
          Welcome to DevDiary
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Name your diary
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use your name, a nickname, or a custom title like CodeJourney or My
          Dev Log.
        </p>
        <label className="mt-6 block text-sm font-semibold text-slate-700">
          Diary name
          <input
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            placeholder="Vaishnavi's Diary"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button
          className="mt-5 w-full rounded-lg bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-teal-700"
          type="submit"
        >
          Start Journaling
        </button>
      </form>
    </div>
  )
}

export default NameModal

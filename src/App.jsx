import { useState } from 'react'
import NameModal from './components/NameModal'
import Sidebar from './components/Sidebar'
import { useLocalStorage } from './hooks/useLocalStorage'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Home from './pages/Home'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [isEditingName, setIsEditingName] = useState(false)
  const [diaryName, setDiaryName] = useLocalStorage('devdiary-name', '')
  const [entries, setEntries] = useLocalStorage('devdiary-entries', [])
  const [tasks, setTasks] = useLocalStorage('devdiary-tasks', [])

  // New entries are added to the top, so the latest journal appears first.
  function addEntry(entry) {
    setEntries((currentEntries) => [entry, ...currentEntries])
    setActivePage('history')
  }

  function deleteEntry(entryId) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId),
    )
  }

  function saveDiaryName(name) {
    setDiaryName(name)
    setIsEditingName(false)
  }

  function addTask(task) {
    const newTask = {
      id: crypto.randomUUID(),
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      ...task,
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        const isCompleted = !task.completed

        return {
          ...task,
          completed: isCompleted,
          completedAt: isCompleted ? new Date().toISOString() : null,
        }
      }),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  function renderPage() {
    if (activePage === 'history') {
      return <History entries={entries} onDeleteEntry={deleteEntry} />
    }

    if (activePage === 'dashboard') {
      return (
        <Dashboard
          entries={entries}
          tasks={tasks}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
        />
      )
    }

    return (
      <Home diaryName={diaryName} entries={entries} onAddEntry={addEntry} />
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {(!diaryName || isEditingName) && (
        <NameModal currentName={diaryName} onSave={saveDiaryName} />
      )}

      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          activePage={activePage}
          diaryName={diaryName || 'My Dev Log'}
          onEditName={() => setIsEditingName(true)}
          onNavigate={setActivePage}
        />
        <main className="flex-1 p-4 md:p-8">{renderPage()}</main>
      </div>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Plus, Search, Trash2, CheckCircle2, Calendar, Clock } from 'lucide-react'
import { tasksStorage } from '../lib/storage'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: string
  priority: string
  category: string
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('moyenne')
  const [category, setCategory] = useState('personnel')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await tasksStorage.getAll()
    setTasks(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addTask = async () => {
    if (!title) return
    await tasksStorage.add({ title, description, dueDate, priority, category })
    setTitle(''); setDescription(''); setDueDate(''); setPriority('moyenne'); setCategory('personnel')
    load()
  }

  const toggleTask = async (id: string) => {
    const t = tasks.find(x => x.id === id)
    if (t) {
      await tasksStorage.toggle(id, !t.completed)
      setTasks(tasks.map(x => x.id === id ? { ...x, completed: !x.completed } : x))
    }
  }

  const deleteTask = async (id: string) => {
    await tasksStorage.delete(id)
    load()
  }

  const filteredTasks = tasks
    .filter((t) =>
      (statusFilter === 'all' || (statusFilter === 'completed' ? t.completed : !t.completed)) &&
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })

  if (loading) return <div className="text-center py-12 text-white">Chargement...</div>

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
        <Plus size={28} className="text-blue-600" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="flex-1 min-w-[140px] p-3 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-3 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-3 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50">
          <option value="faible">Faible</option>
          <option value="moyenne">Moyenne</option>
          <option value="élevée">Élevée</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50">
          <option value="personnel">Personnel</option>
          <option value="professionnel">Professionnel</option>
          <option value="famille">Famille</option>
        </select>
        <button onClick={addTask} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">Ajouter</button>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <Search size={24} className="text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="flex-1 p-3 rounded-xl border border-gray-200 focus:border-blue-400 outline-none" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-3 rounded-xl border border-gray-200 focus:border-blue-400 outline-none"
          >
            <option value="all">Toutes tâches</option>
            <option value="pending">En cours</option>
            <option value="completed">Terminées</option>
          </select>
          <button
            onClick={async () => {
              const completed = tasks.filter(t => t.completed)
              await Promise.all(completed.map((t) => tasksStorage.delete(t.id)))
              load()
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all"
          >
            Effacer terminées
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-2xl shadow-lg transition-all border ${
              task.completed
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white/70 border-white/50 hover:shadow-2xl'
            }`}
          >
            <div className="flex flex-wrap items-start gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl mt-1 ${
                  task.completed ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-200'
                }`}
              >
                <CheckCircle2 size={24} />
              </button>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`font-bold text-xl ${
                      task.completed ? 'line-through text-gray-500' : 'text-blue-900'
                    }`}
                  >
                    {task.title}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'élevée' ? 'bg-red-100 text-red-800' :
                    task.priority === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.category === 'professionnel' ? 'bg-blue-100 text-blue-800' :
                    task.category === 'famille' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.category}
                  </span>
                </div>
                {task.description && <p className="text-gray-700 mb-2">{task.description}</p>}
                {task.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} /> Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Clock size={64} className="mx-auto mb-4 opacity-50" />
          <p>Aucune tâche</p>
        </div>
      )}
    </div>
  )
}

export default Tasks

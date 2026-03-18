import { useEffect, useState } from 'react'
import { Plus, Trash2, Pin, Search, StickyNote } from 'lucide-react'
import { notesStorage } from '../lib/storage'

interface Note {
  id: string
  title: string
  content: string
  color: string
  pinned: boolean
  createdAt: string
  category: string
}

const COLORS = ['#FBBF24', '#60A5FA', '#34D399', '#F87171', '#A78BFA', '#FB923C']

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [selectedCategory, setSelectedCategory] = useState('personnel')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await notesStorage.getAll()
    // Sort: pinned first, then by date
    data.sort((a, b) => {
      if (a.pinned !== b.pinned) return b.pinned ? 1 : -1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    setNotes(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addNote = async () => {
    if (!title) return
    await notesStorage.add({ title, content, color: selectedColor, category: selectedCategory })
    setTitle(''); setContent(''); setSelectedColor(COLORS[0]); setSelectedCategory('personnel')
    load()
  }

  const togglePin = async (note: Note) => {
    await notesStorage.togglePin(note.id, !note.pinned)
    load()
  }

  const deleteNote = async (id: string) => {
    await notesStorage.delete(id)
    load()
  }

  const filteredNotes = notes
    .filter((n) => categoryFilter === 'all' || n.category === categoryFilter)
    .filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    )

  if (loading) return <div className="text-center py-12 text-white">Chargement...</div>

  return (
    <div>
      {/* Add Note Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Plus size={28} className="text-blue-600" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la note"
            className="flex-1 min-w-[150px] p-3 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50"
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu de la note..."
          rows={3}
          className="w-full p-3 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50 mb-3 resize-none"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-transform ${selectedColor === color ? 'scale-110 ring-2 ring-offset-2 ring-blue-600' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-xl border border-blue-200 focus:border-blue-400 outline-none bg-white/50"
          >
            <option value="personnel">Personnel</option>
            <option value="professionnel">Professionnel</option>
            <option value="idées">Idées</option>
          </select>
          <button
            onClick={addNote}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <Search size={24} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans les notes..."
              className="flex-1 p-3 rounded-xl border border-gray-200 focus:border-blue-400 outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-3 rounded-xl border border-gray-200 focus:border-blue-400 outline-none"
          >
            <option value="all">Toutes catégories</option>
            <option value="personnel">Personnel</option>
            <option value="professionnel">Professionnel</option>
            <option value="idées">Idées</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border-l-4"
            style={{ borderLeftColor: note.color }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    note.category === 'professionnel' ? 'bg-blue-100 text-blue-800' :
                    note.category === 'idées' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {note.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => togglePin(note)}
                  className={`p-2 rounded-lg transition-colors ${note.pinned ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  <Pin size={18} />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            {note.content && (
              <p className="text-gray-600 text-sm whitespace-pre-wrap">{note.content}</p>
            )}
            <p className="text-xs text-gray-400 mt-3">
              {new Date(note.createdAt).toLocaleDateString('fr-FR', { 
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
              })}
            </p>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <StickyNote size={64} className="mx-auto mb-4 opacity-50" />
          <p>Aucune note</p>
        </div>
      )}
    </div>
  )
}

export default Notes
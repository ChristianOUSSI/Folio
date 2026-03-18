import { db, hasFirebase } from './firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  category?: string
  address?: string
}

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate?: string
  priority?: string
  category?: string
}

interface Note {
  id: string
  title: string
  content: string
  color?: string
  pinned?: boolean
  createdAt: string
  category?: string
}

const CONTACTS_KEY = 'contacts'
const TASKS_KEY = 'tasks'
const NOTES_KEY = 'notes'

// LocalStorage helpers
function getLocal<T>(key: string): T[] {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : []
  } catch {
    return []
  }
}

function setLocal<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

// Contacts
export const contactsStorage = {
  async getAll(): Promise<{ id: string; name: string; email: string; phone: string; category: string; address: string }[]> {
    if (hasFirebase && db) {
      const snap = await getDocs(collection(db, 'contacts'))
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as any))
    }
    return getLocal(CONTACTS_KEY)
  },
  async add(data: { name: string; email: string; phone: string; category?: string; address?: string }) {
    if (hasFirebase && db) {
      const ref = await addDoc(collection(db, 'contacts'), data)
      return { id: ref.id, ...data }
    }
    const item = { id: crypto.randomUUID(), name: data.name, email: data.email, phone: data.phone || '', category: data.category || 'personnel', address: data.address || '' }
    const all = getLocal(CONTACTS_KEY)
    all.push(item)
    setLocal(CONTACTS_KEY, all)
    return item
  },
  async update(id: string, data: Partial<Contact>) {
    if (hasFirebase && db) {
      await updateDoc(doc(db, 'contacts', id), data)
      return { id, ...data }
    }
    const all = getLocal<Contact>(CONTACTS_KEY)
    const i = all.findIndex((c) => c.id === id)
    if (i >= 0) {
      all[i] = { ...all[i], ...data } as Contact
      setLocal(CONTACTS_KEY, all)
    }
    return { id, ...data } as Contact
  },
  async delete(id: string) {
    if (hasFirebase && db) {
      await deleteDoc(doc(db, 'contacts', id))
    } else {
      setLocal(CONTACTS_KEY, getLocal<Contact>(CONTACTS_KEY).filter((c) => c.id !== id))
    }
  },
}

// Tasks
export const tasksStorage = {
  async getAll(): Promise<{ id: string; title: string; description: string; completed: boolean; dueDate: string; priority: string; category: string }[]> {
    if (hasFirebase && db) {
      const snap = await getDocs(collection(db, 'tasks'))
      return snap.docs.map((d) => {
        const data = d.data() as Partial<Task>
        return { id: d.id, title: data.title || '', description: data.description || '', completed: data.completed || false, dueDate: data.dueDate || '', priority: data.priority || 'moyenne', category: data.category || 'personnel' }
      })
    }
    return getLocal<Task>(TASKS_KEY).map((t) => ({ ...t, description: t.description || '', dueDate: t.dueDate || '', priority: t.priority || 'moyenne', category: t.category || 'personnel' }))
  },
  async add(data: { title: string; description?: string; dueDate?: string; priority?: string; category?: string }) {
    if (hasFirebase && db) {
      const ref = await addDoc(collection(db, 'tasks'), { ...data, completed: false, createdAt: new Date().toISOString() })
      return { id: ref.id, ...data, completed: false, dueDate: data.dueDate || '', priority: data.priority || 'moyenne', category: data.category || 'personnel' }
    }
    const item = { id: crypto.randomUUID(), title: data.title, description: data.description || '', completed: false, dueDate: data.dueDate || '', priority: data.priority || 'moyenne', category: data.category || 'personnel' }
    const all = getLocal(TASKS_KEY)
    all.unshift(item)
    setLocal(TASKS_KEY, all)
    return item
  },
  async toggle(id: string, completed: boolean) {
    if (hasFirebase && db) {
      await updateDoc(doc(db, 'tasks', id), { completed })
    } else {
      const all = getLocal<Task>(TASKS_KEY)
      const i = all.findIndex((t) => t.id === id)
      if (i >= 0) {
        all[i].completed = completed
        setLocal(TASKS_KEY, all)
      }
    }
  },
  async delete(id: string) {
    if (hasFirebase && db) {
      await deleteDoc(doc(db, 'tasks', id))
    } else {
      setLocal(TASKS_KEY, getLocal<Task>(TASKS_KEY).filter((t) => t.id !== id))
    }
  },
}

// Notes
export const notesStorage = {
  async getAll(): Promise<{ id: string; title: string; content: string; color: string; pinned: boolean; createdAt: string; category: string }[]> {
    if (hasFirebase && db) {
      const snap = await getDocs(collection(db, 'notes'))
      return snap.docs.map((d) => {
        const data = d.data() as Partial<Note>
        return { id: d.id, title: data.title || '', content: data.content || '', color: data.color || '#FBBF24', pinned: data.pinned || false, createdAt: data.createdAt || '', category: data.category || 'personnel' }
      })
    }
    return getLocal<Note>(NOTES_KEY).map((n) => ({ ...n, color: n.color || '#FBBF24', pinned: n.pinned || false, category: n.category || 'personnel' }))
  },
  async add(data: { title: string; content?: string; color?: string; category?: string }) {
    if (hasFirebase && db) {
      const ref = await addDoc(collection(db, 'notes'), { ...data, pinned: false, createdAt: new Date().toISOString() })
      return { id: ref.id, ...data, pinned: false, createdAt: new Date().toISOString() }
    }
    const item = { id: crypto.randomUUID(), title: data.title, content: data.content || '', color: data.color || '#FBBF24', pinned: false, createdAt: new Date().toISOString(), category: data.category || 'personnel' }
    const all = getLocal(NOTES_KEY)
    all.unshift(item)
    setLocal(NOTES_KEY, all)
    return item
  },
  async update(id: string, data: Partial<Note>) {
    if (hasFirebase && db) {
      await updateDoc(doc(db, 'notes', id), data)
    } else {
      const all = getLocal<Note>(NOTES_KEY)
      const i = all.findIndex((n) => n.id === id)
      if (i >= 0) {
        all[i] = { ...all[i], ...data } as Note
        setLocal(NOTES_KEY, all)
      }
    }
  },
  async togglePin(id: string, pinned: boolean) {
    if (hasFirebase && db) {
      await updateDoc(doc(db, 'notes', id), { pinned })
    } else {
      const all = getLocal<Note>(NOTES_KEY)
      const i = all.findIndex((n) => n.id === id)
      if (i >= 0) {
        all[i].pinned = pinned
        setLocal(NOTES_KEY, all)
      }
    }
  },
  async delete(id: string) {
    if (hasFirebase && db) {
      await deleteDoc(doc(db, 'notes', id))
    } else {
      setLocal(NOTES_KEY, getLocal<Note>(NOTES_KEY).filter((n) => n.id !== id))
    }
  },
}

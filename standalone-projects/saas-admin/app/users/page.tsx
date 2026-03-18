"use client"
import { useState, useEffect } from 'react'
import { UserPlus, Search, Trash2, Edit3, Plus, Download } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  address?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    const method = editingId ? 'PUT' : 'POST'
    const body = editingId ? { id: editingId, name, email, role, phone, address } : { name, email, role, phone, address }

    await fetch(`/api/users${editingId ? `/${editingId}` : ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    setName('')
    setEmail('')
    setRole('user')
    setPhone('')
    setAddress('')
    setEditingId(null)
    fetchUsers()
  }

  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  const filteredUsers = users
    .filter((u) => roleFilter === 'all' || u.role === roleFilter)
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  // Export users to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Nom', 'Email', 'Téléphone', 'Adresse', 'Rôle'].join(','),
      ...users.map(u => [u.id, u.name, u.email, u.phone || '', u.address || '', u.role].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'utilisateurs_export.csv'
    link.click()
  }

  if (loading) return <div className="p-12 text-center">Chargement...</div>

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gestion Utilisateurs</h1>
          <p className="text-xl text-gray-600">CRUD complet avec API REST (mock Python backend)</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
        >
          <Download size={20} />
          Exporter CSV
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom complet"
            className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone (+237...)"
            className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Adresse (Yaoundé, Douala...)"
            className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 justify-center"
            >
              {editingId ? <><Edit3 size={20} /> Modifier</> : <><Plus size={20} /> Ajouter</>}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setName('')
                  setEmail('')
                  setRole('user')
                  setPhone('')
                  setAddress('')
                }}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[240px]">
              <Search size={24} className="text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher utilisateurs..."
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous rôles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || '-'}</td>
                  <td className="px-6 py-4 text-gray-700">{user.address || '-'}</td>
                  <td>
                    <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'manager'
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-blue-50 text-blue-800'
                    }`}
                  >
                    {user.role}
                  </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setName(user.name)
                        setEmail(user.email)
                        setPhone(user.phone || '')
                        setAddress(user.address || '')
                        setRole(user.role)
                        setEditingId(user.id)
                      }}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Aucun utilisateur trouvé
          </div>
        )}
      </div>
    </div>
  )
}


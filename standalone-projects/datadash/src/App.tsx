import { useState, useEffect } from 'react'
import { BarChart3, Users, DollarSign, Filter, Download, Moon, Sun } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts'

// Fallback local data (Python API /api/data used when deployed on Vercel)
const defaultSales = [
  { month: 'Jan', value: 2500000 }, // FCFA
  { month: 'Fév', value: 3200000 },
  { month: 'Mar', value: 4100000 },
  { month: 'Avr', value: 3800000 },
  { month: 'Mai', value: 5200000 },
  { month: 'Jun', value: 4800000 },
]

const defaultUsers = [
  { name: 'Clients actifs', value: 1200 },
  { name: 'Nouveaux clients', value: 350 },
  { name: 'Entreprises', value: 85 },
]

const COLORS = ['#3B82F6', '#60A5FA', '#2563EB']

export default function App() {
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false) // Changed to false for testing
  const [currency, setCurrency] = useState<'FCFA' | 'USD'>('FCFA')
  const [salesData, setSalesData] = useState(defaultSales)
  const [userData, setUserData] = useState(defaultUsers)

  const conversionRate = 600 // FCFA per USD
  const formatMoney = (value: number) => {
    const amount = currency === 'USD' ? value / conversionRate : value
    const formatted = amount.toLocaleString(undefined, { maximumFractionDigits: currency === 'USD' ? 2 : 0 })
    return currency === 'USD' ? `$${formatted}` : `${formatted} FCFA`
  }

  useEffect(() => {
    console.log('DataDash loaded, darkMode:', darkMode)
    fetch('/api/data')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        console.log('API data:', data)
        if (data?.sales) setSalesData(data.sales)
        if (data?.users) setUserData(data.users)
      })
      .catch((err) => console.log('API error:', err))
  }, [])

  const filteredSales = salesData
    .filter((d) => filter === 'all' || d.month.includes(filter))
    .map((d) => ({ ...d, value: currency === 'USD' ? d.value / conversionRate : d.value }))

  // Export data to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Mois', `Ventes (${currency})`].join(','),
      ...filteredSales.map(d => {
        const value = currency === 'USD' ? d.value.toFixed(2) : Math.round(d.value).toString()
        return [d.month, value].join(',')
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'ventes_datadash.csv'
    link.click()
  }

  const exportToJSON = () => {
    const data = {
      currency,
      sales: filteredSales.map(d => ({ month: d.month, value: d.value }))
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'ventes_datadash.json'
    link.click()
  }

  // bgGradient is defined but not used - using inline style instead
  
  const cardClass = darkMode
    ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white'
    : 'bg-white border border-gray-200 text-gray-800'
  
  const textClass = darkMode ? 'text-white' : 'text-gray-800'
  const textMuted = darkMode ? 'text-white/70' : 'text-gray-600'

  return (
    <div style={{ minHeight: '100vh', padding: '32px', maxWidth: '1280px', margin: '0 auto', background: darkMode ? 'linear-gradient(to bottom right, #1e293b, #334155)' : 'linear-gradient(to bottom right, #f3f4f6, #ffffff)' }}>
      {/* Header */}
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '48px', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href={import.meta.env.VITE_PORTFOLIO_URL || 'https://oussidev.vercel.app'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px', borderRadius: '50%', background: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb', color: darkMode ? 'white' : '#374151' }}
          >
            ←
          </a>
          <div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', background: darkMode ? 'linear-gradient(to right, white, #e2e8f0)' : 'linear-gradient(to right, #1f2937, #4b5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
              DataDash
            </h1>
            <p style={{ fontSize: '20px', color: darkMode ? 'rgba(255,255,255,0.8)' : '#6b7280' }}>Dashboard analytique interactif (mock Power AMC)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Export CSV Button */}
          <button
            onClick={exportToCSV}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${darkMode ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
          >
            <Download size={20} />
            Exporter CSV
          </button>

          {/* Export JSON Button */}
          <button
            onClick={exportToJSON}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
          >
            <Download size={20} />
            Exporter JSON
          </button>

          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'FCFA' ? 'USD' : 'FCFA')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${darkMode ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
          >
            <DollarSign size={18} />
            {currency}
          </button>
          
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-600'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          <div className={`flex items-center gap-2 ${textMuted}`}>
            <Filter size={20} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`backdrop-blur-md border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${darkMode ? 'bg-white/20 border-white/30 text-white focus:ring-white/50' : 'bg-white border-gray-300 text-gray-800 focus:ring-gray-400'}`}
            >
              <option value="all">Toutes périodes</option>
              <option value="Jan">Janvier</option>
              <option value="Mai">Mai</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {/* Metrics Cards */}
        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl group hover:scale-[1.02] transition-all`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <BarChart3 size={28} className="text-blue-300" />
            </div>
            <div>
              <p className={`${textMuted} text-sm`}>Ventes totales</p>
              <p className="text-3xl font-bold">23 300 000 FCFA</p>
            </div>
          </div>
          <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full w-4/5" />
          </div>
        </div>

        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl group hover:scale-[1.02] transition-all`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <Users size={28} className="text-blue-300" />
            </div>
            <div>
              <p className={`${textMuted} text-sm`}>Clients actifs</p>
              <p className="text-3xl font-bold">1 200</p>
            </div>
          </div>
          <p className="text-blue-400 text-sm font-medium">+15 % ce mois</p>
        </div>

        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl group hover:scale-[1.02] transition-all`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <DollarSign size={28} className="text-blue-300" />
            </div>
            <div>
              <p className={`${textMuted} text-sm`}>Revenu moyen</p>
              <p className="text-3xl font-bold">19 400 FCFA</p>
            </div>
          </div>
          <p className="text-blue-400 text-sm font-medium">Par utilisateur</p>
        </div>

        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl group hover:scale-[1.02] transition-all`}>
          <p className={`${textMuted} text-sm mb-2`}>Taux Conversion</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">3.8 %</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${textClass}`}>
            <BarChart3 size={28} />
            Ventes mensuelles ({currency})
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredSales}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis dataKey="month" stroke={darkMode ? 'white' : '#666'} fontSize={14} tickLine={false} axisLine={false} />
              <YAxis stroke={darkMode ? 'white' : '#666'} fontSize={14} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: darkMode ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: darkMode ? 'white' : '#333'
                }}
                formatter={(value) => formatMoney(Number(value))}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl lg:col-span-1`}>
          <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>Répartition clients</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {userData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  background: darkMode ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
                  borderRadius: '12px',
                  color: darkMode ? 'white' : '#333'
                }}
              />
              <Legend 
                wrapperStyle={{
                  color: darkMode ? 'white' : '#666'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* New Line Chart for Trends */}
      <div className="mt-8">
        <div className={`${cardClass} p-8 rounded-3xl shadow-2xl`}>
          <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>Tendance de croissance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredSales}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis dataKey="month" stroke={darkMode ? 'white' : '#666'} fontSize={14} tickLine={false} axisLine={false} />
              <YAxis stroke={darkMode ? 'white' : '#666'} fontSize={14} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: darkMode ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: darkMode ? 'white' : '#333'
                }}
                formatter={(value) => [formatMoney(Number(value)), 'Ventes']}
              />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

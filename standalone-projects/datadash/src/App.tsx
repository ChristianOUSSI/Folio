import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Users, DollarSign, Activity, ArrowUpRight, 
  Search, Bell, Settings, ArrowDownRight, MoreHorizontal, 
  CheckCircle2, Clock 
} from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart
} from 'recharts'

// Mock Data
const defaultSales = [
  { month: 'Jan', value: 2500000 },
  { month: 'Fév', value: 3200000 },
  { month: 'Mar', value: 4100000 },
  { month: 'Avr', value: 3800000 },
  { month: 'Mai', value: 5200000 },
  { month: 'Jun', value: 4800000 },
  { month: 'Jul', value: 6100000 },
]

const defaultUsers = [
  { name: 'Clients Actifs', value: 1200 },
  { name: 'Nouveaux', value: 350 },
  { name: 'Entreprises', value: 85 },
]

const recentTransactions = [
  { id: 'TRX-901', client: 'Acme Corp', avatar: 'https://i.pravatar.cc/150?u=1', amount: 1250000, date: 'Aujourd\'hui, 14:30', status: 'completed' },
  { id: 'TRX-902', client: 'Stark Industries', avatar: 'https://i.pravatar.cc/150?u=2', amount: 3400000, date: 'Aujourd\'hui, 11:15', status: 'pending' },
  { id: 'TRX-903', client: 'Wayne Enterprises', avatar: 'https://i.pravatar.cc/150?u=3', amount: 890000, date: 'Hier, 16:45', status: 'completed' },
  { id: 'TRX-904', client: 'Oscorp', avatar: 'https://i.pravatar.cc/150?u=4', amount: 2100000, date: 'Hier, 09:20', status: 'completed' },
  { id: 'TRX-905', client: 'Globex', avatar: 'https://i.pravatar.cc/150?u=5', amount: 450000, date: '08 Jui, 10:00', status: 'pending' },
]

const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4']

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function App() {
  const [currency, setCurrency] = useState<'FCFA' | 'USD'>('FCFA')
  const [salesData, setSalesData] = useState(defaultSales)
  const [userData, setUserData] = useState(defaultUsers)

  const conversionRate = 600
  const formatMoney = (value: number) => {
    const amount = currency === 'USD' ? value / conversionRate : value
    const formatted = amount.toLocaleString(undefined, { maximumFractionDigits: currency === 'USD' ? 2 : 0 })
    return currency === 'USD' ? `$${formatted}` : `${formatted} FCFA`
  }

  useEffect(() => {
    fetch('/api/data')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sales) setSalesData(data.sales)
        if (data?.users) setUserData(data.users)
      })
      .catch(() => {})
  }, [])

  const filteredSales = salesData.map((d) => ({ ...d, value: currency === 'USD' ? d.value / conversionRate : d.value }))

  const glassCard = "bg-slate-900/50 backdrop-blur-2xl border border-white/5 text-white shadow-[0_8px_30px_rgb(0,0,0,0.4)]"

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden" style={{
      backgroundImage: `
        radial-gradient(circle at 15% 0%, rgba(59, 130, 246, 0.15), transparent 25%), 
        radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15), transparent 25%),
        radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.1), transparent 30%)
      `
    }}>
      <div className="max-w-[1500px] mx-auto p-4 md:p-8">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 p-4 rounded-3xl shadow-xl z-50 sticky top-4"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <a
              href={import.meta.env.VITE_PORTFOLIO_URL || '/'}
              className="p-3 rounded-2xl transition-all hover:scale-105 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5"
            >
              ←
            </a>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                DataDash.
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher une transaction, un client..." 
              className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setCurrency(currency === 'FCFA' ? 'USD' : 'FCFA')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-white/5 bg-black/40 border border-white/10"
            >
              <DollarSign size={16} className={currency === 'USD' ? 'text-green-400' : 'text-blue-400'} />
              {currency}
            </button>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617]"></span>
              </button>
              <button className="p-2.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
              <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
              <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-8 h-8 rounded-full border border-slate-700" />
                <span className="text-sm font-medium hidden md:block">Ousmane D.</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Revenu Total', value: formatMoney(23300000), icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/20', glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]', trend: '+12.5%', isUp: true },
            { title: 'Nouveaux Clients', value: '3,200', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/20', glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]', trend: '+18.2%', isUp: true },
            { title: 'Revenu Moyen / Client', value: formatMoney(19400), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/20', glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]', trend: '-2.1%', isUp: false },
            { title: 'Taux de Conversion', value: '4.8%', icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/20', glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]', trend: '+1.2%', isUp: true }
          ].map((metric, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`${glassCard} p-6 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 ${metric.glow}`}
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{metric.title}</p>
                  <h3 className="text-2xl font-black tracking-tight">{metric.value}</h3>
                </div>
                <div className={`p-3 rounded-2xl ${metric.bg} border border-white/5`}>
                  <metric.icon size={22} className={metric.color} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 relative z-10">
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${metric.isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {metric.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{metric.trend}</span>
                </div>
                <span className="text-slate-500 text-xs ml-1 font-medium">vs mois dernier</span>
              </div>
              
              {/* Decorative background glow */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Chart */}
          <motion.div 
            custom={4} variants={cardVariants} initial="hidden" animate="visible"
            className={`${glassCard} p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-xl font-bold">Aperçu des Revenus</h2>
                <p className="text-sm text-slate-400 mt-1">Performance financière sur l'année en cours</p>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                {['Sem', 'Mois', 'Année'].map((t, idx) => (
                  <button key={t} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${idx === 2 ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[320px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredSales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(v) => `${v/1000000}M`} />
                  <RechartsTooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#60A5FA', fontWeight: 'bold' }}
                    formatter={(value) => formatMoney(Number(value))}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="url(#colorValue)" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Side Charts / Info */}
          <motion.div 
            custom={5} variants={cardVariants} initial="hidden" animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Pie Chart */}
            <div className={`${glassCard} p-6 rounded-3xl flex-1`}>
              <h2 className="text-lg font-bold mb-6">Répartition Clients</h2>
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {userData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff'
                      }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center total */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">1.6k</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                {userData.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: COLORS[index % COLORS.length], color: COLORS[index % COLORS.length] }} />
                      <span className="text-slate-300 font-medium">{entry.name}</span>
                    </div>
                    <span className="font-bold">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Transactions Table */}
        <motion.div
          custom={6} variants={cardVariants} initial="hidden" animate="visible"
          className={`${glassCard} rounded-3xl overflow-hidden flex flex-col`}
        >
          <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/20">
            <div>
              <h2 className="text-xl font-bold">Transactions Récentes</h2>
              <p className="text-sm text-slate-400 mt-1">Les 5 derniers mouvements financiers</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl">
              Voir tout
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-xs uppercase tracking-wider text-slate-400 border-b border-white/5">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Montant</th>
                  <th className="px-6 py-4 font-semibold text-center">Statut</th>
                  <th className="px-6 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-400 text-xs">{trx.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={trx.avatar} alt={trx.client} className="w-8 h-8 rounded-full border border-white/10" />
                        <span className="font-semibold text-slate-200">{trx.client}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{trx.date}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-200">
                      {formatMoney(trx.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {trx.status === 'completed' ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                            <CheckCircle2 size={14} /> Complété
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                            <Clock size={14} /> En attente
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors inline-flex">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

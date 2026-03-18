"use client"
import Link from 'next/link'
import { Users, BarChart3, ArrowRight, Download, TrendingUp, Activity, UserCheck } from 'lucide-react'

// Mock analytics data
const stats = {
  totalUsers: 1247,
  activeUsers: 892,
  newUsers: 156,
  growth: 12.5
}

const monthlyData = [
  { month: 'Jan', users: 180 },
  { month: 'Fév', users: 220 },
  { month: 'Mar', users: 280 },
  { month: 'Avr', users: 195 },
  { month: 'Mai', users: 310 },
  { month: 'Jun', users: 356 },
]

const roleDistribution = [
  { role: 'Admins', count: 45 },
  { role: 'Managers', count: 120 },
  { role: 'Users', count: 1082 },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-6">
          SaaS Admin Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Gestion simple des utilisateurs et données pour une plateforme SaaS. Backend simulé via API Next.js.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-xl mb-12 border border-blue-100">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Aperçu des statistiques</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-blue-500" />
              <span className="text-gray-600 text-sm">Total utilisateurs</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="h-6 w-6 text-green-500" />
              <span className="text-gray-600 text-sm">Utilisateurs actifs</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-medium">{Math.round(stats.activeUsers/stats.totalUsers*100)}% du total</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              <span className="text-gray-600 text-sm">Nouveaux ce mois</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">+{stats.newUsers}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-6 w-6 text-orange-500" />
              <span className="text-gray-600 text-sm">Croissance</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">+{stats.growth}%</p>
          </div>
        </div>

        {/* Simple bar chart visualization */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inscriptions mensuelles</h3>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(item.users / 400) * 100}%` }}
                />
                <span className="text-xs text-gray-600 mt-2">{item.month}</span>
                <span className="text-xs font-medium text-gray-900">{item.users}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role distribution */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Répartition par rôle</h3>
          <div className="flex gap-4">
            {roleDistribution.map((item, index) => (
              <div key={index} className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{item.role}</span>
                  <span className="font-bold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(item.count / stats.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          href="/users"
          className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-200 hover:border-blue-200 hover:-translate-y-1"
        >
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Gestion utilisateurs</h2>
          <p className="text-gray-600 mb-8 text-center">CRUD complet avec recherche, pagination et export CSV</p>
          <div className="flex items-center justify-center text-blue-600 font-semibold gap-2 hover:text-blue-700">
            Aller aux utilisateurs
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl">
          <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Données & analytics</h2>
          <p className="text-gray-600 mb-4 text-center">Statistiques en temps réel</p>
          <p className="text-sm text-green-600 font-medium text-center bg-white/50 rounded-lg py-2 px-4 inline-block">
            ✓ Fonctionnel
          </p>
        </div>

        <Link
          href="/users"
          className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          <Download className="h-16 w-16 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rapports</h2>
          <p className="text-gray-600 mb-4 text-center">Exporter vos données</p>
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
            <Download size={18} />
            Exporter CSV
          </div>
        </Link>
      </div>
    </div>
  )
}

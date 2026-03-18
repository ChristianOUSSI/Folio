import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { User, CheckSquare, Home as HomeIcon, StickyNote } from 'lucide-react'
import Contacts from './pages/Contacts'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
        <header className="bg-white/80 backdrop-blur-md shadow-lg p-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
            <HomeIcon size={28} />
            Mobile Hub
          </NavLink>
          <a 
            href={import.meta.env.VITE_PORTFOLIO_URL || 'https://oussidev.vercel.app'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-900 hover:text-blue-700 font-medium text-sm"
          >
            ← Portfolio
          </a>
        </header>
        
        <main className="p-4 pb-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
        
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t shadow-2xl">
          <div className="grid grid-cols-3 h-16">
            <NavLink 
              to="/contacts" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-2 gap-1 transition-all ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <User size={24} />
              <span className="text-xs font-medium">Contacts</span>
            </NavLink>
            <NavLink 
              to="/notes" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-2 gap-1 transition-all ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <StickyNote size={24} />
              <span className="text-xs font-medium">Notes</span>
            </NavLink>
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-2 gap-1 transition-all ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <CheckSquare size={24} />
              <span className="text-xs font-medium">Tâches</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </Router>
  )
}

const HomePage = () => (
  <div className="text-center pt-20">
    <h1 className="text-4xl font-bold text-white mb-8">Bienvenue sur Mobile Hub</h1>
    <p className="text-xl text-white/90 mb-12 max-w-md mx-auto">Gestion intuitive de vos contacts, notes et tâches quotidiennes.</p>
    <div className="space-y-4">
      <Link to="/contacts" className="block bg-white text-blue-900 font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all mx-auto max-w-sm text-center">
        Gérer Contacts
      </Link>
      <Link to="/notes" className="block bg-white/50 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/70 transition-all mx-auto max-w-sm text-center">
        Mes Notes
      </Link>
      <Link to="/tasks" className="block bg-white/30 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/50 transition-all mx-auto max-w-sm text-center">
        Gérer Tâches
      </Link>
    </div>
  </div>
)

export default App

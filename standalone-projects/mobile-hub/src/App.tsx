import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, CheckSquare, Home as HomeIcon, StickyNote, Bell, Search, ChevronRight } from 'lucide-react'
import Contacts from './pages/Contacts'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import './App.css'

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center">
        {/* Mobile Device Container wrapper */}
        <div className="w-full max-w-md bg-[#0f172a] min-h-screen relative shadow-2xl overflow-hidden">
          
          {/* Header */}
          <header className="absolute top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 pt-safe-top">
            <div className="flex items-center justify-between p-4">
              <NavLink to="/" className="flex items-center gap-2 font-black text-xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                <HomeIcon size={24} className="text-blue-400" />
                MobileHub
              </NavLink>
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
                  <Search size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800 relative">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
                </button>
                <a 
                  href={import.meta.env.VITE_PORTFOLIO_URL || '/'}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform"
                >
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">CO</span>
                  </div>
                </a>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="pt-20 pb-28 min-h-screen overflow-y-auto px-4">
            <AnimatedRoutes />
          </main>
          
          {/* Glassmorphism Bottom Nav */}
          <nav className="absolute bottom-0 w-full z-50 pb-safe-bottom">
            <div className="mx-4 mb-6 bg-slate-800/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex justify-around items-center p-2 h-16">
                <NavItem to="/contacts" icon={User} label="Contacts" />
                <NavItem to="/notes" icon={StickyNote} label="Notes" />
                <NavItem to="/tasks" icon={CheckSquare} label="Tâches" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Router>
  )
}

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center justify-center w-16 h-12 rounded-2xl transition-all duration-300 relative ${
          isActive ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div 
              layoutId="navBubble"
              className="absolute inset-0 bg-blue-500/10 rounded-2xl"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Icon size={20} className={`mb-1 relative z-10 transition-transform ${isActive ? '-translate-y-1' : ''}`} />
          <span className={`text-[10px] font-semibold relative z-10 transition-all ${isActive ? 'opacity-100' : 'opacity-0 translate-y-2 absolute'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  )
}

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </AnimatePresence>
  )
}

const HomePage = () => (
  <motion.div 
    initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.3 }}
    className="pt-4"
  >
    <div className="mb-8">
      <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Bonjour,<br/>Chris 👋</h1>
      <p className="text-slate-400">Voici votre résumé du jour.</p>
    </div>

    {/* Dashboard Grid */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Link to="/tasks" className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform group">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <CheckSquare size={20} className="text-white" />
        </div>
        <h3 className="font-bold text-white mb-1">Tâches</h3>
        <p className="text-indigo-100 text-sm opacity-80">5 à faire</p>
      </Link>
      
      <Link to="/contacts" className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-5 shadow-lg shadow-rose-500/20 active:scale-95 transition-transform group">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <User size={20} className="text-white" />
        </div>
        <h3 className="font-bold text-white mb-1">Contacts</h3>
        <p className="text-rose-100 text-sm opacity-80">142 amis</p>
      </Link>

      <Link to="/notes" className="col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-5 active:scale-95 transition-transform flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <StickyNote size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">Notes récentes</h3>
            <p className="text-slate-400 text-sm">Réunion projet SaaS</p>
          </div>
        </div>
        <ChevronRight className="text-slate-500" />
      </Link>
    </div>

    {/* Activity list */}
    <h2 className="font-bold text-lg mb-4 text-slate-200">Activité Récente</h2>
    <div className="space-y-3">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex items-center gap-4 bg-slate-800/30 p-3 rounded-2xl border border-slate-700/30">
          <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-3/4 bg-slate-700 rounded mb-2 animate-pulse"></div>
            <div className="h-3 w-1/2 bg-slate-800 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)

export default App

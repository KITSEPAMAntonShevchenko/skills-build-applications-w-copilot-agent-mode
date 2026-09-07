import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">MERGINGTON HIGH SCHOOL</p>
      <h1>Move together. Grow stronger.</h1>
      <p className="lede">
        OctoFit turns everyday movement into a shared rhythm of progress, friendly competition, and better habits.
      </p>
      <div className="overview-grid">
        <div className="overview-note">
          <span className="note-number">01</span>
          <h2>Track the little wins</h2>
          <p>Log running, walking, and strength sessions as they happen.</p>
        </div>
        <div className="overview-note accent-note">
          <span className="note-number">02</span>
          <h2>See your team rise</h2>
          <p>Compare progress with classmates and keep the momentum positive.</p>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <small>TRACKER</small></span>
        </NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="app-footer">OCTOFIT / SMALL STEPS, SHARED MOMENTUM</footer>
    </div>
  )
}

export default App

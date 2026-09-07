import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/'
    fetchCollection(endpoint, controller.signal).then(setEntries).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <DataPage eyebrow="FRIENDLY COMPETITION" title="Leaderboard" description="Celebrate consistency, effort, and the next personal best.">{error ? <ErrorMessage message={error} /> : <div className="leaderboard-list">{entries.map((entry) => <article className="leaderboard-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><strong>{entry.user?.displayName || entry.displayName || 'OctoFit member'}</strong><span>{entry.team?.name || entry.teamName || 'Team'}</span><b>{entry.points} pts</b></article>)}</div>}</DataPage>
}

export default Leaderboard
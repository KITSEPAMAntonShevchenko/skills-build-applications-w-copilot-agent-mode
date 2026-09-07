import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/'
    fetchCollection(endpoint, controller.signal).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <DataPage eyebrow="FIND YOUR PEOPLE" title="Teams" description="A little accountability makes every finish line feel closer.">{error ? <ErrorMessage message={error} /> : <div className="card-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="card-kicker">{team.members?.length || 0} MEMBERS</span><h2>{team.name}</h2><p>{team.description}</p><strong>{team.totalPoints || 0} team points</strong></article>)}</div>}</DataPage>
}

export default Teams
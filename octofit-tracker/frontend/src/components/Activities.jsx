import { useEffect, useState } from 'react'
import { displayDate, fetchCollection } from '../api.js'

export function DataPage({ eyebrow, title, description, children }) {
  return <section className="data-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p>{children}</section>
}

export function ErrorMessage({ message }) {
  return <div className="empty-state"><strong>Could not load this view.</strong><span>{message}</span></div>
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/'
    fetchCollection(endpoint, controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <DataPage eyebrow="MOVEMENT LOG" title="Activities" description="Recent sessions from across the OctoFit community.">{error ? <ErrorMessage message={error} /> : <div className="data-list">{activities.map((activity) => <article className="data-row" key={activity._id}><div><strong>{activity.user?.displayName || 'OctoFit member'}</strong><span>{activity.type}</span></div><div className="row-detail">{activity.durationMinutes} min{activity.distanceKm ? ` / ${activity.distanceKm} km` : ''}</div><div className="points">+{activity.points} pts</div><time>{displayDate(activity.completedAt)}</time></article>)}</div>}</DataPage>
}

export default Activities
import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/'
    fetchCollection(endpoint, controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <DataPage eyebrow="PERSONALIZED PICKS" title="Workouts" description="Sessions shaped around your current level and goals.">{error ? <ErrorMessage message={error} /> : <div className="card-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span className="card-kicker">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div>}</DataPage>
}

export default Workouts
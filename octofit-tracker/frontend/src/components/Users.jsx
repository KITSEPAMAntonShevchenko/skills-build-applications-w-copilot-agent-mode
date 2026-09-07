import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/'
    fetchCollection(endpoint, controller.signal).then(setUsers).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <DataPage eyebrow="THE COMMUNITY" title="Users" description="Meet the people making movement part of their week.">{error ? <ErrorMessage message={error} /> : <div className="card-grid">{users.map((user) => <article className="user-card" key={user._id}><span className="avatar">{user.displayName?.charAt(0) || '?'}</span><div><h2>{user.displayName}</h2><p>@{user.username}</p><span className="level">{user.fitnessLevel || 'beginner'}</span></div></article>)}</div>}</DataPage>
}

export default Users
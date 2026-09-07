export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return collectionFromResponse(await response.json())
}

export function displayDate(value) {
  if (!value) return 'No date'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
}
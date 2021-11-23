import { useState, MouseEventHandler, ChangeEvent } from 'react'
import ky from 'ky'

interface Twit {
  id: string
  text: string
}

export const Search = () => {
  const [query, setQuery] = useState('')
  const [statuses, setStatuses] = useState<Twit[]>([])

  const handleSearch = async () => {
    const results = await ky
      .post('/api/twitter/search', { json: { query } })
      .json()
    console.log(results)
    // setStatuses(results.data)
  }

  return (
    <div>
      <h2>Search</h2>
      <input
        type="search"
        name="query"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value)
        }}
      />
      <button onClick={handleSearch}>Search</button>

      {statuses && (
        <ul>
          {statuses.map(({ id, text }) => (
            <li key={id}>{text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

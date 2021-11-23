import { useState, MouseEventHandler, ChangeEvent } from 'react'
import ky from 'ky'

interface Twit {
  id: string
  text: string
}

type SearchResults = Twit[]

export const Search = () => {
  const [query, setQuery] = useState('')
  const [statuses, setStatuses] = useState<SearchResults>([])

  const handleSearch = async () => {
    const results: { data: SearchResults } = await ky
      .post('/api/twitter/search', { json: { query } })
      .json()
    setStatuses(results.data)
  }

  return (
    <>
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
    </>
  )
}

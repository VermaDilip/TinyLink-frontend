import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function Stats() {
  const { code } = useParams()
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  // const API_BASE = 'http://localhost:5000'

useEffect(() => {
  fetch(`${API_BASE}/api/links/${code}`)
    .then(async res => {
      const data = await res.json()
      if (res.ok) {
        setStats(data)
      } else {
        setError(data.error || "Something went wrong")
      }
    })
    .catch(() => setError('Failed to fetch stats'))
}, [code])


  if (error) return <div className="container mx-auto p-4"><p className="text-red-500">{error}</p><Link to="/" className="text-blue-500">Back to Dashboard</Link></div>

  if (!stats) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Stats for {code}</h1>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>Short Code:</strong> {stats.shortCode}</p>
        <p><strong>Original URL:</strong> <a href={stats.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{stats.originalUrl}</a></p>
        <p><strong>Total Clicks:</strong> {stats.clicks}</p>
        <p><strong>Last Clicked:</strong> {stats.lastClicked ? new Date(stats.lastClicked).toLocaleString() : 'Never'}</p>
      </div>
      <Link to="/" className="text-blue-500 mt-4 inline-block">Back to Dashboard</Link>
    </div>
  )
}

export default Stats
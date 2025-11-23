import { useState, useEffect } from 'react'

function Dashboard() {
  const [links, setLinks] = useState([])
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // const API_BASE = 'http://localhost:5000'

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/links`)
      const data = await res.json()
      setLinks(data)
    } catch (err) {
      setError('Failed to fetch links')
    }
  }

  const createLink = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`${API_BASE}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, shortCode: shortCode || undefined }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(`Link created: ${API_BASE}/${data.shortCode}`)
        setOriginalUrl('')
        setShortCode('')
        fetchLinks()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to create link')
    }
    setLoading(false)
  }

  const deleteLink = async (code) => {
    try {
      await fetch(`${API_BASE}/api/links/${code}`, { method: 'DELETE' })
      fetchLinks()
    } catch (err) {
      setError('Failed to delete link')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSuccess('Copied to clipboard')
    setTimeout(() => setSuccess(''), 2000)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">TinyLink URL Shortener</h1>
      
      <form onSubmit={createLink} className="mb-6 bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Original URL</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Custom Short Code (optional)</label>
          <input
            type="text"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full p-2 border rounded"
            pattern="[A-Za-z0-9]{6,8}"
            title="6-8 alphanumeric characters"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Short Code</th>
            <th className="p-2 text-left">Original URL</th>
            <th className="p-2 text-left">Clicks</th>
            <th className="p-2 text-left">Last Clicked</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.shortCode} className="border-t">
              <td className="p-2">
                <button
                  onClick={() => copyToClipboard(`${window.location.origin}/${link.shortCode}`)}
                  className="text-blue-500 underline"
                >
                  {link.shortCode}
                </button>
              </td>
              <td className="p-2 truncate max-w-xs" title={link.originalUrl}>
                {link.originalUrl}
              </td>
              <td className="p-2">{link.clicks}</td>
              <td className="p-2">
                {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}
              </td>
              <td className="p-2">
                <button
                  onClick={() => window.open(`${window.location.origin}/code/${link.shortCode}`, '_blank')}
                  className="text-green-500 mr-2"
                >
                  Stats
                </button>
                <button
                  onClick={() => deleteLink(link.shortCode)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard

import React, { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Target,
  TrendingUp,
  Megaphone,
  Headset,
  Plug,
  Workflow,
  FileText,
  CalendarDays,
  BarChart3,
  LogOut,
  Search,
  Plus,
  RefreshCw,
  Menu,
  X
} from 'lucide-react'

import api, { login, getMe } from './api'

const modules = [
  { key: 'contacts', label: 'Contacts', endpoint: '/contacts/', icon: Users, fields: ['first_name', 'last_name', 'email', 'phone', 'company', 'job_title', 'city', 'state', 'country', 'status'] },
  { key: 'leads', label: 'Leads', endpoint: '/leads/', icon: Target, fields: ['name', 'email', 'phone', 'company', 'source', 'stage', 'estimated_value', 'notes'] },
  { key: 'pipelines', label: 'Pipelines', endpoint: '/pipelines/', icon: TrendingUp, fields: ['name', 'description', 'is_active'] },
  { key: 'opportunities', label: 'Opportunities', endpoint: '/opportunities/', icon: TrendingUp, fields: ['name', 'company', 'value', 'stage', 'expected_close', 'pipeline'] },
  { key: 'campaigns', label: 'Campaigns', endpoint: '/campaigns/', icon: Megaphone, fields: ['name', 'channel', 'status', 'start_date', 'end_date', 'budget', 'description'] },
  { key: 'tickets', label: 'Support Tickets', endpoint: '/tickets/', icon: Headset, fields: ['subject', 'customer_name', 'customer_email', 'description', 'priority', 'status'] },
  { key: 'reports', label: 'Saved Reports', endpoint: '/reports/', icon: BarChart3, fields: ['name', 'report_type', 'filters'] },
  { key: 'integrations', label: 'Integrations', endpoint: '/integrations/', icon: Plug, fields: ['name', 'provider', 'status', 'config_json'] },
  { key: 'workflows', label: 'Workflows', endpoint: '/workflows/', icon: Workflow, fields: ['name', 'trigger', 'action', 'is_active', 'description'] },
  { key: 'documents', label: 'Documents', endpoint: '/documents/', icon: FileText, fields: ['title', 'category', 'description'] },
  { key: 'tasks', label: 'Tasks', endpoint: '/tasks/', icon: CalendarDays, fields: ['title', 'description', 'due_date', 'status', 'priority'] },
  { key: 'events', label: 'Events', endpoint: '/events/', icon: CalendarDays, fields: ['title', 'description', 'starts_at', 'location'] },
]

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')

    try {
      await login(username, password)
      onLogin()
    } catch {
      setError('Login failed. Check username, password and backend server.')
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="brand-mark">M</div>
        <h1>MaximizeCRM</h1>
        <p>Sign in to your workspace</p>

        {error && <div className="error">{error}</div>}

        <label>Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="primary full">Sign in</button>
      </form>
    </div>
  )
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('maximize_access'))
  const [user, setUser] = useState(null)

  const [active, setActive] = useState('dashboard')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const [stats, setStats] = useState({
    contacts: null,
    leads: null,
    opportunities: null,
    tickets: null
  })

  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [mobile, setMobile] = useState(false)

  const current = modules.find(m => m.key === active)

  // Get logged-in user
  useEffect(() => {
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.clear()
          setToken(null)
        })
    }
  }, [token])

  // Load records for individual modules
  async function load() {
    if (!current) return

    setLoading(true)

    try {
      const { data } = await api.get(current.endpoint)

      setRows(
        Array.isArray(data)
          ? data
          : data.results || []
      )
    } catch (e) {
      setRows([])
      console.error('Module API error:', e)
    } finally {
      setLoading(false)
    }
  }

  // Load Dashboard statistics from backend
  async function loadDashboard() {
    const endpoints = [
      { key: 'contacts', url: '/contacts/' },
      { key: 'leads', url: '/leads/' },
      { key: 'opportunities', url: '/opportunities/' },
      { key: 'tickets', url: '/tickets/' }
    ]

    const results = await Promise.allSettled(
      endpoints.map(item => api.get(item.url))
    )

    const newStats = {}

    results.forEach((result, index) => {
      const key = endpoints[index].key

      if (result.status === 'fulfilled') {
        const data = result.value.data

        if (Array.isArray(data)) {
          newStats[key] = data.length
        } else if (typeof data.count === 'number') {
          newStats[key] = data.count
        } else if (Array.isArray(data.results)) {
          newStats[key] = data.results.length
        } else {
          newStats[key] = 0
        }
      } else {
        console.error(`${key} API error:`, result.reason)
        newStats[key] = null
      }
    })

    setStats(prev => ({
      ...prev,
      ...newStats
    }))
  }

  // Load data according to active page
  useEffect(() => {
    if (!token) return

    if (active === 'dashboard') {
      loadDashboard()
    } else {
      load()
    }
  }, [active, token])

  function openCreate() {
    setEditing(null)
    setForm({})
    setShowForm(true)
  }

  function openEdit(row) {
    setEditing(row)

    setForm(
      Object.fromEntries(
        current.fields.map(f => [f, row[f] ?? ''])
      )
    )

    setShowForm(true)
  }

  // Create or update record
  async function save(e) {
    e.preventDefault()

    const payload = { ...form }

    current.fields.forEach(f => {
      if (payload[f] === '') {
        delete payload[f]
      }
    })

    try {
      if (editing) {
        await api.patch(
          current.endpoint + editing.id + '/',
          payload
        )
      } else {
        await api.post(current.endpoint, payload)
      }

      setShowForm(false)
      load()

    } catch (err) {
      alert(
        JSON.stringify(
          err.response?.data || 'Unable to save record'
        )
      )
    }
  }

  // Delete record
  async function remove(row) {
    if (!confirm('Delete this record?')) return

    try {
      await api.delete(current.endpoint + row.id + '/')
      load()
    } catch {
      alert('Delete failed')
    }
  }

  function logout() {
    localStorage.clear()
    setToken(null)
    setUser(null)
  }

  const visible = rows.filter(r =>
    JSON.stringify(r).toLowerCase().includes(query.toLowerCase())
  )

  if (!token) {
    return (
      <Login
        onLogin={() => setToken(localStorage.getItem('maximize_access'))}
      />
    )
  }

  return (
    <div className="app-shell">

      {/* Sidebar */}
      <aside className={`sidebar ${mobile ? 'open' : ''}`}>

        <div className="brand">
          <div className="brand-mark small">M</div>

          <div>
            <b>MaximizeCRM</b>
            <small>RetailMax workspace</small>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobile(false)}
          >
            <X />
          </button>
        </div>

        <button
          className={`nav-item ${active === 'dashboard' ? 'active' : ''}`}
          onClick={() => {
            setActive('dashboard')
            setMobile(false)
          }}
        >
          <LayoutDashboard />
          Dashboard
        </button>

        <div className="nav-label">WORKSPACE</div>

        {modules.map(m => (
          <button
            key={m.key}
            className={`nav-item ${active === m.key ? 'active' : ''}`}
            onClick={() => {
              setActive(m.key)
              setMobile(false)
              setShowForm(false)
            }}
          >
            <m.icon />
            {m.label}
          </button>
        ))}

        <div className="sidebar-bottom">

          <div className="user-mini">
            <div className="avatar">
              {(user?.username || 'U')[0].toUpperCase()}
            </div>

            <div>
              <b>{user?.username || 'User'}</b>
              <small>{user?.role || 'CRM user'}</small>
            </div>
          </div>

          <button className="nav-item" onClick={logout}>
            <LogOut />
            Sign out
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="main">

        <header className="topbar">

          <button
            className="hamburger"
            onClick={() => setMobile(true)}
          >
            <Menu />
          </button>

          <div>
            <span className="eyebrow">RETAILMAX CRM</span>
            <h2>
              {active === 'dashboard' ? 'Dashboard' : current?.label}
            </h2>
          </div>

          <div className="top-right">
            <span className="status-dot" />
            System connected
          </div>

        </header>

        {/* Dashboard */}
        {active === 'dashboard' ? (

          <section className="content">

            <div className="welcome">

              <div>
                <span className="eyebrow">OVERVIEW</span>

                <h1>
                  Good to see you, {user?.first_name || user?.username || 'there'}.
                </h1>

                <p>
                  Here is your customer relationship overview.
                </p>
              </div>

              <div className="welcome-icon">
                <LayoutDashboard />
              </div>

            </div>

            {/* Dashboard Statistics */}
            <div className="stats-grid">

              {[
                { label: 'Contacts', key: 'contacts', icon: Users },
                { label: 'Leads', key: 'leads', icon: Target },
                { label: 'Opportunities', key: 'opportunities', icon: TrendingUp },
                { label: 'Support tickets', key: 'tickets', icon: Headset }
              ].map(s => (

                <div className="stat-card" key={s.key}>

                  <div className="stat-top">
                    <span>{s.label}</span>
                    <s.icon />
                  </div>

                  <strong>
                    {stats[s.key] === null ? '—' : stats[s.key]}
                  </strong>

                  <small>Total records</small>

                </div>

              ))}

            </div>

            {/* CRM Modules */}
            <div className="panel">

              <h3>CRM modules</h3>

              <div className="module-grid">

                {modules.map(m => (

                  <button
                    className="module-tile"
                    key={m.key}
                    onClick={() => setActive(m.key)}
                  >
                    <m.icon />
                    <span>{m.label}</span>
                    <b>Open →</b>
                  </button>

                ))}

              </div>

            </div>

          </section>

        ) : (

          /* Individual Module Pages */
          <section className="content">

            <div className="page-tools">

              <div className="searchbox">
                <Search />

                <input
                  placeholder={`Search ${current?.label.toLowerCase()}...`}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>

              <button className="secondary" onClick={load}>
                <RefreshCw size={16} />
                Refresh
              </button>

              <button className="primary" onClick={openCreate}>
                <Plus size={17} />
                Add {current?.label.replace(/s$/, '')}
              </button>

            </div>

            {/* Add/Edit Form */}
            {showForm && (

              <div className="panel form-panel">

                <div className="panel-head">
                  <h3>
                    {editing ? 'Edit' : 'Add'} {current.label}
                  </h3>

                  <button
                    className="icon-button"
                    onClick={() => setShowForm(false)}
                  >
                    <X />
                  </button>
                </div>

                <form className="record-form" onSubmit={save}>

                  {current.fields.map(f => (

                    <label key={f}>
                      {f.replaceAll('_', ' ')}

                      <input
                        value={form[f] ?? ''}
                        onChange={e =>
                          setForm({
                            ...form,
                            [f]: e.target.value
                          })
                        }
                        placeholder={f.replaceAll('_', ' ')}
                      />

                    </label>

                  ))}

                  <div className="form-actions">

                    <button
                      type="button"
                      className="secondary"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>

                    <button className="primary">
                      Save record
                    </button>

                  </div>

                </form>

              </div>

            )}

            {/* Records Table */}
            <div className="panel table-panel">

              <div className="panel-head">

                <div>
                  <h3>{current?.label}</h3>
                  <small>{visible.length} records</small>
                </div>

              </div>

              {loading ? (

                <p className="empty">Loading records...</p>

              ) : visible.length === 0 ? (

                <div className="empty">
                  No records found. Add your first {current?.label.toLowerCase().replace(/s$/, '')}.
                </div>

              ) : (

                <div className="table-scroll">

                  <table>

                    <thead>
                      <tr>
                        <th>ID</th>

                        {current.fields.slice(0, 5).map(f => (
                          <th key={f}>{f.replaceAll('_', ' ')}</th>
                        ))}

                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>

                      {visible.map(row => (

                        <tr key={row.id}>

                          <td>#{row.id}</td>

                          {current.fields.slice(0, 5).map(f => (

                            <td key={f}>
                              {typeof row[f] === 'object'
                                ? JSON.stringify(row[f])
                                : String(row[f] ?? '—')}
                            </td>

                          ))}

                          <td>
                            <button
                              className="text-btn"
                              onClick={() => openEdit(row)}
                            >
                              Edit
                            </button>

                            <button
                              className="text-btn danger"
                              onClick={() => remove(row)}
                            >
                              Delete
                            </button>
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>

        )}

        <footer>
          © {new Date().getFullYear()} MaximizeCRM · RetailMax CRM platform
        </footer>

      </main>

    </div>
  )
}

export default App

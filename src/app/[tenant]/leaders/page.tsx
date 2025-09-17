"use client"

import { useState, useEffect } from 'react'
import { useTenant } from '@/components/TenantProvider'

interface Leader {
  id: string
  name: string
  email: string
  phone: string
  role: string
  portfolio: string
  status: 'active' | 'inactive' | 'archived'
  startDate: string
  endDate?: string
  avatar?: string
}

export default function LeadersPage() {
  const { tenant } = useTenant()
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    portfolio: '',
    startDate: new Date().toISOString().split('T')[0]
  })

  const roles = getRolesForLevel(tenant.organization?.type || 'LC')

  useEffect(() => {
    loadLeaders()
  }, [])

  const loadLeaders = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/${tenant.slug}/api/leaders`)
      const data = await response.json()
      setLeaders(data.leaders || [])
    } catch (error) {
      console.error('Error loading leaders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingLeader 
        ? `/${tenant.slug}/api/leaders/${editingLeader.id}`
        : `/${tenant.slug}/api/leaders`
      
      const method = editingLeader ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          status: 'active'
        })
      })

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          portfolio: '',
          startDate: new Date().toISOString().split('T')[0]
        })
        setShowForm(false)
        setEditingLeader(null)
        loadLeaders()
      }
    } catch (error) {
      console.error('Error saving leader:', error)
    }
  }

  const handleEdit = (leader: Leader) => {
    setEditingLeader(leader)
    setFormData({
      name: leader.name,
      email: leader.email,
      phone: leader.phone,
      role: leader.role,
      portfolio: leader.portfolio,
      startDate: leader.startDate
    })
    setShowForm(true)
  }

  const handleArchive = async (leaderId: string) => {
    if (confirm('Are you sure you want to archive this leader?')) {
      try {
        const response = await fetch(`/${tenant.slug}/api/leaders/${leaderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'archived',
            endDate: new Date().toISOString().split('T')[0]
          })
        })

        if (response.ok) {
          loadLeaders()
        }
      } catch (error) {
        console.error('Error archiving leader:', error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-green-100 text-green-800',
      'bg-orange-100 text-orange-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800'
    ]
    const index = role.length % colors.length
    return colors[index]
  }

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading leaders...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2 className="text-2xl font-bold text-gray-900">Leadership Management ({tenant.name})</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Leader
        </button>
      </div>

      {/* Add/Edit Leader Form */}
      {showForm && (
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editingLeader ? 'Edit Leader' : 'Add New Leader'}
            </h3>
            <button 
              onClick={() => {
                setShowForm(false)
                setEditingLeader(null)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  role: '',
                  portfolio: '',
                  startDate: new Date().toISOString().split('T')[0]
                })
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio/Responsibilities</label>
                <input
                  type="text"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Financial Management, Youth Ministry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false)
                  setEditingLeader(null)
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingLeader ? 'Update Leader' : 'Add Leader'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leaders List */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Leadership Team</h3>
        {leaders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No leaders found. Add your first leader to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader) => (
              <div key={leader.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-ecwa-100 rounded-full flex items-center justify-center">
                      <span className="text-ecwa-600 font-bold text-lg">
                        {leader.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{leader.name}</h4>
                      <p className="text-sm text-gray-500">{leader.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(leader)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleArchive(leader.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Archive
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Role:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(leader.role)}`}>
                      {leader.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leader.status)}`}>
                      {leader.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="text-sm text-gray-900">{leader.phone}</span>
                  </div>
                  {leader.portfolio && (
                    <div>
                      <span className="text-sm text-gray-500">Portfolio:</span>
                      <p className="text-sm text-gray-900 mt-1">{leader.portfolio}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Start Date:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(leader.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  {leader.endDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">End Date:</span>
                      <span className="text-sm text-gray-900">
                        {new Date(leader.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function getRolesForLevel(level: string): string[] {
  switch (level) {
    case 'GCC':
      return [
        'General Secretary',
        'President',
        'Vice President',
        'Deputy General Secretary',
        'Treasurer',
        'Financial Secretary',
        'Missions Director',
        'Youth Director',
        'Women Director',
        'Men Director'
      ]
    case 'DCC':
      return [
        'District Secretary',
        'Chairman',
        'Vice Chairman',
        'Assistant District Secretary',
        'Treasurer',
        'Delegate',
        'Financial Secretary',
        'CEL'
      ]
    case 'LCC':
      return [
        'LCC Secretary',
        'Local Overseer (LO)',
        'Assistant LO',
        'Secretary',
        'Treasurer',
        'Financial Secretary',
        'Delegate'
      ]
    case 'LC':
      return [
        'LC Secretary',
        'Senior Minister',
        'Associate Minister',
        'Pastoral Team',
        'Elder',
        'Treasurer',
        'Financial Secretary',
        'Works Director',
        'Chief Usher',
        'Missions Director',
        'Welfare Director'
      ]
    default:
      return ['Secretary', 'Treasurer', 'Financial Secretary']
  }
}

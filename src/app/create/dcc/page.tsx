"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Leader {
  id: string
  role: string
  name: string
  email: string
  phone: string
  portfolio: string
}

interface Agency {
  id: string
  name: string
  leader: string
  leaderEmail: string
  leaderPhone: string
}

export default function CreateDCCPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [gccList, setGccList] = useState([])
  
  // Organization details
  const [orgDetails, setOrgDetails] = useState({
    name: '',
    location: '',
    address: '',
    state: '',
    country: 'Nigeria',
    parentGcc: ''
  })

  // Leadership
  const [leaders, setLeaders] = useState<Leader[]>([
    { id: '1', role: 'District Secretary', name: '', email: '', phone: '', portfolio: 'District Administration' }
  ])

  // Agencies
  const [agencies, setAgencies] = useState<Agency[]>([])

  const dccRoles = [
    'District Secretary',
    'Chairman',
    'Vice Chairman',
    'Assistant District Secretary',
    'Treasurer',
    'Delegate',
    'Financial Secretary',
    'CEL'
  ]

  useEffect(() => {
    // Fetch existing GCCs
    fetchGCCs()
  }, [])

  const fetchGCCs = async () => {
    try {
      const response = await fetch('/api/organizations/gcc')
      const data = await response.json()
      setGccList(data.organizations || [])
    } catch (error) {
      console.error('Error fetching GCCs:', error)
    }
  }

  const addLeader = () => {
    setLeaders([...leaders, { 
      id: Date.now().toString(), 
      role: '', 
      name: '', 
      email: '', 
      phone: '', 
      portfolio: '' 
    }])
  }

  const updateLeader = (id: string, field: string, value: string) => {
    setLeaders(leaders.map(leader => 
      leader.id === id ? { ...leader, [field]: value } : leader
    ))
  }

  const removeLeader = (id: string) => {
    setLeaders(leaders.filter(leader => leader.id !== id))
  }

  const addAgency = () => {
    setAgencies([...agencies, { 
      id: Date.now().toString(), 
      name: '', 
      leader: '', 
      leaderEmail: '', 
      leaderPhone: '' 
    }])
  }

  const updateAgency = (id: string, field: string, value: string) => {
    setAgencies(agencies.map(agency => 
      agency.id === id ? { ...agency, [field]: value } : agency
    ))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/organizations/dcc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgDetails,
          leaders,
          agencies
        })
      })

      if (response.ok) {
        router.push('/dcc')
      }
    } catch (error) {
      console.error('Error creating DCC:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create DCC</h1>
                <p className="text-sm text-gray-500">District Church Council Setup</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Step {step} of 3</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Step 1: Organization Details */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Organization Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent GCC</label>
                  <select
                    value={orgDetails.parentGcc}
                    onChange={(e) => setOrgDetails({...orgDetails, parentGcc: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Parent GCC</option>
                    {gccList.map((gcc: any) => (
                      <option key={gcc.id} value={gcc.id}>{gcc.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DCC Name</label>
                    <input
                      type="text"
                      value={orgDetails.name}
                      onChange={(e) => setOrgDetails({...orgDetails, name: e.target.value})}
                      placeholder="e.g., ECWA Jos DCC"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={orgDetails.location}
                      onChange={(e) => setOrgDetails({...orgDetails, location: e.target.value})}
                      placeholder="e.g., Jos, Plateau State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={orgDetails.address}
                    onChange={(e) => setOrgDetails({...orgDetails, address: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={orgDetails.state}
                      onChange={(e) => setOrgDetails({...orgDetails, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={orgDetails.country}
                      onChange={(e) => setOrgDetails({...orgDetails, country: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Leadership */}
          {step === 2 && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Leadership Team</h2>
                <button
                  onClick={addLeader}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Leader
                </button>
              </div>
              <div className="space-y-4">
                {leaders.map((leader, index) => (
                  <div key={leader.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900">Leader {index + 1}</h3>
                      {leaders.length > 1 && (
                        <button
                          onClick={() => removeLeader(leader.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                          value={leader.role}
                          onChange={(e) => updateLeader(leader.id, 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Role</option>
                          {dccRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={leader.name}
                          onChange={(e) => updateLeader(leader.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={leader.email}
                          onChange={(e) => updateLeader(leader.id, 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={leader.phone}
                          onChange={(e) => updateLeader(leader.id, 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                      <input
                        type="text"
                        value={leader.portfolio}
                        onChange={(e) => updateLeader(leader.id, 'portfolio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Agencies */}
          {step === 3 && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Agencies & Fellowships</h2>
                <button
                  onClick={addAgency}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Agency
                </button>
              </div>
              <div className="space-y-4">
                {agencies.map((agency, index) => (
                  <div key={agency.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900">Agency {index + 1}</h3>
                      <button
                        onClick={() => setAgencies(agencies.filter(a => a.id !== agency.id))}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                        <input
                          type="text"
                          value={agency.name}
                          onChange={(e) => updateAgency(agency.id, 'name', e.target.value)}
                          placeholder="e.g., Youth Fellowship"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leader Name</label>
                        <input
                          type="text"
                          value={agency.leader}
                          onChange={(e) => updateAgency(agency.id, 'leader', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leader Email</label>
                        <input
                          type="email"
                          value={agency.leaderEmail}
                          onChange={(e) => updateAgency(agency.id, 'leaderEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leader Phone</label>
                        <input
                          type="tel"
                          value={agency.leaderPhone}
                          onChange={(e) => updateAgency(agency.id, 'leaderPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {agencies.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No agencies added yet. Click "Add Agency" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex space-x-4">
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create DCC'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

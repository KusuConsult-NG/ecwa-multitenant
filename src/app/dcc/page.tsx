"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalLCCs: number
  totalLCs: number
  totalMembers: number
  totalIncome: number
  totalExpenditures: number
  pendingApprovals: number
  districtProjects: number
}

export default function DCCDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLCCs: 0,
    totalLCs: 0,
    totalMembers: 0,
    totalIncome: 0,
    totalExpenditures: 0,
    pendingApprovals: 0,
    districtProjects: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        totalLCCs: 8,
        totalLCs: 32,
        totalMembers: 8500,
        totalIncome: 4500000,
        totalExpenditures: 3800000,
        pendingApprovals: 12,
        districtProjects: 6
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading DCC Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">DCC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ECWA District Church Council</h1>
                <p className="text-sm text-gray-600">Regional Level Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome, District Secretary</p>
              <p className="text-xs text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl">🏛️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total LCCs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLCCs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl">⛪</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total LCs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLCs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-orange-600 text-xl">👥</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMembers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-yellow-600 text-xl">📊</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">District Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.districtProjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">District Financial Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Total Income</span>
                <span className="text-lg font-bold text-green-600">₦{stats.totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Total Expenditures</span>
                <span className="text-lg font-bold text-red-600">₦{stats.totalExpenditures.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm font-medium text-gray-500">Net Balance</span>
                <span className="text-lg font-bold text-blue-600">₦{(stats.totalIncome - stats.totalExpenditures).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/create/lcc" 
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Create New LCC
              </Link>
              <Link 
                href="/dcc/approvals" 
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700"
              >
                Review Approvals ({stats.pendingApprovals})
              </Link>
              <Link 
                href="/dcc/projects" 
                className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Manage Projects
              </Link>
              <Link 
                href="/dcc/reports" 
                className="block w-full bg-orange-600 text-white text-center py-2 px-4 rounded-md hover:bg-orange-700"
              >
                Generate Reports
              </Link>
            </div>
          </div>
        </div>

        {/* District Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">LCC Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active LCCs</span>
                <span className="text-sm font-medium text-green-600">{stats.totalLCCs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Report Compliance</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Financial Health</span>
                <span className="text-sm font-medium text-green-600">Good</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Mission Support</span>
                <span className="text-sm font-medium text-blue-600">₦500,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Building Projects</span>
                <span className="text-sm font-medium text-blue-600">₦1,200,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Training Programs</span>
                <span className="text-sm font-medium text-blue-600">₦300,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Financial Reports</span>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Policy Adherence</span>
                <span className="text-sm font-medium text-green-600">90%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Training Completion</span>
                <span className="text-sm font-medium text-yellow-600">75%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent District Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New LCC Created</p>
                <p className="text-xs text-gray-500">ECWA Jos Central LCC was established</p>
              </div>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📊</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Monthly Report Received</p>
                <p className="text-xs text-gray-500">Jos LCC submitted their monthly financial report</p>
              </div>
              <span className="text-xs text-gray-400">3 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">🏗️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Project Update</p>
                <p className="text-xs text-gray-500">New church building project approved</p>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

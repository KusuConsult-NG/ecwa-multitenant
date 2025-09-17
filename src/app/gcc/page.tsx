"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalDCCs: number
  totalLCCs: number
  totalLCs: number
  totalMembers: number
  totalIncome: number
  totalExpenditures: number
  pendingApprovals: number
  activeProjects: number
}

export default function GCCDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDCCs: 0,
    totalLCCs: 0,
    totalLCs: 0,
    totalMembers: 0,
    totalIncome: 0,
    totalExpenditures: 0,
    pendingApprovals: 0,
    activeProjects: 0
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
        totalDCCs: 12,
        totalLCCs: 45,
        totalLCs: 180,
        totalMembers: 25000,
        totalIncome: 15000000,
        totalExpenditures: 12000000,
        pendingApprovals: 8,
        activeProjects: 15
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
          <div className="text-lg">Loading GCC Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-ecwa-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-ecwa-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">GCC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ECWA General Church Council</h1>
                <p className="text-sm text-gray-600">National Headquarters Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome, General Secretary</p>
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
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl">🏢</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total DCCs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDCCs}</p>
              </div>
            </div>
          </div>

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
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
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
                <span className="text-lg font-bold text-ecwa-600">₦{(stats.totalIncome - stats.totalExpenditures).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/create/dcc" 
                className="block w-full bg-ecwa-600 text-white text-center py-2 px-4 rounded-md hover:bg-ecwa-700"
              >
                Create New DCC
              </Link>
              <Link 
                href="/gcc/approvals" 
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Review Approvals ({stats.pendingApprovals})
              </Link>
              <Link 
                href="/gcc/policy" 
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700"
              >
                Policy Management
              </Link>
              <Link 
                href="/gcc/reports" 
                className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Generate Reports
              </Link>
            </div>
          </div>
        </div>

        {/* National Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trends</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New Churches (This Year)</span>
                <span className="text-sm font-medium text-green-600">+12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member Growth</span>
                <span className="text-sm font-medium text-green-600">+8.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Financial Growth</span>
                <span className="text-sm font-medium text-green-600">+15.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Mission Projects</span>
                <span className="text-sm font-medium text-blue-600">{stats.activeProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Building Projects</span>
                <span className="text-sm font-medium text-blue-600">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Training Programs</span>
                <span className="text-sm font-medium text-blue-600">5</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Financial Compliance</span>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Policy Adherence</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Report Submission</span>
                <span className="text-sm font-medium text-yellow-600">88%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New DCC Created</p>
                <p className="text-xs text-gray-500">ECWA Abuja DCC was created successfully</p>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📊</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Monthly Report Submitted</p>
                <p className="text-xs text-gray-500">Jos DCC submitted their monthly financial report</p>
              </div>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">📋</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Policy Update</p>
                <p className="text-xs text-gray-500">New financial guidelines published</p>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useTenant } from './TenantProvider'
import Link from 'next/link'

export default function TenantTopbar() {
  const { tenant } = useTenant()

  return (
    <div className="topbar">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ecwa-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">{tenant.name}</h1>
            <p className="text-sm text-gray-500">{tenant.organization.type}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link 
          href="/" 
          className="text-gray-600 hover:text-gray-900 text-sm"
        >
          Switch Organization
        </Link>
        <button className="btn-ghost">
          Profile
        </button>
      </div>
    </div>
  )
}

"use client"

import { useTenant } from './TenantProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TenantSidebar() {
  const { tenant } = useTenant()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: `/${tenant.slug}`, icon: '🏠' },
    { name: 'Leaders', href: `/${tenant.slug}/leaders`, icon: '👥' },
    { name: 'Requisitions', href: `/${tenant.slug}/requisitions`, icon: '📋' },
    { name: 'Approvals', href: `/${tenant.slug}/approvals`, icon: '✅' },
    { name: 'Financials', href: `/${tenant.slug}/financials`, icon: '💰' },
    { name: 'Members', href: `/${tenant.slug}/members`, icon: '👥' },
    { name: 'Agencies', href: `/${tenant.slug}/agencies`, icon: '🏢' },
    { name: 'Staff', href: `/${tenant.slug}/staff`, icon: '👨‍💼' },
    { name: 'Expenditures', href: `/${tenant.slug}/expenditures`, icon: '🧾' },
    { name: 'Import Data', href: `/${tenant.slug}/import-data`, icon: '📥' },
    { name: 'Reports', href: `/${tenant.slug}/reports`, icon: '📊' },
    { name: 'Settings', href: `/${tenant.slug}/settings`, icon: '⚙️' },
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="mb-6">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ecwa-100 text-ecwa-800">
            {tenant.organization.type}
          </div>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ecwa-100 text-ecwa-900 border-r-2 border-ecwa-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Organization</div>
          <div className="text-sm text-gray-700 font-medium">{tenant.name}</div>
          <div className="text-xs text-gray-500">{tenant.domain}</div>
        </div>
      </div>
    </div>
  )
}

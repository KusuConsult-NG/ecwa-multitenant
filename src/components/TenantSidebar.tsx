"use client"

import { useTenant } from './TenantProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TenantSidebar() {
  const { tenant } = useTenant()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: `/${tenant.slug}`, icon: '🏠' },
    { name: 'Financials', href: `/${tenant.slug}/financials`, icon: '💰' },
    { name: 'Members', href: `/${tenant.slug}/members`, icon: '👥' },
    { name: 'Agencies', href: `/${tenant.slug}/agencies`, icon: '🏢' },
    { name: 'Staff', href: `/${tenant.slug}/staff`, icon: '👨‍💼' },
    { name: 'Expenditures', href: `/${tenant.slug}/expenditures`, icon: '🧾' },
    { name: 'Reports', href: `/${tenant.slug}/reports`, icon: '📊' },
    { name: 'Settings', href: `/${tenant.slug}/settings`, icon: '⚙️' },
  ]

  return (
    <div className="sidebar">
      <div className="mb-6">
        <div className="badge bg-ecwa-100 text-ecwa-800">
          {tenant.organization.type}
        </div>
      </div>
      
      <nav className="nav">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-ecwa-100 text-ecwa-900'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Organization</div>
        <div className="text-sm text-gray-700">{tenant.name}</div>
        <div className="text-xs text-gray-500">{tenant.domain}</div>
      </div>
    </div>
  )
}

"use client"

import { createContext, useContext, ReactNode } from 'react'
import { Tenant, type TenantContext } from '@/types/tenant'

const TenantContext = createContext<TenantContext | null>(null)

interface TenantProviderProps {
  children: ReactNode
  tenant: Tenant
}

export default function TenantProvider({ children, tenant }: TenantProviderProps) {
  const value: TenantContext = {
    tenant,
    user: null, // Will be set when user logs in
    isLoading: false
  }

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}

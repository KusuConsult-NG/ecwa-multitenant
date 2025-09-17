export interface Tenant {
  id: string
  name: string
  slug: string
  domain?: string
  settings: {
    primaryColor: string
    logo?: string
    theme: 'light' | 'dark'
  }
  organization: {
    type: 'GCC' | 'DCC' | 'LCC' | 'LC'
    name: string
    parentId?: string
  }
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  tenantId: string
  permissions: string[]
  passwordHash?: string
  createdAt: string
}

export interface TenantContext {
  tenant: Tenant
  user: User | null
  isLoading: boolean
}

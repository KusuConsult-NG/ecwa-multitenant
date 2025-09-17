import { Tenant, User } from '@/types/tenant'

// In-memory storage for demo (replace with database in production)
const tenants: Tenant[] = [
  {
    id: 'ecwa-jos',
    name: 'ECWA Jos DCC',
    slug: 'jos',
    domain: 'jos.ecwa.app',
    settings: {
      primaryColor: '#0ea5e9',
      theme: 'light'
    },
    organization: {
      type: 'DCC',
      name: 'ECWA Jos DCC'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ecwa-kaduna',
    name: 'ECWA Kaduna DCC',
    slug: 'kaduna',
    domain: 'kaduna.ecwa.app',
    settings: {
      primaryColor: '#0ea5e9',
      theme: 'light'
    },
    organization: {
      type: 'DCC',
      name: 'ECWA Kaduna DCC'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const users: User[] = []

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  return tenants.find(t => t.slug === slug) || null
}

export async function getTenantByDomain(domain: string): Promise<Tenant | null> {
  return tenants.find(t => t.domain === domain) || null
}

export async function createTenant(tenantData: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant> {
  const tenant: Tenant = {
    ...tenantData,
    id: `ecwa-${tenantData.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  tenants.push(tenant)
  return tenant
}

export async function getUserByEmail(email: string, tenantId: string): Promise<User | null> {
  return users.find(u => u.email === email && u.tenantId === tenantId) || null
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const user: User = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  users.push(user)
  return user
}

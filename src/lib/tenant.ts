import { Tenant, User } from '@/types/tenant'
import { db } from './database'

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  return await db.getTenantBySlug(slug)
}

export async function getTenantByDomain(domain: string): Promise<Tenant | null> {
  return await db.getTenantBySlug(domain)
}

export async function createTenant(tenantData: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant> {
  return await db.createTenant(tenantData)
}

export async function getUserByEmail(email: string, tenantId: string): Promise<User | null> {
  return await db.getUserByEmail(email, tenantId)
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  return await db.createUser(userData)
}

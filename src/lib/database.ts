import { User, Tenant } from '@/types/tenant'
import { hashPassword } from './auth'

// In-memory database for demo (replace with real database in production)
class Database {
  private users: User[] = []
  private tenants: Tenant[] = []
  private sessions: Map<string, { userId: string; tenantId: string; expires: Date }> = new Map()

  private initialized = false

  private async initializeSampleData() {
    if (this.initialized) return
    this.initialized = true
    // Initialize sample tenants
    const josTenant = await this.createTenant({
      name: 'ECWA Jos DCC',
      slug: 'jos',
      domain: 'jos.ecwa.app',
      settings: {
        primaryColor: '#0ea5e9',
        theme: 'light' as const
      },
      organization: {
        type: 'DCC' as const,
        name: 'ECWA Jos DCC'
      }
    })

    const kadunaTenant = await this.createTenant({
      name: 'ECWA Kaduna DCC',
      slug: 'kaduna',
      domain: 'kaduna.ecwa.app',
      settings: {
        primaryColor: '#0ea5e9',
        theme: 'light' as const
      },
      organization: {
        type: 'DCC' as const,
        name: 'ECWA Kaduna DCC'
      }
    })

    // Initialize sample users
    const adminUser = await this.createUser({
      email: 'admin@jos.ecwa.app',
      name: 'Admin User',
      role: 'Admin',
      tenantId: josTenant.id,
      permissions: ['*']
    })
    await this.updateUser(adminUser.id, { passwordHash: hashPassword('admin123') })

    const treasurerUser = await this.createUser({
      email: 'treasurer@jos.ecwa.app',
      name: 'Treasurer User',
      role: 'Treasurer',
      tenantId: josTenant.id,
      permissions: ['financials.read', 'financials.write', 'expenditures.read', 'expenditures.write']
    })
    await this.updateUser(treasurerUser.id, { passwordHash: hashPassword('treasurer123') })
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeSampleData()
    }
  }

  // User management
  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await this.ensureInitialized()
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    this.users.push(newUser)
    return newUser
  }

  async getUserByEmail(email: string, tenantId: string): Promise<User | null> {
    await this.ensureInitialized()
    return this.users.find(u => u.email === email && u.tenantId === tenantId) || null
  }

  async getUserById(id: string): Promise<User | null> {
    await this.ensureInitialized()
    return this.users.find(u => u.id === id) || null
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex === -1) return null
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates }
    return this.users[userIndex]
  }

  // Tenant management
  async createTenant(tenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant> {
    const newTenant: Tenant = {
      ...tenant,
      id: `tenant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.tenants.push(newTenant)
    return newTenant
  }

  async getTenantBySlug(slug: string): Promise<Tenant | null> {
    await this.ensureInitialized()
    return this.tenants.find(t => t.slug === slug) || null
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    await this.ensureInitialized()
    return this.tenants.find(t => t.id === id) || null
  }

  // Session management
  async createSession(sessionId: string, userId: string, tenantId: string, expires: Date) {
    this.sessions.set(sessionId, { userId, tenantId, expires })
  }

  async getSession(sessionId: string) {
    const session = this.sessions.get(sessionId)
    if (!session || session.expires < new Date()) {
      this.sessions.delete(sessionId)
      return null
    }
    return session
  }

  async deleteSession(sessionId: string) {
    this.sessions.delete(sessionId)
  }

  // Financial data
  private financials: Map<string, any[]> = new Map()
  
  async getFinancials(tenantId: string) {
    return this.financials.get(tenantId) || []
  }

  async addFinancial(tenantId: string, data: any) {
    const existing = this.financials.get(tenantId) || []
    existing.push({ ...data, id: `fin_${Date.now()}`, createdAt: new Date().toISOString() })
    this.financials.set(tenantId, existing)
  }

  // Members data
  private members: Map<string, any[]> = new Map()
  
  async getMembers(tenantId: string) {
    return this.members.get(tenantId) || []
  }

  async addMember(tenantId: string, data: any) {
    const existing = this.members.get(tenantId) || []
    existing.push({ ...data, id: `mem_${Date.now()}`, createdAt: new Date().toISOString() })
    this.members.set(tenantId, existing)
  }

  // Expenditures data
  private expenditures: Map<string, any[]> = new Map()
  
  async getExpenditures(tenantId: string) {
    return this.expenditures.get(tenantId) || []
  }

  async addExpenditure(tenantId: string, data: any) {
    const existing = this.expenditures.get(tenantId) || []
    existing.push({ ...data, id: `exp_${Date.now()}`, createdAt: new Date().toISOString() })
    this.expenditures.set(tenantId, existing)
  }

  // Agencies data
  private agencies: Map<string, any[]> = new Map()
  
  async getAgencies(tenantId: string) {
    return this.agencies.get(tenantId) || []
  }

  async addAgency(tenantId: string, data: any) {
    const existing = this.agencies.get(tenantId) || []
    existing.push({ ...data, id: `agency_${Date.now()}`, createdAt: new Date().toISOString() })
    this.agencies.set(tenantId, existing)
  }

  // Staff data
  private staff: Map<string, any[]> = new Map()
  
  async getStaff(tenantId: string) {
    return this.staff.get(tenantId) || []
  }

  async addStaff(tenantId: string, data: any) {
    const existing = this.staff.get(tenantId) || []
    existing.push({ ...data, id: `staff_${Date.now()}`, createdAt: new Date().toISOString() })
    this.staff.set(tenantId, existing)
  }

  // Requisitions data
  private requisitions: Map<string, any[]> = new Map()
  
  async getRequisitions(tenantId: string) {
    return this.requisitions.get(tenantId) || []
  }

  async createRequisition(data: any) {
    const existing = this.requisitions.get(data.tenantId) || []
    const newReq = { ...data, id: `req_${Date.now()}` }
    existing.push(newReq)
    this.requisitions.set(data.tenantId, existing)
    return newReq
  }

  async getRequisition(id: string) {
    for (const [tenantId, reqs] of this.requisitions.entries()) {
      const req = reqs.find(r => r.id === id)
      if (req) return req
    }
    return null
  }

  async updateRequisition(id: string, updates: any) {
    for (const [tenantId, reqs] of this.requisitions.entries()) {
      const reqIndex = reqs.findIndex(r => r.id === id)
      if (reqIndex !== -1) {
        reqs[reqIndex] = { ...reqs[reqIndex], ...updates }
        this.requisitions.set(tenantId, reqs)
        return reqs[reqIndex]
      }
    }
    return null
  }

  // Organization management
  async getTenantsByType(type: string) {
    await this.ensureInitialized()
    return this.tenants.filter(t => t.organization?.type === type)
  }
}

export const db = new Database()

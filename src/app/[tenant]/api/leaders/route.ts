import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantSlug = searchParams.get('tenant')
    
    if (!tenantSlug) {
      return NextResponse.json({ error: "Tenant not specified" }, { status: 400 })
    }

    const tenant = await db.getTenantBySlug(tenantSlug)
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    const leaders = await db.getLeaders(tenant.id)
    return NextResponse.json({ leaders })

  } catch (error) {
    console.error('Error fetching leaders:', error)
    return NextResponse.json(
      { error: "Failed to fetch leaders" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantSlug = searchParams.get('tenant')
    
    if (!tenantSlug) {
      return NextResponse.json({ error: "Tenant not specified" }, { status: 400 })
    }

    const tenant = await db.getTenantBySlug(tenantSlug)
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    const body = await request.json()
    const { name, email, phone, role, portfolio, startDate, status } = body

    const leader = await db.createLeader({
      tenantId: tenant.id,
      name,
      email,
      phone,
      role,
      portfolio,
      status: status || 'active',
      startDate,
      createdAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      leader,
      message: 'Leader created successfully'
    })

  } catch (error) {
    console.error('Error creating leader:', error)
    return NextResponse.json(
      { error: "Failed to create leader" },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  try {
    const tenant = await db.getTenantBySlug(params.tenant)
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    const financials = await db.getFinancials(tenant.id)
    return NextResponse.json({ financials })
  } catch (error) {
    console.error('Error fetching financials:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  try {
    const tenant = await db.getTenantBySlug(params.tenant)
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    const data = await request.json()
    await db.addFinancial(tenant.id, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding financial record:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

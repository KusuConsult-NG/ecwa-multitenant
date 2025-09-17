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

    const expenditures = await db.getExpenditures(tenant.id)
    return NextResponse.json({ expenditures })
  } catch (error) {
    console.error('Error fetching expenditures:', error)
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
    await db.addExpenditure(tenant.id, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding expenditure:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const leaderId = params.id

    const updatedLeader = await db.updateLeader(leaderId, {
      ...body,
      updatedAt: new Date().toISOString()
    })

    if (!updatedLeader) {
      return NextResponse.json({ error: "Leader not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      leader: updatedLeader,
      message: 'Leader updated successfully'
    })

  } catch (error) {
    console.error('Error updating leader:', error)
    return NextResponse.json(
      { error: "Failed to update leader" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const leaderId = params.id
    const success = await db.deleteLeader(leaderId)

    if (!success) {
      return NextResponse.json({ error: "Leader not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Leader deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting leader:', error)
    return NextResponse.json(
      { error: "Failed to delete leader" },
      { status: 500 }
    )
  }
}

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

    const requisitions = await db.getRequisitions(tenant.id)
    return NextResponse.json({ requisitions })

  } catch (error) {
    console.error('Error fetching approvals:', error)
    return NextResponse.json(
      { error: "Failed to fetch approvals" },
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
    const { requisitionId, action, comment } = body

    // Get the requisition
    const requisition = await db.getRequisition(requisitionId)
    if (!requisition) {
      return NextResponse.json({ error: "Requisition not found" }, { status: 404 })
    }

    // Update requisition with approval action
    const updatedRequisition = await db.updateRequisition(requisitionId, {
      ...requisition,
      status: action === 'approve' ? 'approved' : 'declined',
      updatedAt: new Date().toISOString(),
      approvalHistory: [
        ...(requisition.approvalHistory || []),
        {
          approver: 'Current User', // In real app, get from auth
          action,
          comment,
          date: new Date().toISOString()
        }
      ]
    })

    return NextResponse.json({
      success: true,
      requisition: updatedRequisition,
      message: `Requisition ${action}d successfully`
    })

  } catch (error) {
    console.error('Error processing approval:', error)
    return NextResponse.json(
      { error: "Failed to process approval" },
      { status: 500 }
    )
  }
}

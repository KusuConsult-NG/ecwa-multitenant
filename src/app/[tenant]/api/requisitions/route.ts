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
    console.error('Error fetching requisitions:', error)
    return NextResponse.json(
      { error: "Failed to fetch requisitions" },
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
    const { title, description, amount, category, requester, requesterEmail, status } = body

    // Determine approval chain based on organization level
    const approvalChain = getApprovalChain(tenant.organization?.level || 'LC')
    
    const requisition = await db.createRequisition({
      tenantId: tenant.id,
      title,
      description,
      amount,
      category,
      requester,
      requesterEmail,
      status: status || 'pending',
      currentApprover: approvalChain[0],
      approvalChain,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      requisition,
      message: 'Requisition created successfully'
    })

  } catch (error) {
    console.error('Error creating requisition:', error)
    return NextResponse.json(
      { error: "Failed to create requisition" },
      { status: 500 }
    )
  }
}

function getApprovalChain(level: string): string[] {
  switch (level) {
    case 'LC':
      return ['Financial Secretary', 'Secretary', 'Senior Minister', 'Treasurer']
    case 'LCC':
      return ['Financial Secretary', 'Secretary', 'LO', 'Treasurer']
    case 'DCC':
      return ['Secretary', 'Chairman', 'Accountant']
    case 'GCC':
      return ['Financial Secretary', 'General Secretary', 'Treasurer']
    default:
      return ['Financial Secretary', 'Secretary', 'Treasurer']
  }
}

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET() {
  try {
    const lccs = await db.getTenantsByType('LCC')
    return NextResponse.json({ organizations: lccs })
  } catch (error) {
    console.error('Error fetching LCCs:', error)
    return NextResponse.json(
      { error: "Failed to fetch LCCs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orgDetails, leaders, agencies } = await request.json()

    // Create LCC organization
    const lcc = await db.createTenant({
      name: orgDetails.name,
      slug: orgDetails.name.toLowerCase().replace(/\s+/g, '-'),
      domain: `${orgDetails.name.toLowerCase().replace(/\s+/g, '-')}.ecwa.app`,
      settings: {
        primaryColor: '#10b981',
        theme: 'light' as const
      },
      organization: {
        type: 'LCC' as const,
        name: orgDetails.name,
        parentId: orgDetails.parentDcc
      }
    })

    // Create leadership team
    for (const leader of leaders) {
      if (leader.name && leader.email) {
        await db.createUser({
          email: leader.email,
          name: leader.name,
          role: leader.role,
          tenantId: lcc.id,
          permissions: getRolePermissions(leader.role, 'LCC')
        })
      }
    }

    // Create agencies
    for (const agency of agencies) {
      if (agency.name) {
        await db.addAgency(lcc.id, {
          name: agency.name,
          type: 'Agency',
          leader: agency.leader,
          contact: agency.leaderPhone,
          description: `Agency under ${orgDetails.name}`,
          status: 'active',
          establishedDate: new Date().toISOString()
        })
      }
    }

    return NextResponse.json({
      success: true,
      organization: lcc,
      message: 'LCC created successfully'
    })

  } catch (error) {
    console.error('Error creating LCC:', error)
    return NextResponse.json(
      { error: "Failed to create LCC" },
      { status: 500 }
    )
  }
}

function getRolePermissions(role: string, level: string): string[] {
  const permissions: Record<string, string[]> = {
    'LCC Secretary': ['*'],
    'Local Overseer (LO)': ['analytics.read', 'approvals.write', 'policy.read'],
    'Assistant LO': ['analytics.read', 'policy.read'],
    'Secretary': ['members.read', 'members.write', 'reports.read'],
    'Treasurer': ['financials.read', 'financials.write', 'reports.read'],
    'Financial Secretary': ['financials.read', 'financials.write', 'reports.read'],
    'Delegate': ['analytics.read', 'policy.read']
  }
  
  return permissions[role] || ['profile.read']
}

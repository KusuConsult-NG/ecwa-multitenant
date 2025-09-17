import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET() {
  try {
    const lcs = await db.getTenantsByType('LC')
    return NextResponse.json({ organizations: lcs })
  } catch (error) {
    console.error('Error fetching LCs:', error)
    return NextResponse.json(
      { error: "Failed to fetch LCs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orgDetails, leaders, agencies } = await request.json()

    // Create LC organization
    const lc = await db.createTenant({
      name: orgDetails.name,
      slug: orgDetails.name.toLowerCase().replace(/\s+/g, '-'),
      domain: `${orgDetails.name.toLowerCase().replace(/\s+/g, '-')}.ecwa.app`,
      settings: {
        primaryColor: '#8b5cf6',
        theme: 'light' as const
      },
      organization: {
        type: 'LC' as const,
        name: orgDetails.name,
        level: 'LC',
        parentId: orgDetails.parentLcc,
        location: orgDetails.location,
        address: orgDetails.address,
        state: orgDetails.state,
        country: orgDetails.country
      }
    })

    // Create leadership team
    for (const leader of leaders) {
      if (leader.name && leader.email) {
        await db.createUser({
          email: leader.email,
          name: leader.name,
          role: leader.role,
          tenantId: lc.id,
          permissions: getRolePermissions(leader.role, 'LC')
        })
      }
    }

    // Create agencies
    for (const agency of agencies) {
      if (agency.name) {
        await db.addAgency(lc.id, {
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
      organization: lc,
      message: 'LC created successfully'
    })

  } catch (error) {
    console.error('Error creating LC:', error)
    return NextResponse.json(
      { error: "Failed to create LC" },
      { status: 500 }
    )
  }
}

function getRolePermissions(role: string, level: string): string[] {
  const permissions: Record<string, string[]> = {
    'LC Secretary': ['*'],
    'Senior Minister': ['analytics.read', 'approvals.write', 'policy.read', 'members.read'],
    'Associate Minister': ['members.read', 'members.write', 'reports.read'],
    'Pastoral Team': ['members.read', 'reports.read'],
    'Elder': ['members.read', 'reports.read'],
    'Treasurer': ['financials.read', 'financials.write', 'reports.read'],
    'Financial Secretary': ['financials.read', 'financials.write', 'reports.read'],
    'Works Director': ['works.read', 'works.write'],
    'Chief Usher': ['ushering.read', 'ushering.write'],
    'Missions Director': ['missions.read', 'missions.write'],
    'Welfare Director': ['welfare.read', 'welfare.write']
  }
  
  return permissions[role] || ['profile.read']
}

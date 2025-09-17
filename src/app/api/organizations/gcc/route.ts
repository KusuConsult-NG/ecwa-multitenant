import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { orgDetails, leaders, agencies, departments } = await request.json()

    // Create GCC organization
    const gcc = await db.createTenant({
      name: orgDetails.name,
      slug: 'gcc',
      domain: 'gcc.ecwa.app',
      settings: {
        primaryColor: '#0ea5e9',
        theme: 'light' as const
      },
      organization: {
        type: 'GCC' as const,
        name: orgDetails.name,
        level: 'GCC',
        parentId: null,
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
          tenantId: gcc.id,
          permissions: getRolePermissions(leader.role, 'GCC')
        })
      }
    }

    // Create agencies
    for (const agency of agencies) {
      if (agency.name) {
        await db.addAgency(gcc.id, {
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

    // Create departments
    for (const dept of departments) {
      if (dept.name) {
        await db.addAgency(gcc.id, {
          name: dept.name,
          type: 'Department',
          leader: dept.director,
          contact: dept.directorPhone,
          description: `Department under ${orgDetails.name}`,
          status: 'active',
          establishedDate: new Date().toISOString()
        })
      }
    }

    return NextResponse.json({
      success: true,
      organization: gcc,
      message: 'GCC created successfully'
    })

  } catch (error) {
    console.error('Error creating GCC:', error)
    return NextResponse.json(
      { error: "Failed to create GCC" },
      { status: 500 }
    )
  }
}

function getRolePermissions(role: string, level: string): string[] {
  const permissions: Record<string, string[]> = {
    'General Secretary': ['*'],
    'President': ['analytics.read', 'policy.write', 'approvals.write'],
    'Vice President': ['analytics.read', 'policy.read'],
    'Treasurer': ['financials.read', 'financials.write', 'reports.read'],
    'Financial Secretary': ['financials.read', 'financials.write', 'reports.read'],
    'Missions Director': ['missions.read', 'missions.write'],
    'Youth Director': ['youth.read', 'youth.write'],
    'Women Director': ['women.read', 'women.write'],
    'Men Director': ['men.read', 'men.write']
  }
  
  return permissions[role] || ['profile.read']
}

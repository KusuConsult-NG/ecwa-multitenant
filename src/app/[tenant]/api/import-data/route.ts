import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

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
    const { selectedData, ecwaData } = body

    const importedData = {
      dccs: [],
      lccs: [],
      lcs: []
    }

    // Import selected DCCs
    for (const dccId of selectedData.dccs) {
      const dccData = ecwaData.dccs.find(dcc => dcc.id === dccId)
      if (dccData) {
        const importedDCC = await db.createTenant({
          name: dccData.name,
          slug: dccData.id,
          domain: `${dccData.id}.ecwa.app`,
          settings: {
            primaryColor: '#0ea5e9',
            theme: 'light' as const
          },
          organization: {
            type: 'DCC' as const,
            name: dccData.name,
            level: 'DCC',
            parentId: null,
            location: dccData.location,
            state: dccData.state
          }
        })
        importedData.dccs.push(importedDCC)
      }
    }

    // Import selected LCCs
    for (const lccId of selectedData.lccs) {
      const lccData = ecwaData.lccs.find(lcc => lcc.id === lccId)
      if (lccData) {
        // Find parent DCC
        const parentDCC = importedData.dccs.find(dcc => dcc.organization?.name === lccData.parentDcc) ||
                         await db.getTenantBySlug(lccData.parentDcc)
        
        const importedLCC = await db.createTenant({
          name: lccData.name,
          slug: lccData.id,
          domain: `${lccData.id}.ecwa.app`,
          settings: {
            primaryColor: '#10b981',
            theme: 'light' as const
          },
          organization: {
            type: 'LCC' as const,
            name: lccData.name,
            level: 'LCC',
            parentId: parentDCC?.id,
            location: lccData.location,
            state: lccData.state
          }
        })
        importedData.lccs.push(importedLCC)
      }
    }

    // Import selected LCs
    for (const lcId of selectedData.lcs) {
      const lcData = ecwaData.lcs.find(lc => lc.id === lcId)
      if (lcData) {
        // Find parent LCC
        const parentLCC = importedData.lccs.find(lcc => lcc.organization?.name === lcData.parentLcc) ||
                         await db.getTenantBySlug(lcData.parentLcc)
        
        const importedLC = await db.createTenant({
          name: lcData.name,
          slug: lcData.id,
          domain: `${lcData.id}.ecwa.app`,
          settings: {
            primaryColor: '#8b5cf6',
            theme: 'light' as const
          },
          organization: {
            type: 'LC' as const,
            name: lcData.name,
            level: 'LC',
            parentId: parentLCC?.id,
            location: lcData.location,
            state: lcData.state
          }
        })
        importedData.lcs.push(importedLC)
      }
    }

    return NextResponse.json({
      success: true,
      importedData,
      message: `Successfully imported ${importedData.dccs.length} DCCs, ${importedData.lccs.length} LCCs, and ${importedData.lcs.length} LCs`
    })

  } catch (error) {
    console.error('Error importing data:', error)
    return NextResponse.json(
      { error: "Failed to import data" },
      { status: 500 }
    )
  }
}

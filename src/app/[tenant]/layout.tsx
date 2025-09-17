import { notFound } from "next/navigation"
import { getTenantBySlug } from "@/lib/tenant"
import TenantProvider from "@/components/TenantProvider"
import TenantTopbar from "@/components/TenantTopbar"
import TenantSidebar from "@/components/TenantSidebar"

interface TenantLayoutProps {
  children: React.ReactNode
  params: {
    tenant: string
  }
}

export default async function TenantLayout({ 
  children, 
  params 
}: TenantLayoutProps) {
  const tenant = await getTenantBySlug(params.tenant)
  
  if (!tenant) {
    notFound()
  }

  return (
    <TenantProvider tenant={tenant}>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <TenantTopbar />
        
        <div className="flex">
          {/* Sidebar */}
          <TenantSidebar />
          
          {/* Main Content */}
          <div className="flex-1">
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </TenantProvider>
  )
}

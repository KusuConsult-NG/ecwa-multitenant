import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ecwa-50 to-blue-100">
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ECWA Multi-Tenant Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Financial management system for ECWA organizations
          </p>
          
          <div className="grid cols-3 max-w-4xl mx-auto">
            <div className="card text-center">
              <h3 className="text-lg font-semibold mb-2">Multi-Tenant</h3>
              <p className="text-gray-600">Each organization has its own isolated environment</p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">Different permissions for different organizational levels</p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-lg font-semibold mb-2">Financial Management</h3>
              <p className="text-gray-600">Complete financial tracking and reporting</p>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Available Organizations</h2>
            <div className="grid cols-2 max-w-2xl mx-auto">
              <Link 
                href="/jos" 
                className="card hover:shadow-lg transition-shadow text-center"
              >
                <h3 className="text-lg font-semibold text-ecwa-600">ECWA Jos DCC</h3>
                <p className="text-gray-600">jos.ecwa.app</p>
              </Link>
              
              <Link 
                href="/kaduna" 
                className="card hover:shadow-lg transition-shadow text-center"
              >
                <h3 className="text-lg font-semibold text-ecwa-600">ECWA Kaduna DCC</h3>
                <p className="text-gray-600">kaduna.ecwa.app</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

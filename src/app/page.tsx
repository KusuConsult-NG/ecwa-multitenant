import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-ecwa-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ECWA Management System</h1>
                <p className="text-sm text-gray-500">Multi-Tenant Church Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Select Your Organization
          </h2>
          <p className="text-lg text-gray-600">
            Choose your ECWA organization to access the management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Jos DCC */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-ecwa-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl">J</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ECWA Jos DCC</h3>
              <p className="text-gray-600 mb-4">District Church Council - Jos</p>
              <Link 
                href="/jos" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ecwa-600 hover:bg-ecwa-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecwa-500 w-full justify-center"
              >
                Access Jos DCC
              </Link>
            </div>
          </div>

          {/* Kaduna DCC */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-ecwa-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ECWA Kaduna DCC</h3>
              <p className="text-gray-600 mb-4">District Church Council - Kaduna</p>
              <Link 
                href="/kaduna" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ecwa-600 hover:bg-ecwa-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecwa-500 w-full justify-center"
              >
                Access Kaduna DCC
              </Link>
            </div>
          </div>

          {/* Add New Organization */}
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-ecwa-400 transition-colors">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400 font-bold text-2xl">+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Add New Organization</h3>
              <p className="text-gray-500 mb-4">Register a new ECWA organization</p>
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecwa-500 w-full justify-center"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <h4 className="font-semibold text-gray-900">Financial Management</h4>
              <p className="text-sm text-gray-600">Track income, expenses, and budgets</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-600 text-xl">👥</span>
              </div>
              <h4 className="font-semibold text-gray-900">Member Management</h4>
              <p className="text-sm text-gray-600">Manage church members and profiles</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-purple-600 text-xl">🏢</span>
              </div>
              <h4 className="font-semibold text-gray-900">Agency Management</h4>
              <p className="text-sm text-gray-600">Organize ministries and fellowships</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-orange-600 text-xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900">Reports & Analytics</h4>
              <p className="text-sm text-gray-600">Comprehensive reporting system</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

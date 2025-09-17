import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-ecwa-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-ecwa-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ECWA Management System</h1>
                <p className="text-sm text-gray-600">Evangelical Church Winning All - Digital Platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Version 2.0</p>
              <p className="text-xs text-gray-400">Multi-Tenant Architecture</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ECWA Organizational Hierarchy
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Access your organization level in the ECWA structure
          </p>
        </div>

        {/* Organization Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* GCC */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-ecwa-600 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-ecwa-600 to-ecwa-800 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">GCC</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">General Church Council</h3>
              <p className="text-gray-600 mb-4 text-sm">National Headquarters</p>
              <div className="space-y-2 text-xs text-gray-500 mb-4">
                <p>• Nationwide oversight</p>
                <p>• Policy management</p>
                <p>• Global mission oversight</p>
              </div>
              <Link 
                href="/gcc" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-ecwa-600 hover:bg-ecwa-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecwa-500 w-full justify-center"
              >
                Access GCC
              </Link>
            </div>
          </div>

          {/* DCC */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">DCC</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">District Church Council</h3>
              <p className="text-gray-600 mb-4 text-sm">Regional Level</p>
              <div className="space-y-2 text-xs text-gray-500 mb-4">
                <p>• Regional supervision</p>
                <p>• Resource distribution</p>
                <p>• District projects</p>
              </div>
              <Link 
                href="/dcc" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full justify-center"
              >
                Access DCC
              </Link>
            </div>
          </div>

          {/* LCC */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">LCC</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Church Council</h3>
              <p className="text-gray-600 mb-4 text-sm">Sub-District Level</p>
              <div className="space-y-2 text-xs text-gray-500 mb-4">
                <p>• Local coordination</p>
                <p>• Church oversight</p>
                <p>• Training & events</p>
              </div>
              <Link 
                href="/lcc" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full justify-center"
              >
                Access LCC
              </Link>
            </div>
          </div>

          {/* LC */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-purple-500 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">LC</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Church</h3>
              <p className="text-gray-600 mb-4 text-sm">Congregation Level</p>
              <div className="space-y-2 text-xs text-gray-500 mb-4">
                <p>• Daily operations</p>
                <p>• Agency management</p>
                <p>• Member services</p>
              </div>
              <Link 
                href="/lc" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full justify-center"
              >
                Access LC
              </Link>
            </div>
          </div>
        </div>

        {/* Organization Creation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create New Organization</h3>
            <p className="text-gray-600">Set up a new ECWA organization following the proper hierarchy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/create/gcc" 
              className="bg-gradient-to-br from-ecwa-50 to-ecwa-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-ecwa-200"
            >
              <div className="h-12 w-12 bg-ecwa-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create GCC</h4>
              <p className="text-sm text-gray-600">General Church Council</p>
            </Link>

            <Link 
              href="/create/dcc" 
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-blue-200"
            >
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create DCC</h4>
              <p className="text-sm text-gray-600">District Church Council</p>
            </Link>

            <Link 
              href="/create/lcc" 
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-green-200"
            >
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create LCC</h4>
              <p className="text-sm text-gray-600">Local Church Council</p>
            </Link>

            <Link 
              href="/create/lc" 
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-purple-200"
            >
              <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create LC</h4>
              <p className="text-sm text-gray-600">Local Church</p>
            </Link>
          </div>
        </div>

        {/* System Features */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">👥</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Leadership Management</h4>
              <p className="text-sm text-gray-600">Add, edit, and manage leadership roles across all levels</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">💰</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Financial Management</h4>
              <p className="text-sm text-gray-600">Complete financial tracking with approval workflows</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-purple-600 text-2xl">🏢</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Agency Management</h4>
              <p className="text-sm text-gray-600">Manage fellowships, departments, and groups</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-orange-600 text-2xl">📊</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Analytics & Reports</h4>
              <p className="text-sm text-gray-600">Role-based dashboards and comprehensive reporting</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

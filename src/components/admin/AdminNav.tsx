import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Mail, LogOut, Menu, X, Package } from 'lucide-react'
import { useState } from 'react'
import { auth } from '../../lib/auth'

const AdminNav = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/blog', label: 'Blog Posts', icon: FileText },
    { path: '/admin/projects', label: 'Projects', icon: Package },
    { path: '/admin/contacts', label: 'Contacts', icon: Mail },
  ]

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/admin" className="text-xl font-bold text-white">
              eqostack Admin
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right side - Sign Out */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AdminNav

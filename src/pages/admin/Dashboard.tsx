import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import AdminNav from '../../components/admin/AdminNav'
import {
  FileText,
  Mail,
  Briefcase,
  Package,
  Users,
  Settings,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogPosts: 0,
    contactSubmissions: 0,
    jobPositions: 0,
    products: 0,
    unreadContacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch blog posts count
      const { count: blogCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })

      // Fetch contact submissions
      const { count: contactCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })

      // Fetch unread contacts
      const { count: unreadCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')

      // Fetch job positions
      const { count: jobCount } = await supabase
        .from('job_positions')
        .select('*', { count: 'exact', head: true })

      // Fetch products
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      setStats({
        blogPosts: blogCount || 0,
        contactSubmissions: contactCount || 0,
        jobPositions: jobCount || 0,
        products: productCount || 0,
        unreadContacts: unreadCount || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }


  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.blogPosts,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/blog',
    },
    {
      title: 'Contact Submissions',
      value: stats.contactSubmissions,
      icon: Mail,
      color: 'from-green-500 to-green-600',
      link: '/admin/contacts',
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : undefined,
    },
    {
      title: 'Job Positions',
      value: stats.jobPositions,
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/careers',
    },
    {
      title: 'Products',
      value: stats.products,
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/products',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNav />
      
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center text-white py-12">Loading...</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Link key={stat.title} to={stat.link}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-colors relative"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        {stat.badge && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {stat.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.title}</div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    to="/admin/blog/new"
                    className="block w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                  >
                    Create Blog Post
                  </Link>
                  <Link
                    to="/admin/blog"
                    className="block w-full px-4 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center"
                  >
                    Manage Blog Posts
                  </Link>
                  <Link
                    to="/admin/contacts"
                    className="block w-full px-4 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center"
                  >
                    View Contacts
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {stats.unreadContacts > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <AlertCircle className="text-yellow-400" size={20} />
                      <div>
                        <div className="text-white font-semibold">{stats.unreadContacts} unread messages</div>
                        <Link to="/admin/contacts" className="text-primary-400 text-sm hover:underline">
                          View contacts →
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="text-gray-400 text-sm">
                    Welcome to the admin dashboard. Start managing your content!
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard

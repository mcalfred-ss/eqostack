import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import AdminNav from '../../components/admin/AdminNav'
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Search, Download } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image?: string
  variants?: string[]
  download_url?: string
  published: boolean
  order_index: number
  created_at: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) throw error
      fetchProjects()
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Failed to update project')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNav />
      
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Projects</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your apps and projects</p>
            </div>
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus size={20} />
              New Project
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white py-12">Loading...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400 mb-4">No projects found</p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus size={20} />
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Variants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Download
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {project.image && (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-white">{project.title}</div>
                            <div className="text-sm text-gray-400 mt-1 line-clamp-2 max-w-md">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.variants && project.variants.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {project.variants.slice(0, 3).map((variant, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-600/20 text-primary-400"
                              >
                                {variant}
                              </span>
                            ))}
                            {project.variants.length > 3 && (
                              <span className="px-2 py-1 text-xs text-gray-400">
                                +{project.variants.length - 3}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.download_url ? (
                          <a
                            href={project.download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
                          >
                            <Download size={14} />
                            <span className="text-sm">Link</span>
                          </a>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(project.id, project.published)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            project.published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-600 text-gray-400'
                          }`}
                        >
                          {project.published ? <Eye size={14} /> : <EyeOff size={14} />}
                          {project.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(project.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/projects/${project.id}/edit`}
                            className="text-primary-400 hover:text-primary-300 p-2 hover:bg-primary-500/10 rounded"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id, project.title)}
                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Projects

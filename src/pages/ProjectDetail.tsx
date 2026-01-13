import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Calendar, ArrowLeft, Download, Tag } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image?: string
  variants?: string[]
  download_url?: string
  created_at: string
  updated_at: string
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single()

      if (error) throw error

      if (!data) {
        setError('Project not found')
        return
      }

      setProject(data)
    } catch (error: any) {
      console.error('Error fetching project:', error)
      setError(error.message || 'Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The project you are looking for does not exist.'}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-900">
      {/* Hero Section with Image */}
      {project.image && (
        <section className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </section>
      )}

      <div className="container-custom py-8 sm:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 sm:p-8 md:p-10 border border-gray-700"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              {project.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Variants */}
            {project.variants && project.variants.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-wrap gap-2">
                  {project.variants.map((variant, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-600/20 text-primary-400 rounded-full text-sm font-medium"
                    >
                      <Tag size={14} />
                      {variant}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Download Button */}
            {project.download_url && (
              <div className="pt-6 border-t border-gray-700">
                <a
                  href={project.download_url}
                  download
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors text-base sm:text-lg shadow-lg hover:shadow-xl"
                >
                  <Download size={20} />
                  <span>Download Now</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

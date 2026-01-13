import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/cards'
import { supabase } from '../lib/supabase'
import {
  Code,
  BarChart,
  LucideIcon,
} from 'lucide-react'

interface Project {
  id: string
  image?: string
  title: string
  description: string
  variants?: string[]
  downloadUrl?: string
}

interface EcosystemItem {
  icon: LucideIcon
  title: string
  description: string
}

const Products = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform database data to component format
      const transformedProjects: Project[] = (data || []).map((project) => ({
        id: project.id,
        image: project.image || undefined,
        title: project.title,
        description: project.description,
        variants: project.variants || [],
        downloadUrl: project.download_url || undefined,
      }))

      setProjects(transformedProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback to empty array on error
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const ecosystem: EcosystemItem[] = [
    {
      icon: Code,
      title: 'Developer Tools',
      description: 'Everything developers need to build amazing applications',
    },
    {
      icon: BarChart,
      title: 'Business Intelligence',
      description: 'Make data-driven decisions with powerful BI tools',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Our <span className="text-primary-400">Projects</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              Explore the apps and platforms we've developed. Each project represents our commitment
              to building solutions that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No projects available at the moment.</p>
              <p className="text-gray-500 text-sm">Check back soon for new projects!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {projects.map((project, index) => (
                <ProductCard
                  key={project.id}
                  id={project.id}
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  variants={project.variants}
                  downloadUrl={project.downloadUrl}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="section-padding bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              Complete Ecosystem
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              Additional tools and services to support your business
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ecosystem.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-700"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <IconComponent className="text-primary-400" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
              Have a Project in Mind?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
              Let's work together to bring your ideas to life. Contact us to discuss your next project.
            </p>
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products

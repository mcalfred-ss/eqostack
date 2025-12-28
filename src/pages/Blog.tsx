import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  created_at: string
  category?: string
  image?: string
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.log('Supabase not configured, using sample data')
        // Fallback to sample data if Supabase is not configured
        setPosts(samplePosts)
      } else {
        setPosts((data as BlogPost[]) || samplePosts)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Fallback to sample data
      setPosts(samplePosts)
    } finally {
      setLoading(false)
    }
  }

  // Sample posts for when Supabase is not configured
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Tech in Africa',
      excerpt:
        'Exploring how technology is transforming businesses across the African continent and what the future holds.',
      author: 'EcoStack Team',
      created_at: new Date().toISOString(),
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    },
    {
      id: 2,
      title: 'Building Scalable Cloud Infrastructure',
      excerpt:
        'Best practices for building and managing cloud infrastructure that scales with your business needs.',
      author: 'Engineering Team',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      category: 'Engineering',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    },
    {
      id: 3,
      title: 'Mobile Money Revolution in Africa',
      excerpt:
        'How mobile payment solutions are revolutionizing commerce and financial inclusion across Africa.',
      author: 'Product Team',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    },
    {
      id: 4,
      title: 'AI and Machine Learning Opportunities',
      excerpt:
        'Discovering the potential of AI and ML in solving unique challenges faced by African businesses.',
      author: 'Data Science Team',
      created_at: new Date(Date.now() - 259200000).toISOString(),
      category: 'AI/ML',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    },
  ]

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

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
              Updates & <span className="text-primary-400">Blog</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Stay updated with the latest news, insights, and stories from
              EcoStack
            </p>
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto px-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
              <p className="mt-4 text-gray-300">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-300">No posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border border-gray-700"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute top-4 left-4 bg-gray-900 text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                      <Calendar size={14} className="mr-2" />
                      <span>{formatDate(post.created_at)}</span>
                      <span className="mx-2">•</span>
                      <User size={14} className="mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <a
                      href="#"
                      className="text-primary-400 font-semibold hover:text-primary-300 inline-flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-2" size={16} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
              Stay Updated
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
              Subscribe to our newsletter to get the latest updates and insights
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] text-sm sm:text-base"
              />
              <button className="bg-white text-primary-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors min-h-[44px] text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog


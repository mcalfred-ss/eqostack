import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { BlogCard } from '../components/cards'

interface BlogPost {
  id: string | number
  slug?: string
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
      
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        console.warn('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
        setPosts([])
        setLoading(false)
        return
      }

      // Fetch only published posts from Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, author, category, image, published_at, created_at')
        .eq('published', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .limit(50)

      if (error) {
        console.error('Error fetching posts from database:', error)
        // Only show error in console, don't fallback to sample data
        setPosts([])
        return
      }

      if (data && data.length > 0) {
        // Map database posts to BlogPost interface
        const mappedPosts = data.map((post: any) => ({
          id: post.id,
          slug: post.slug || generateSlugFromTitle(post.title),
          title: post.title,
          excerpt: post.excerpt || '',
          author: post.author || 'eqostack Team',
          created_at: post.published_at || post.created_at,
          category: post.category,
          image: post.image,
        }))
        setPosts(mappedPosts)
      } else {
        // No posts found in database
        setPosts([])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // Helper function to generate slug from title if missing
  const generateSlugFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }


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
              eqostack
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
              <p className="text-xl text-gray-300 mb-4">
                {searchTerm ? 'No posts match your search.' : 'No blog posts yet.'}
              </p>
              {!searchTerm && (
                <p className="text-gray-400">
                  Check back soon for updates and insights from eqostack.
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  category={post.category}
                  author={post.author}
                  created_at={post.created_at}
                  index={index}
                  formatDate={formatDate}
                />
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


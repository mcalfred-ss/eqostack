import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  author: string
  created_at: string
  published_at?: string
  category?: string
  image?: string
}

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        setError('Database not configured')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) {
        console.error('Error fetching post:', error)
        if (error.code === 'PGRST116') {
          setError('Post not found')
        } else {
          setError('Failed to load post. Please try again later.')
        }
        return
      }

      if (data) {
        setPost(data as BlogPost)
      } else {
        setError('Post not found')
      }
    } catch (err) {
      console.error('Error fetching post:', err)
      setError('Failed to load post. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
          <p className="mt-4 text-gray-300">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The post you are looking for does not exist.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Image */}
      {post.image && (
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {post.category && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm font-semibold">
                <Tag size={14} />
                {post.category}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-p:text-gray-300
            prose-strong:text-white
            prose-a:text-primary-400
            prose-a:no-underline
            prose-a:hover:underline
            prose-code:text-primary-400
            prose-pre:bg-gray-800
            prose-blockquote:border-primary-500
            prose-blockquote:text-gray-300
            prose-img:rounded-lg
            prose-img:border
            prose-img:border-gray-700"
        >
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-base sm:text-lg">
            {post.content}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <ArrowLeft size={20} />
            Back to All Posts
          </Link>
        </motion.div>
      </article>
    </div>
  )
}

export default BlogPostDetail

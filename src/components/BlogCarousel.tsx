import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  image?: string
  category?: string
  created_at: string
  published_at?: string
}

const BlogCarousel = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        setPosts([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, image, category, published_at, created_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5)

      if (!error && data && data.length > 0) {
        setPosts(data as BlogPost[])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(posts.length, 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(posts.length, 1)) % Math.max(posts.length, 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Auto-advance carousel
  useEffect(() => {
    if (posts.length <= 1) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [posts.length, currentIndex])

  if (loading) {
    return (
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
            <p className="mt-4 text-gray-300">Loading updates...</p>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null // Don't show carousel if no posts
  }

  return (
    <section className="section-padding bg-gray-900">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Latest <span className="text-primary-400">Updates</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Stay informed with our latest news, insights, and stories
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {posts[currentIndex] && (
                  <Link
                    to={`/blog/${posts[currentIndex].slug}`}
                    className="block group"
                  >
                    <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden rounded-xl bg-gray-800">
                      {posts[currentIndex].image ? (
                        <img
                          src={posts[currentIndex].image}
                          alt={posts[currentIndex].title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                          <span className="text-white text-4xl sm:text-6xl font-bold">
                            {posts[currentIndex].title.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
                        {posts[currentIndex].category && (
                          <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 w-fit">
                            {posts[currentIndex].category}
                          </span>
                        )}
                        
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 line-clamp-2">
                          {posts[currentIndex].title}
                        </h3>
                        
                        {posts[currentIndex].excerpt && (
                          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-2 max-w-3xl">
                            {posts[currentIndex].excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                            <Calendar size={16} />
                            <span>
                              {formatDate(posts[currentIndex].published_at || posts[currentIndex].created_at)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm sm:text-base group-hover:gap-4 transition-all">
                            <span>Read More</span>
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {posts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 sm:p-3 rounded-full transition-all z-10 backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 sm:p-3 rounded-full transition-all z-10 backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {posts.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-400 w-8 sm:w-10'
                      : 'bg-gray-700 w-2 sm:w-3 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm sm:text-base"
          >
            View All Updates
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogCarousel

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  id: string | number
  slug?: string
  title: string
  excerpt: string
  image?: string
  category?: string
  author: string
  created_at: string
  index?: number
  formatDate: (date: string) => string
}

const BlogCard = ({
  id,
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  created_at,
  index = 0,
  formatDate,
}: BlogCardProps) => {
  // Generate slug from title if not provided (for backward compatibility)
  const postSlug = slug || (typeof id === 'string' ? id : title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border border-gray-700 h-full flex flex-col"
    >
      <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden flex-shrink-0">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-3xl sm:text-4xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gray-900 text-primary-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {category}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center flex-wrap text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 gap-1 sm:gap-0">
          <Calendar size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
          <span className="whitespace-nowrap">{formatDate(created_at)}</span>
          <span className="mx-1 sm:mx-2">•</span>
          <User size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">{author}</span>
        </div>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">{excerpt}</p>
        <Link
          to={`/blog/${postSlug}`}
          className="text-primary-400 font-semibold hover:text-primary-300 inline-flex items-center mt-auto min-h-[32px] transition-colors"
        >
          Read More
          <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    </motion.article>
  )
}

export default BlogCard


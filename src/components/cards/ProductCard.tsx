import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, ArrowRight } from 'lucide-react'

interface ProductCardProps {
  id?: string
  image?: string
  title: string
  description: string
  variants?: string[]
  downloadUrl?: string
  index?: number
}

const ProductCard = ({
  id,
  image,
  title,
  description,
  variants = [],
  downloadUrl,
  index = 0,
}: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-700"
    >
      {/* Product Image Section */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-gray-700 rounded-t-3xl overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
            <div className="text-gray-400 text-sm">No Image</div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col">
        {/* Product Name */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 min-h-[3rem] max-h-[3.5rem] overflow-hidden">
          {title}
        </h3>

        {/* Variant Options */}
        {variants.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  selectedVariant === variant
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
          {id && (
            <Link
              to={`/projects/${id}`}
              className="text-primary-400 hover:text-primary-300 font-semibold inline-flex items-center gap-1 text-xs sm:text-sm transition-colors"
            >
              View More
              <ArrowRight size={14} />
            </Link>
          )}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Download</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard


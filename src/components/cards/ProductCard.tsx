import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'

interface ProductCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: string
  index?: number
}

const ProductCard = ({
  icon: IconComponent,
  title,
  description,
  features,
  color,
  index = 0,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border border-gray-700 h-full flex flex-col"
    >
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0`}
        >
          <IconComponent className="text-white" size={20} />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 flex-grow">{description}</p>
        <ul className="space-y-2 mb-4 sm:mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-center text-xs sm:text-sm text-gray-300">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 flex-shrink-0"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="text-primary-400 font-semibold hover:text-primary-300 inline-flex items-center mt-auto min-h-[32px]"
        >
          Learn More
          <span className="ml-1">→</span>
        </Link>
      </div>
    </motion.div>
  )
}

export default ProductCard


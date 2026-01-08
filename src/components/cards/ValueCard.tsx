import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  index?: number
}

const ValueCard = ({ icon: IconComponent, title, description, index = 0 }: ValueCardProps) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg text-center border border-gray-700"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <IconComponent className="text-primary-400" size={24} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-300">{description}</p>
    </motion.div>
  )
}

export default ValueCard


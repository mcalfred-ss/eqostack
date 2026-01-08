import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index?: number
}

const FeatureCard = ({ icon: Icon, title, description, index = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-700 h-full"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
        <Icon className="text-primary-400" size={20} />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-300">{description}</p>
    </motion.div>
  )
}

export default FeatureCard


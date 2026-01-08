import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

interface PositionCardProps {
  title: string
  department: string
  description: string
  location: string
  type: string
  index?: number
}

const PositionCard = ({
  title,
  department,
  description,
  location,
  type,
  index = 0,
}: PositionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 break-words">{title}</h3>
          <span className="inline-block bg-primary-600/20 text-primary-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {department}
          </span>
        </div>
        <Briefcase className="text-primary-400 flex-shrink-0 ml-2" size={20} />
      </div>
      <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-4">
        <div className="flex items-center min-w-0">
          <MapPin size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" />
          <span>{type}</span>
        </div>
      </div>
      <Link
        to="/contact"
        className="text-primary-400 font-semibold hover:text-primary-300 inline-flex items-center mt-auto min-h-[32px]"
      >
        Apply Now
        <ArrowRight className="ml-2" size={16} />
      </Link>
    </motion.div>
  )
}

export default PositionCard


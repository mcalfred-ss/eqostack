import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

interface TeamCardProps {
  name: string
  role?: string
  description?: string
  index?: number
}

const TeamCard = ({ name, role, description, index = 0 }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl text-center border border-gray-700"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
        <Users className="text-white" size={32} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{name}</h3>
      {role && <p className="text-sm sm:text-base text-primary-400">{role}</p>}
      {description && <p className="text-sm sm:text-base text-gray-300">{description}</p>}
    </motion.div>
  )
}

export default TeamCard


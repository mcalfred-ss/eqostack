import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Heart,
  Zap,
  Globe,
  LucideIcon,
} from 'lucide-react'

interface Position {
  title: string
  department: string
  location: string
  type: string
  description: string
}

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const Careers = () => {
  const openPositions: Position[] = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Lagos, Nigeria / Remote',
      type: 'Full-time',
      description:
        'We are looking for an experienced full-stack developer to join our engineering team.',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Join our design team to create beautiful and intuitive user experiences.',
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      description:
        'Help us build and maintain scalable infrastructure for our products.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Drive our marketing strategy and help us reach more businesses across Africa.',
    },
    {
      title: 'Customer Success Manager',
      department: 'Operations',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      description:
        'Ensure our customers get the most value from our products and services.',
    },
    {
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Build machine learning models and data-driven solutions for our platform.',
    },
  ]

  const benefits: Benefit[] = [
    {
      icon: Zap,
      title: 'Competitive Salary',
      description: 'We offer competitive compensation packages',
    },
    {
      icon: Globe,
      title: 'Remote Work',
      description: 'Work from anywhere in Africa',
    },
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive health coverage',
    },
    {
      icon: Users,
      title: 'Team Culture',
      description: 'Collaborative and supportive environment',
    },
  ]

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
              Join the <span className="text-primary-400">EcoStack Team</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Be part of a team that&apos;s building the future of technology in
              Africa. We&apos;re looking for talented individuals who share our
              passion for innovation and impact.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center min-h-[44px] px-6 sm:px-8"
            >
              Get in Touch
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              Why Work at EcoStack?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              We&apos;re building something special, and we want you to be part of it
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <IconComponent className="text-primary-400" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              Open Positions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              Explore current opportunities to join our team
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                      {position.title}
                    </h3>
                    <span className="inline-block bg-primary-600/20 text-primary-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {position.department}
                    </span>
                  </div>
                  <Briefcase className="text-primary-400 flex-shrink-0 ml-2" size={20} />
                </div>
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{position.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {position.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {position.type}
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="text-primary-400 font-semibold hover:text-primary-300 inline-flex items-center"
                >
                  Apply Now
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
              Don&apos;t See a Role That Fits?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
              We&apos;re always looking for talented people. Send us your resume and
              we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
            >
              Send Your Resume
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Careers


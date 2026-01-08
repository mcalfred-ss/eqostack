import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe, Shield, Users, LucideIcon } from 'lucide-react'
import { FeatureCard } from '../components/cards'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

const Home = () => {

  const features: Feature[] = [
    {
      icon: Zap,
      title: 'Tech for Change',
      description: 'Using technology to reshape how Africa approaches challenges',
    },
    {
      icon: Globe,
      title: 'African Focus',
      description: 'Building solutions tailored to African contexts and needs',
    },
    {
      icon: Shield,
      title: 'Purpose-Driven',
      description: 'Every line of code serves a meaningful purpose',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Built with communities, for communities across Africa',
    },
  ]

  const stats: Stat[] = [
    { value: '2025', label: 'Founded' },
    { value: '100%', label: 'Open Source' },
    { value: 'Africa', label: 'Our Focus' },
    { value: 'Growing', label: 'Our Journey' },
  ]

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <img
            src="/background.jpeg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
            style={{
              minHeight: '100%',
              minWidth: '100%'
            }}
          />
          {/* Blue gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-1 bg-primary-600" />
          {/* Blue light streaks from bottom corners */}
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary-600/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary-600/10 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center w-full"
          >
            {/* Main Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-bold text-white tracking-tight
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              mb-4 sm:mb-6 leading-tight"
            >
              <div>Built to echo.</div>
              <div>Designed to endure.</div>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white
              text-sm sm:text-base md:text-lg
              max-w-2xl mx-auto
              mb-8 sm:mb-10 md:mb-12
              leading-relaxed"
            >
              We believe technology can fundamentally change how we see and solve challenges in Africa. 
              Join us as we build solutions that transform perspectives and empower communities.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto"
            >
              <Link
                to="/products"
                className="w-full sm:w-auto
                bg-white text-gray-900
                px-6 sm:px-8 py-3 sm:py-3.5
                rounded-lg text-sm sm:text-base font-semibold
                hover:bg-gray-100 transition
                inline-flex items-center justify-center
                min-h-[48px] active:scale-95"
              >
                Explore Product
                <ArrowRight className="ml-2" size={18} />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto
                bg-primary-600 text-white
                px-6 sm:px-8 py-3 sm:py-3.5
                rounded-lg text-sm sm:text-base font-semibold
                hover:bg-primary-700 transition
                inline-flex items-center justify-center
                min-h-[48px] active:scale-95"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator (desktop only) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="section-padding bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              How We're Changing Africa
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Technology isn't just about building apps—it's about changing perspectives, 
              solving real problems, and empowering communities across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Change How Africa Sees Tech?
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Join us on our mission to transform Africa through purposeful technology. 
            Together, we can build solutions that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Get Started
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

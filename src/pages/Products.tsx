import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/cards'
import {
  Cloud,
  Database,
  Smartphone,
  Shield,
  Zap,
  Globe,
  Code,
  BarChart,
  LucideIcon,
} from 'lucide-react'

interface Product {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: string
}

interface EcosystemItem {
  icon: LucideIcon
  title: string
  description: string
}

const Products = () => {
  const products: Product[] = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description:
        'Scalable cloud solutions designed for African businesses. Deploy and scale with confidence.',
      features: ['99.9% Uptime', 'Auto-scaling', 'Multi-region', '24/7 Support'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Database,
      title: 'Data Analytics Platform',
      description:
        'Transform your data into actionable insights with our powerful analytics platform.',
      features: ['Real-time Analytics', 'AI-Powered', 'Custom Dashboards', 'API Access'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Smartphone,
      title: 'Mobile Solutions',
      description:
        'Native and cross-platform mobile apps that deliver exceptional user experiences.',
      features: ['iOS & Android', 'Offline Support', 'Push Notifications', 'App Store Ready'],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      title: 'Security Suite',
      description:
        'Enterprise-grade security solutions to protect your digital assets and data.',
      features: ['End-to-End Encryption', 'DDoS Protection', 'Compliance Ready', 'Audit Logs'],
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Zap,
      title: 'Payment Gateway',
      description:
        'Seamless payment processing for African markets with support for local payment methods.',
      features: ['Multi-currency', 'Mobile Money', 'Card Payments', 'Instant Settlements'],
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Globe,
      title: 'API Platform',
      description:
        'Comprehensive API management platform for building and scaling your integrations.',
      features: ['REST & GraphQL', 'Rate Limiting', 'Documentation', 'Developer Portal'],
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  const ecosystem: EcosystemItem[] = [
    {
      icon: Code,
      title: 'Developer Tools',
      description: 'Everything developers need to build amazing applications',
    },
    {
      icon: BarChart,
      title: 'Business Intelligence',
      description: 'Make data-driven decisions with powerful BI tools',
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
              Our <span className="text-primary-400">Product Ecosystem</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              Comprehensive technology solutions designed to empower businesses
              across Africa and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.title}
                icon={product.icon}
                title={product.title}
                description={product.description}
                features={product.features}
                color={product.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="section-padding bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              Complete Ecosystem
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              Additional tools and services to support your business
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ecosystem.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-700"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <IconComponent className="text-primary-400" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">{item.description}</p>
                </motion.div>
              )
            })}
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
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
              Contact us to learn more about our products and how they can help
              your business.
            </p>
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products

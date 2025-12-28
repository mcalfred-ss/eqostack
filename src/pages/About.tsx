import { motion } from 'framer-motion'
import { Target, Users, Award, Heart, MapPin, Lightbulb, LucideIcon } from 'lucide-react'

interface Value {
  icon: LucideIcon
  title: string
  description: string
}

interface TeamMember {
  name: string
  description: string
}

const About = () => {
  const values: Value[] = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description:
        "We're committed to empowering African businesses through innovative technology solutions.",
    },
    {
      icon: Users,
      title: 'Community First',
      description:
        'Building with and for our community, ensuring our solutions meet real needs.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'We strive for excellence in everything we do, from code quality to customer service.',
    },
    {
      icon: Heart,
      title: 'Impact',
      description:
        'Focused on creating positive impact that transforms businesses and communities.',
    },
  ]

  const team: TeamMember[] = [
    {
      name: 'Leadership Team',
      description: 'Experienced professionals from across Africa and the globe',
    },
    {
      name: 'Engineering',
      description: 'Talented developers building cutting-edge solutions',
    },
    {
      name: 'Product & Design',
      description: 'Creative minds crafting beautiful and intuitive experiences',
    },
    {
      name: 'Operations',
      description: 'Dedicated team ensuring smooth operations and support',
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
              About <span className="text-primary-400">EcoStack</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              We&apos;re a technology company from Africa, building innovative
              solutions that drive digital transformation across the continent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Our Story
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-300 text-base sm:text-lg">
                <p>
                  EcoStack was founded with a vision to bridge the technology
                  gap in Africa and empower businesses with world-class digital
                  solutions. We believe that African businesses deserve access to
                  the same cutting-edge technology that drives innovation globally.
                </p>
                <p>
                  Since our inception, we&apos;ve been committed to building products
                  that are not just technologically advanced, but also tailored
                  to the unique needs and challenges of the African market.
                </p>
                <p>
                  Today, we serve thousands of businesses across the continent,
                  helping them scale, innovate, and compete on a global stage.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-12 text-white">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <MapPin size={32} />
                    <div>
                      <div className="text-2xl font-bold">50+ Countries</div>
                      <div className="text-primary-100">Across Africa</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Users size={32} />
                    <div>
                      <div className="text-2xl font-bold">100+ Team Members</div>
                      <div className="text-primary-100">Diverse & Talented</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Lightbulb size={32} />
                    <div>
                      <div className="text-2xl font-bold">Innovation First</div>
                      <div className="text-primary-100">Always Learning</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              Our Values
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg text-center border border-gray-700"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <IconComponent className="text-primary-400" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">Our Team</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              A diverse group of talented individuals united by a common vision
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl text-center border border-gray-700"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">{member.description}</p>
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
              Join Us on Our Journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
              We&apos;re always looking for talented individuals to join our team
            </p>
            <a
              href="/careers"
              className="bg-white text-primary-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block min-h-[44px] flex items-center justify-center text-sm sm:text-base"
            >
              View Careers
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About


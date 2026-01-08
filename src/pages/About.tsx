import { motion } from 'framer-motion'
import { Target, Users, Award, Heart, MapPin, Lightbulb, LucideIcon } from 'lucide-react'
import { ValueCard, TeamCard } from '../components/cards'

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
      title: 'Change Through Tech',
      description:
        "We believe technology can fundamentally change how we see and solve challenges in Africa.",
    },
    {
      icon: Users,
      title: 'Community First',
      description:
        'Building with communities, not just for them. Every solution starts with understanding real needs.',
    },
    {
      icon: Award,
      title: 'Purposeful Innovation',
      description:
        'Every line of code, every feature, every product serves a meaningful purpose in transforming Africa.',
    },
    {
      icon: Heart,
      title: 'Perspective Shift',
      description:
        "We're not just building tools—we're changing how Africa sees technology and its potential.",
    },
  ]

  const team: TeamMember[] = [
    {
      name: 'Founders',
      description: 'Visionaries committed to changing Africa through technology',
    },
    {
      name: 'Engineering',
      description: 'Builders creating purposeful solutions for African challenges',
    },
    {
      name: 'Product & Design',
      description: 'Creators designing experiences that shift perspectives',
    },
    {
      name: 'Community',
      description: 'Advocates connecting with communities across Africa',
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
              About <span className="text-primary-400">eqostack</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
              We&apos;re a startup that believes technology can fundamentally change 
              how we see and solve challenges in Africa. We&apos;re building solutions 
              that transform perspectives and empower communities.
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
                  eqostack was born from a simple belief: technology can change how 
                  we see things in Africa. We&apos;re not just building software—we&apos;re 
                  creating tools that shift perspectives, solve real problems, and 
                  empower communities across the continent.
                </p>
                <p>
                  As a startup, we&apos;re focused on building purposeful digital systems 
                  that address the unique challenges and opportunities in Africa. Every 
                  solution we create is designed with the African context in mind, 
                  understanding that technology must be both powerful and purposeful.
                </p>
                <p>
                  We&apos;re at the beginning of our journey, but our vision is clear: 
                  to use technology as a catalyst for change, transforming how Africa 
                  approaches innovation, problem-solving, and digital transformation.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-6 sm:p-8 md:p-12 text-white">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <MapPin size={24} className="sm:w-8 sm:h-8 flex-shrink-0" />
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Africa-Focused</div>
                      <div className="text-sm sm:text-base text-primary-100">Building for the continent</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Users size={24} className="sm:w-8 sm:h-8 flex-shrink-0" />
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Small Team</div>
                      <div className="text-sm sm:text-base text-primary-100">Big vision, growing team</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Lightbulb size={24} className="sm:w-8 sm:h-8 flex-shrink-0" />
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Tech for Change</div>
                      <div className="text-sm sm:text-base text-primary-100">Transforming perspectives</div>
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
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
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
              A small but passionate team united by the belief that tech can change Africa
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <TeamCard
                key={member.name}
                name={member.name}
                description={member.description}
                index={index}
              />
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


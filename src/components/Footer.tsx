import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, LucideIcon } from 'lucide-react'

interface FooterLink {
  path: string
  label: string
}

interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

interface ContactInfo {
  icon: LucideIcon
  text: string
  href: string
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Helper function to check if a link is external
  const isExternalLink = (path: string): boolean => {
    return path.startsWith('http://') || path.startsWith('https://')
  }

  const footerLinks: { company: FooterLink[]; resources: FooterLink[]; legal: FooterLink[] } = {
    company: [
      { path: '/about', label: 'About Us' },
      { path: '/products', label: 'Products' },
      { path: '/careers', label: 'Careers' },
      { path: '/contact', label: 'Contact' },
    ],
    resources: [
      { path: '/blog', label: 'Blog' },
      { path: 'https://docs.eqostack.com', label: 'Documentation' },
      { path: 'https://support.eqostack.com', label: 'Support' },
      { path: 'https://api.eqostack.com', label: 'API Reference' },
    ],
    legal: [
      { path: 'https://eqostack.com/privacy', label: 'Privacy Policy' },
      { path: 'https://eqostack.com/terms', label: 'Terms of Service' },
      { path: 'https://eqostack.com/cookies', label: 'Cookie Policy' },
      { path: 'https://eqostack.com/gdpr', label: 'GDPR' },
    ],
  }

  const socialLinks: SocialLink[] = [
    { icon: Facebook, href: 'https://www.facebook.com/eqostack', label: 'Facebook' },
    { icon: Twitter, href: 'https://www.twitter.com/eqostack', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/eqostack', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/eqostack', label: 'Instagram' },
  ]

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      text: 'hello@eqostack.com',
      href: 'mailto:hello@eqostack.com',
    },
    {
      icon: Phone,
      text: '+234 (0) 123 456 7890',
      href: 'tel:+2341234567890',
    },
    {
      icon: MapPin,
      text: 'Lagos, Nigeria',
      href: '#',
    },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  EcoStack
                </h3>
              </Link>
              <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-md">
                Building innovative tech solutions for Africa and beyond. 
                Empowering businesses with cutting-edge technology.
              </p>
              
              {/* Social Links */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-primary-400 hover:bg-gray-800/80 transition-all"
                        aria-label={social.label}
                      >
                        <IconComponent size={18} />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center space-x-3 text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors group"
                    >
                      <IconComponent 
                        size={18} 
                        className="text-gray-500 group-hover:text-primary-400 transition-colors" 
                      />
                      <span>{contact.text}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links Section - Company, Resources, Legal side by side */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Company Links */}
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.path}>
                      {isExternalLink(link.path) ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-block"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-4 text-base sm:text-lg">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.path}>
                      {isExternalLink(link.path) ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-block"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                &copy; {currentYear} EcoStack. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

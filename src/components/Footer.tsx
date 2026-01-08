import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  LucideIcon,
} from 'lucide-react'

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

  const isExternalLink = (path: string) =>
    path.startsWith('http://') || path.startsWith('https://')

  const footerLinks = {
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
    { icon: Mail, text: 'eqostack@gmail.com', href: 'mailto:eqostack@gmail.com' },
    { icon: Phone, text: '+233 0548622418', href: 'tel:+2330548622418' },
    { icon: MapPin, text: 'Kumasi, Ghana', href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* MAIN */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* BRAND */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  eqostack
                </h3>
              </Link>

              <p className="text-sm sm:text-base text-gray-400 max-w-md mb-6">
                Building innovative tech solutions for Africa and beyond.
                Empowering businesses with cutting-edge technology.
              </p>

              {/* SOCIAL */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gray-800 flex items-center justify-center
                        text-gray-400 hover:text-primary-400 transition min-w-[44px] min-h-[44px]"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* CONTACT */}
              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, text, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex items-start gap-3 text-sm sm:text-base
                      text-gray-400 hover:text-primary-400 transition min-h-[44px] items-center"
                  >
                    <Icon size={18} className="mt-0.5 flex-shrink-0" />
                    <span className="break-words">{text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS — RESPONSIVE GRID */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {/* COMPANY */}
                <div>
                  <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition block min-h-[32px] flex items-center"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RESOURCES */}
                <div>
                  <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.path}>
                        {isExternalLink(link.path) ? (
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition block min-h-[32px] flex items-center"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.path}
                            className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition block min-h-[32px] flex items-center"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LEGAL */}
                <div>
                  <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.path}>
                        {isExternalLink(link.path) ? (
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition block min-h-[32px] flex items-center"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.path}
                            className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition block min-h-[32px] flex items-center"
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
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © {currentYear} eqostack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

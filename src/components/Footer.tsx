import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import React from 'react'
import {
  Twitter,
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
  icon: LucideIcon | React.ComponentType<{ size?: number }>
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

  // TikTok icon component (lucide-react doesn't have TikTok, using custom SVG)
  const TikTokIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )

  const socialLinks: SocialLink[] = [
    { icon: Twitter, href: 'https://x.com/eqostack?s=11', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/_eqostack?igsh=MTc0NGhsb3RqdWU5dg%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@eqostack', label: 'TikTok' },
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

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Updates' },
    { path: '/contact', label: 'Contact' },
    { path: '/careers', label: 'Careers' },
  ]

  const isHomePage = location.pathname === '/'
  const isLandingPage = isHomePage && !scrolled

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLandingPage
          ? 'bg-transparent'
          : scrolled
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800'
          : 'bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2 min-h-[44px]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <img
                src="/eqostack logo.png"
                alt="eqostack logo"
                className="h-8 sm:h-10 w-auto"
              />
              <span className={`text-xl sm:text-2xl font-bold ${
                isLandingPage
                  ? 'text-white'
                  : 'bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent'
              }`}>
                eqostack
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
              className={`relative font-medium transition-colors ${
                isLandingPage
                  ? location.pathname === link.path
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                  : location.pathname === link.path
                  ? 'text-primary-400'
                  : 'text-gray-300 hover:text-primary-400'
              }`}
              >
                {link.label}
                {location.pathname === link.path && !isLandingPage && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
                {location.pathname === link.path && isLandingPage && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              isLandingPage ? 'text-white' : 'text-gray-300'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

          {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              isLandingPage
                ? 'bg-black/80 backdrop-blur-sm border-white/20'
                : 'bg-gray-900 border-gray-800'
            }`}
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 font-medium min-h-[44px] flex items-center rounded-lg transition-colors ${
                    isLandingPage
                      ? location.pathname === link.path
                        ? 'text-white bg-white/10'
                        : 'text-white/80 hover:bg-white/5'
                      : location.pathname === link.path
                      ? 'text-primary-400 bg-primary-400/10'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar


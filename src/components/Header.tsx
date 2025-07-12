import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '../data/mockData';
import { assets } from '../config/assets';
import {
  Menu,
  X
} from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 }
    }
  };

  // Keep navigation items white in both themes
  const styles = {
    activeLink: "text-white bg-white/10 border-accent shadow-lg shadow-accent/20",
    inactiveLink: "text-white hover:text-white hover:bg-white/5 border-transparent"
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 bg-neutral-900 overflow-hidden ${
        isScrolled 
          ? 'backdrop-blur-xl border-b shadow-lg' 
          : ''
      }`}
      style={{
        borderColor: 'rgba(0, 0, 0, 0.1)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Animated background matching hero section */}
      <div className="absolute inset-0 bg-cyber opacity-10"></div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-4 left-4 w-12 h-12 bg-primary-400/10 rounded-full blur-xl animate-float"
      />
      <motion.div 
        className="absolute top-8 right-8 w-16 h-16 bg-secondary-400/10 rounded-full blur-xl animate-bounce-slow"
      />
      <motion.div 
        className="absolute bottom-4 left-1/2 w-10 h-10 bg-accent-400/10 rounded-full blur-xl animate-float"
        style={{ animationDuration: '5s' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="itech"
              className="w-28 h-28 object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                custom={index}
              >
                <Link
                  to={item.path}
                  className={`relative px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 border ${
                    isActive(item.path)
                      ? styles.activeLink
                      : styles.inactiveLink
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-accent/20 rounded-full"
                      style={{
                        borderRadius: 9999,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden relative z-[10000]">
            <motion.button
              onClick={handleMobileMenuToggle}
              className="p-3 text-white hover:text-purple-500 hover:bg-white/10 focus:outline-none rounded-xl transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-white/10"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-md z-[9997] lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="lg:hidden overflow-hidden relative z-[9998] w-full flex justify-center"
              >
                <div 
                  className="mx-4 mb-4 p-8 border rounded-3xl relative max-w-sm w-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(25px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="space-y-4 flex flex-col items-center">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="w-full max-w-xs"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-8 py-5 rounded-2xl text-lg font-bold transition-all duration-300 text-center ${
                            isActive(item.path)
                              ? `text-white bg-gradient-to-r from-accent/30 to-cyan-400/30 shadow-lg shadow-accent/20 border border-accent/20`
                              : `text-white/90 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10`
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}; 
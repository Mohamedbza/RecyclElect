import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { companyInfo } from '../data/mockData';
import { assets } from '../config/assets';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Globe
} from 'lucide-react';

export const Footer = () => {
  const currentYear = 2025;

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" }
  ];

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Marketplace", href: "/j-achete" },
    { name: "Nous contacter", href: "/nous-contacter" }
  ];

  const serviceLinks = [
    { name: "Ordinateurs portables", href: "/j-achete" },
    { name: "Pièces détachées", href: "/j-achete" },
    { name: "Réparations", href: "/nous-contacter" }
  ];

  return (
    <footer className="relative bg-white text-neutral-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-neutral-50 opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center mb-6">
                  <img 
                    src={assets.logo} 
                    alt="RecyclElect Logo" 
                    className="h-20 w-auto"
                  />
                </div>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
              {companyInfo.description}
            </p>
                
                {/* Social Links */}
            <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 ${social.color} transition-all duration-300 hover:bg-neutral-200 hover:scale-110`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="sr-only">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6">Navigation</h4>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
          </div>

            {/* Services */}
          <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6">Services</h4>
                <ul className="space-y-4">
                  {serviceLinks.map((link, index) => (
                    <li key={index}>
                  <Link 
                        to={link.href}
                        className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 flex items-center group"
                  >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                        {link.name}
                  </Link>
                </li>
              ))}
            </ul>
              </motion.div>
          </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6">Contact</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                              <div>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {companyInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent-400 flex-shrink-0" />
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

         

        {/* Bottom Section */}
        <div className="py-8 border-t border-neutral-200">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-neutral-500">
              <p>© {currentYear} GoodPc. Tous droits réservés.</p>
              <span className="hidden lg:block">|</span>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Politique de confidentialité
                </a>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Conditions d'utilisation
                </a>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Mentions légales
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Fabriqué avec passion au</span>
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Canada</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 
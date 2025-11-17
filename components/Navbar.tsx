'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRules = () => {
    const rulesSection = document.getElementById('rules');
    if (rulesSection) {
      rulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Émettre un événement personnalisé pour la recherche
    window.dispatchEvent(new CustomEvent('searchRules', { detail: query }));
    
    // Scroll vers la section règlement si on commence à taper
    if (query.length > 0) {
      scrollToRules();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            {/* Logo image */}
            <img 
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              style={{ height: `${siteConfig.logo.height}px` }}
              className="w-auto"
              onError={(e) => {
                // Fallback si le logo n'existe pas
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            {/* Fallback texte si pas de logo */}
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-neon bg-clip-text text-transparent"
              style={{ display: 'none' }}
            >
              {siteConfig.name}
            </div>
          </motion.div>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          {/* Barre de recherche */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Rechercher dans le règlement..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-dark-card/80 text-gray-300 px-4 py-2 pl-10 w-72 border border-white/10 focus:border-primary focus:outline-none transition-all"
              style={{ borderRadius: '2px' }}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M12.5 12.5l3 3" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  window.dispatchEvent(new CustomEvent('searchRules', { detail: '' }));
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToRules}
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Règlement
          </motion.button>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Contact
            </motion.button>
          </Link>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-2.5 font-semibold transition-all"
            style={{ borderRadius: '2px' }}
          >
            <MessageCircle size={18} />
            Discord
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}


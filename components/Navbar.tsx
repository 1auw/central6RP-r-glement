'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageCircle, Shield, Users, Ban, Car, MessageSquare, Skull, User } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Données des règles pour la recherche
const rulesData = {
  general: {
    title: 'Général',
    icon: Shield,
    rules: [
      'Le respect est la base de notre communauté. Tout comportement toxique, insulte ou discrimination sera sanctionné immédiatement.',
      'Le métagaming est formellement interdit. Les informations obtenues en dehors du jeu ne doivent pas influencer vos actions en RP.',
      'Le RolePlay doit toujours être privilégié. Chaque action doit avoir une logique et une cohérence.',
      'Les noms de personnages doivent être réalistes et cohérents avec l\'univers RP.',
      'Tous les vêtements et casques considérés comme des "tank" sont interdits.',
      'Si vous jouez en équipe, vous devez porter les mêmes vêtements.',
    ],
  },
  event: {
    title: 'Event',
    icon: Users,
    rules: [
      'Les événements sont organisés régulièrement par le staff.',
      'Tous les joueurs peuvent y participer sauf mention contraire.',
      'Les règles spécifiques de chaque événement seront annoncées avant le début.',
      'Le fair-play est de rigueur pendant les événements.',
    ],
  },
  staff: {
    title: 'Staff',
    icon: MessageSquare,
    rules: [
      'Le respect envers les membres du staff est obligatoire en toutes circonstances.',
      'Les décisions du staff sont définitives. En cas de désaccord, ouvrez un ticket Discord.',
      'Ne sollicitez pas les staffs en jeu pour des questions administratives, utilisez Discord.',
      'Les insultes ou menaces envers un membre du staff entraînent un bannissement immédiat.',
    ],
  },
  legal: {
    title: 'Légal',
    icon: Car,
    rules: [
      'Les métiers légaux doivent être exercés avec sérieux et cohérence RP.',
      'Le respect du code de la route est obligatoire pour les activités légales.',
      'Les interactions avec la police doivent être roleplayées correctement.',
      'Les commerces et entreprises doivent respecter les prix du marché.',
    ],
  },
  illegal: {
    title: 'Illégal',
    icon: Skull,
    rules: [
      'Les activités illégales doivent être jouées avec prudence et réalisme.',
      'Les braquages nécessitent un RP de qualité et respectent un cooldown.',
      'Les fusillades doivent avoir une raison RP valable et être précédées d\'interactions.',
      'Un criminel ne s\'affiche pas en public et prend des précautions.',
      'Vous pouvez looter les armes, munitions et argent sale d\'un joueur mort.',
      'Maximum 5.000$ d\'argent propre peuvent être volés.',
      'Il est interdit de looter les gilets, bandages et soins.',
    ],
  },
  cheat: {
    title: 'Cheat & Modding',
    icon: Ban,
    rules: [
      'Tout usage de logiciel tiers, cheat ou mod menu est strictement interdit.',
      'Les mods graphiques qui donnent un avantage sont interdits.',
      'L\'exploitation de bugs est sanctionnable.',
      'Toute tentative de triche entraîne un bannissement permanent.',
    ],
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const isReglementPage = pathname === '/reglement';
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ category: string; categoryTitle: string; rule: string; icon: any; sectionIndex: number }>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success && data.user) {
          setIsLoggedIn(true);
          setUsername(data.user.username);
        }
      } catch (error) {
        // User not logged in
      }
    };
    checkAuth();
  }, [pathname]);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Émettre un événement personnalisé pour la recherche
    window.dispatchEvent(new CustomEvent('searchRules', { detail: query }));
    
    // Rechercher dans les règles
    if (query.length > 0) {
      const results: Array<{ category: string; categoryTitle: string; rule: string; icon: any; sectionIndex: number }> = [];
      
      Object.entries(rulesData).forEach(([category, data]) => {
        data.rules.forEach((rule, ruleIndex) => {
          if (rule.toLowerCase().includes(query.toLowerCase())) {
            // Trouver l'index de la section dans la catégorie
            // Pour simplifier, on utilise 0 (première section de la catégorie)
            // car les règles sont regroupées par section
            results.push({
              category,
              categoryTitle: data.title,
              rule,
              icon: data.icon,
              sectionIndex: 0, // On ouvre toujours la première section de la catégorie
            });
          }
        });
      });
      
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const scrollToRules = () => {
    const rulesSection = document.getElementById('rules-section');
    if (rulesSection) {
      rulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResultClick = (category: string, sectionIndex: number) => {
    // Émettre un événement pour changer la catégorie active et ouvrir la section
    window.dispatchEvent(new CustomEvent('changeCategory', { 
      detail: { category, openSection: sectionIndex } 
    }));
    scrollToRules();
    setShowDropdown(false);
    setSearchQuery('');
    window.dispatchEvent(new CustomEvent('searchRules', { detail: '' }));
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
          {/* Barre de recherche avec dropdown - Visible uniquement sur /reglement */}
          {isReglementPage && (
          <div ref={searchRef} className="relative hidden md:block">
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
                  setShowDropdown(false);
                  window.dispatchEvent(new CustomEvent('searchRules', { detail: '' }));
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}

            {/* Menu déroulant des résultats */}
            {showDropdown && searchResults.length > 0 && (
              <div
                className="absolute top-full mt-2 left-0 w-[500px] max-h-[400px] overflow-y-auto bg-dark-card border border-white/20 shadow-2xl"
                style={{ borderRadius: '2px', zIndex: 1000 }}
              >
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider border-b border-white/10">
                    {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                  </div>
                  {searchResults.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.category, result.sectionIndex)}
                        className="w-full text-left p-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 group"
                      >
                        <div className="flex items-start gap-3">
                          <Icon size={16} className="text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">
                              {result.categoryTitle}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 group-hover:text-white transition-colors">
                              {result.rule}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          )}

          <Link href="/reglement">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Règlement
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Contact
            </motion.button>
          </Link>

          {/* Afficher Login/Register ou Profile selon l'état de connexion */}
          {isLoggedIn ? (
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium"
              >
                <User size={18} />
                {username}
              </motion.button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Connexion
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 font-semibold transition-all border border-primary/50"
                  style={{ borderRadius: '2px' }}
                >
                  S'inscrire
                </motion.button>
              </Link>
            </>
          )}

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


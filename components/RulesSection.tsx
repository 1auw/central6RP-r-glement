'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Users, Ban, Car, MessageSquare, Shirt, Coins, UserPlus, Skull } from 'lucide-react';

interface RuleCategory {
  id: string;
  title: string;
  icon: any;
}

interface RuleSection {
  title: string;
  icon: any;
  rules: string[];
  alerts?: { type: 'warning' | 'danger' | 'info'; text: string }[];
}

const categories: RuleCategory[] = [
  { id: 'general', title: 'Général', icon: Shield },
  { id: 'event', title: 'Event', icon: Users },
  { id: 'staff', title: 'Staff', icon: MessageSquare },
  { id: 'legal', title: 'Légal', icon: Car },
  { id: 'illegal', title: 'Illégal', icon: Skull },
  { id: 'cheat', title: 'Cheat & Modding', icon: Ban },
];

const rulesContent: Record<string, RuleSection[]> = {
  general: [
    {
      title: 'Règles générales',
      icon: Shield,
      rules: [
        'Le respect est la base de notre communauté. Tout comportement toxique, insulte ou discrimination sera sanctionné immédiatement.',
        'Le métagaming est formellement interdit. Les informations obtenues en dehors du jeu ne doivent pas influencer vos actions en RP.',
        'Le RolePlay doit toujours être privilégié. Chaque action doit avoir une logique et une cohérence.',
        'Les noms de personnages doivent être réalistes et cohérents avec l\'univers RP.',
      ],
    },
    {
      title: 'Vêtements & Équipement',
      icon: Shirt,
      rules: [
        'Tous les vêtements et casques considérés comme des "tank" sont interdits.',
        'Si vous jouez en équipe, vous devez porter les mêmes vêtements.',
      ],
      alerts: [
        { type: 'warning', text: 'L\'usage abusif de vêtements tank entraînera des sanctions.' },
      ],
    },
  ],
  event: [
    {
      title: 'Événements',
      icon: Users,
      rules: [
        'Les événements sont organisés régulièrement par le staff.',
        'Tous les joueurs peuvent y participer sauf mention contraire.',
        'Les règles spécifiques de chaque événement seront annoncées avant le début.',
        'Le fair-play est de rigueur pendant les événements.',
      ],
    },
  ],
  staff: [
    {
      title: 'Comportement envers les staffs',
      icon: MessageSquare,
      rules: [
        'Le respect envers les membres du staff est obligatoire en toutes circonstances.',
        'Les décisions du staff sont définitives. En cas de désaccord, ouvrez un ticket Discord.',
        'Ne sollicitez pas les staffs en jeu pour des questions administratives, utilisez Discord.',
        'Les insultes ou menaces envers un membre du staff entraînent un bannissement immédiat.',
      ],
      alerts: [
        { type: 'danger', text: 'Tout manque de respect envers le staff sera sanctionné sévèrement.' },
      ],
    },
  ],
  legal: [
    {
      title: 'Activités légales',
      icon: Car,
      rules: [
        'Les métiers légaux doivent être exercés avec sérieux et cohérence RP.',
        'Le respect du code de la route est obligatoire pour les activités légales.',
        'Les interactions avec la police doivent être roleplayées correctement.',
        'Les commerces et entreprises doivent respecter les prix du marché.',
      ],
    },
  ],
  illegal: [
    {
      title: 'Activités illégales',
      icon: Skull,
      rules: [
        'Les activités illégales doivent être jouées avec prudence et réalisme.',
        'Les braquages nécessitent un RP de qualité et respectent un cooldown.',
        'Les fusillades doivent avoir une raison RP valable et être précédées d\'interactions.',
        'Un criminel ne s\'affiche pas en public et prend des précautions.',
      ],
      alerts: [
        { type: 'warning', text: 'Les actions illégales sans RP seront sanctionnées.' },
        { type: 'danger', text: 'Le RDM (Random Death Match) est strictement interdit.' },
      ],
    },
    {
      title: 'Loot',
      icon: Coins,
      rules: [
        'Vous pouvez looter les armes, munitions et argent sale d\'un joueur mort.',
        'Maximum 5.000$ d\'argent propre peuvent être volés.',
        'Il est interdit de looter les gilets, bandages et soins.',
      ],
    },
  ],
  cheat: [
    {
      title: 'Cheat & Modding',
      icon: Ban,
      rules: [
        'Tout usage de logiciel tiers, cheat ou mod menu est strictement interdit.',
        'Les mods graphiques qui donnent un avantage sont interdits.',
        'L\'exploitation de bugs est sanctionnable.',
        'Toute tentative de triche entraîne un bannissement permanent.',
      ],
      alerts: [
        { type: 'danger', text: 'Le bannissement pour triche est permanent et sans appel.' },
      ],
    },
  ],
};

export default function RulesSection() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleSearch = (e: any) => {
      setSearchQuery(e.detail.toLowerCase());
    };

    window.addEventListener('searchRules', handleSearch);
    return () => window.removeEventListener('searchRules', handleSearch);
  }, []);

  // Filtrer le contenu en fonction de la recherche
  const getFilteredContent = () => {
    if (!searchQuery) {
      return rulesContent[activeCategory] || [];
    }

    // Rechercher dans toutes les catégories
    const allSections: RuleSection[] = [];
    Object.values(rulesContent).forEach(sections => {
      sections.forEach(section => {
        const matchTitle = section.title.toLowerCase().includes(searchQuery);
        const matchRules = section.rules.some(rule => 
          rule.toLowerCase().includes(searchQuery)
        );
        const matchAlerts = section.alerts?.some(alert => 
          alert.text.toLowerCase().includes(searchQuery)
        );

        if (matchTitle || matchRules || matchAlerts) {
          allSections.push(section);
        }
      });
    });

    return allSections;
  };

  const filteredContent = getFilteredContent();

  return (
    <section id="rules" className="relative bg-dark-bg">
      {/* Tabs Navigation - Full Width après Hero */}
      <div className="relative w-full bg-black/90 border-b border-white/10 py-6">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 font-medium text-sm transition-all
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-transparent text-gray-400 hover:text-white'
                    }
                  `}
                  style={{ borderRadius: '2px' }}
                >
                  <Icon size={18} />
                  <span>{category.title}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Background avec traits blancs en diagonale */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.1) 50px,
            rgba(255,255,255,0.1) 52px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.05) 50px,
            rgba(255,255,255,0.05) 52px
          )
        `
      }} />
      
      <div className="container mx-auto max-w-7xl relative z-10 py-24 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary-light to-primary-neon bg-clip-text text-transparent">
              Règlement
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Consultez les règles essentielles pour profiter pleinement de l'expérience Central 6RP
          </p>
        </motion.div>

        {/* Search Results Info */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-400">
              {filteredContent.length > 0 ? (
                <>Résultats pour "<span className="text-primary font-semibold">{searchQuery}</span>" : {filteredContent.length} section(s) trouvée(s)</>
              ) : (
                <>Aucun résultat pour "<span className="text-primary font-semibold">{searchQuery}</span>"</>
              )}
            </p>
          </motion.div>
        )}

        {/* Rules Content */}
        <motion.div
          key={searchQuery ? 'search' : activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {filteredContent.length > 0 ? filteredContent.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-dark-card p-8 border-l-4 border-primary hover:border-primary transition-all relative overflow-hidden"
                style={{ borderRadius: '2px' }}
              >
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-3 bg-primary/20" style={{ borderRadius: '2px' }}>
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>

                {/* Rules List */}
                <div className="space-y-4 mb-4 relative z-10">
                  {section.rules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-primary flex-shrink-0" style={{ borderRadius: '1px' }} />
                      <p className="text-gray-300 leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>

                {/* Alerts */}
                {section.alerts && (
                  <div className="space-y-3 mt-6 relative z-10">
                    {section.alerts.map((alert, i) => (
                      <div
                        key={i}
                        className={`
                          p-4 border-l-4 bg-black/30
                          ${alert.type === 'danger' ? 'border-red-500' : ''}
                          ${alert.type === 'warning' ? 'border-yellow-500' : ''}
                          ${alert.type === 'info' ? 'border-blue-500' : ''}
                        `}
                        style={{ borderRadius: '2px' }}
                      >
                        <p className={`
                          font-medium text-sm
                          ${alert.type === 'danger' ? 'text-red-300' : ''}
                          ${alert.type === 'warning' ? 'text-yellow-300' : ''}
                          ${alert.type === 'info' ? 'text-blue-300' : ''}
                        `}>
                          {alert.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          }) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune règle ne correspond à votre recherche.</p>
            </div>
          )}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="glass p-6 inline-block border border-primary/30" style={{ borderRadius: '2px' }}>
            <p className="text-gray-400">
              <span className="text-primary font-bold">ATTENTION :</span> Le non-respect de ces règles peut entraîner des sanctions allant de l'avertissement au bannissement permanent
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

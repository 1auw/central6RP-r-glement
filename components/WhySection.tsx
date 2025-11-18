'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Users, Shield, Zap, Wrench, Gem } from 'lucide-react';

const features = [
  {
    icon: Gamepad2,
    title: 'Gameplay Immersif',
    description: 'Profitez d\'un système de jeu complet avec de nombreux métiers, activités légales et illégales pour une immersion totale dans l\'univers GTA RP.',
  },
  {
    icon: Users,
    title: 'Communauté Active',
    description: 'Rejoignez une communauté soudée et bienveillante, toujours prête à accueillir de nouveaux joueurs dans une ambiance conviviale.',
  },
  {
    icon: Shield,
    title: 'Staff Compétent',
    description: 'Une équipe de modération active et à l\'écoute pour garantir le respect des règles et maintenir une ambiance saine sur le serveur.',
  },
  {
    icon: Zap,
    title: 'Performances Optimales',
    description: 'Serveur performant avec une infrastructure de qualité pour une expérience de jeu fluide et sans lag, disponible 24/7.',
  },
  {
    icon: Wrench,
    title: 'Mises à jour Régulières',
    description: 'Nouveaux contenus, corrections et améliorations ajoutés régulièrement pour renouveler l\'expérience et garder le serveur frais.',
  },
  {
    icon: Gem,
    title: 'Économie Équilibrée',
    description: 'Système économique réfléchi et équilibré permettant à chacun de progresser à son rythme et de profiter du jeu.',
  },
];

export default function WhySection() {
  return (
    <section className="relative py-20 px-6 bg-dark-bg">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            Pourquoi Central6RP ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-lighter/80 backdrop-blur-sm border border-white/10 p-8 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary transition-all">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


'use client';

import { motion } from 'framer-motion';
import { Gift, Trophy, Snowflake } from 'lucide-react';
import Link from 'next/link';

const events = [
  {
    icon: Gift,
    title: 'Cadeaux Quotidiens',
    description: 'Connexion récompensée',
  },
  {
    icon: Trophy,
    title: 'Tournois Spéciaux',
    description: 'Compétitions exclusives',
  },
  {
    icon: Snowflake,
    title: 'Map Enneigée',
    description: 'Ambiance hivernale',
  },
];

export default function EventsSection() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-dark-bg to-dark-lighter">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Snowflake size={40} className="text-primary" />
            <h2 className="text-4xl md:text-5xl font-black text-primary">
              Événements d'Hiver
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Décembre 2025</h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Profitez d'événements exclusifs, récompenses spéciales et nouvelles activités pendant tout le mois de décembre !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-card/80 backdrop-blur-sm border border-primary/30 p-8 hover:border-primary transition-all duration-300"
              >
                <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Icon size={48} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-400">{event.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/evenements">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-light text-white px-8 py-4 font-bold text-lg transition-all"
              style={{ borderRadius: '2px' }}
            >
              DÉCOUVRIR LES ÉVÉNEMENTS
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


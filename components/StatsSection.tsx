'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Zap, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
// Plus besoin d'importer getApiUrl, on utilise /api/stats directement

export default function StatsSection() {
  const [stats, setStats] = useState({
    players_online: 0,
    total_users: 1,
    server_status: '24/7',
    shop_items: 5,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les stats depuis l'API Next.js (pas de CORS nécessaire)
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats', {
          credentials: 'include',
        });
        const data = await response.json();
        
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Actualiser toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsDisplay = [
    {
      icon: Users,
      value: loading ? '...' : stats.players_online,
      label: 'JOUEURS EN LIGNE',
    },
    {
      icon: Shield,
      value: loading ? '...' : `${stats.total_users}+`,
      label: 'MEMBRES INSCRITS',
    },
    {
      icon: Zap,
      value: stats.server_status,
      label: 'SERVEUR DISPONIBLE',
    },
    {
      icon: ShoppingBag,
      value: `${stats.shop_items}+`,
      label: 'ARTICLES BOUTIQUE',
    },
  ];

  return (
    <section className="relative py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {statsDisplay.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-lighter/80 backdrop-blur-sm border border-white/10 p-8 text-center hover:border-primary/50 transition-all duration-300"
              >
                <Icon size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-4xl font-black text-primary mb-2">{stat.value}</h3>
                <p className="text-gray-400 text-sm font-semibold tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


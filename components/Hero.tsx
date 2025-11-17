'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Wifi } from 'lucide-react';
import { useRef } from 'react';
import { siteConfig } from '@/config/site';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Vidéo FiveM en background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%230a0a0f'/%3E%3C/svg%3E"
        >
          <source src={siteConfig.video.src} type="video/mp4" />
        </video>
        
        {/* Fallback si pas de vidéo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-dark-bg to-primary-neon/20" style={{ zIndex: -1 }} />
        
        {/* Overlay sombre + dégradé bleu */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-dark-bg" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-neon/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="glass px-6 py-2 border-2 border-primary/50" style={{ borderRadius: '4px' }}>
              <span className="text-primary-neon font-semibold">Serveur FiveM</span>
            </div>
          </motion.div>

          {/* Titre principal */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
            <span className="bg-gradient-to-r from-white via-primary-light to-primary-neon bg-clip-text text-transparent">
              Central 6RP
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-light text-gray-300">
            Règlement Officiel
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Serveur RolePlay Français
          </p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            {/* Bouton Discord */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary hover:bg-primary-light text-white px-8 py-4 font-bold text-lg transition-all glow-primary shadow-2xl border-2 border-primary-neon"
              style={{ borderRadius: '4px' }}
            >
              <MessageCircle size={24} />
              Rejoindre Discord
            </motion.a>

            {/* Bouton FiveM Connect */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.links.fivem}
              className="flex items-center gap-3 glass hover:bg-white/10 text-white px-8 py-4 font-bold text-lg transition-all border-2 border-primary/50 hover:border-primary shadow-2xl"
              style={{ borderRadius: '4px' }}
            >
              <Wifi size={24} className="text-primary-neon" />
              Se connecter
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 flex items-start justify-center p-2"
            style={{ borderRadius: '12px' }}
          >
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary"
              style={{ borderRadius: '2px' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}


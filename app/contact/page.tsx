'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-bg to-primary-neon/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-neon/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Retour */}
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
              Retour à l'accueil
            </Link>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl font-black"
          >
            <span className="bg-gradient-to-r from-white via-primary-light to-primary-neon bg-clip-text text-transparent">
              Besoin d'aide ?
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            Pour toute question ou demande concernant le serveur, 
            notre règlement ou votre compte, contactez-nous directement 
            via notre serveur Discord officiel.
          </motion.p>

          {/* Card info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass p-8 border-2 border-white/10"
            style={{ borderRadius: '4px' }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 bg-primary/20" style={{ borderRadius: '4px' }}>
                  <MessageCircle size={32} className="text-primary-neon" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">Discord</h3>
                  <p className="text-gray-400">Notre serveur communautaire</p>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="space-y-3 text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Support technique disponible 24/7
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Questions sur le règlement
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Candidatures whitelist
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Rapports de bugs
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bouton Discord */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-light text-white px-10 py-5 font-bold text-xl transition-all glow-primary shadow-2xl border-2 border-primary-neon"
              style={{ borderRadius: '4px' }}
            >
              <MessageCircle size={28} />
              Rejoindre Discord
            </motion.a>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm text-gray-500 pt-4"
          >
            Notre équipe vous répondra dans les plus brefs délais
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}


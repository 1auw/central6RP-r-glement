'use client';

import { motion } from 'framer-motion';
import { Rocket, MessageCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function CTASection() {
  return (
    <section className="relative py-20 px-6 bg-primary">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket size={48} className="text-white" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Prêt à commencer l'aventure ?
            </h2>
          </div>
          
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Créez votre compte maintenant et plongez dans l'univers de Central6RP !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white text-primary hover:bg-gray-100 px-8 py-4 font-bold text-lg transition-all w-full sm:w-auto justify-center"
                style={{ borderRadius: '2px' }}
              >
                <UserPlus size={24} />
                CRÉER UN COMPTE
              </motion.button>
            </Link>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 font-bold text-lg transition-all w-full sm:w-auto justify-center"
              style={{ borderRadius: '2px' }}
            >
              <MessageCircle size={24} />
              REJOINDRE DISCORD
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


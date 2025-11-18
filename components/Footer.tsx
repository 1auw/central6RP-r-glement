'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Twitter, Youtube, Twitch, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(siteConfig.links.fivem.replace('fivem://connect/', ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-dark-card border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <Link href="/">
              <h3 className="text-2xl font-black mb-4">
                Central<span className="text-primary">6</span>RP
              </h3>
            </Link>
            <p className="text-gray-400 mb-4">
              Le meilleur serveur GTA Roleplay francophone. Rejoignez notre communauté et vivez des expériences uniques !
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-lighter border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <MessageCircle size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-dark-lighter border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Twitter size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-dark-lighter border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Youtube size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-dark-lighter border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Twitch size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/reglement" className="text-gray-400 hover:text-primary transition-colors">
                  Règlement
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-gray-400 hover:text-primary transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-400 hover:text-primary transition-colors">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Informations</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-gray-400 hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-gray-400 hover:text-primary transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Rejoignez-nous */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Rejoignez-nous</h4>
            <p className="text-gray-400 mb-4">
              Connectez-vous dès maintenant sur notre serveur FiveM !
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyIP}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2 font-semibold transition-all w-full justify-center"
              style={{ borderRadius: '2px' }}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  IP COPIÉE
                </>
              ) : (
                <>
                  <Copy size={18} />
                  COPIER L'IP
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            Fait avec <span className="text-primary">♥</span> pour Central6RP<br />
            © 2025 Central6RP - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}


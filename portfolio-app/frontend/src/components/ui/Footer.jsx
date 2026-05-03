import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-white/5 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-display text-white text-sm">CA</span>
              </div>
              <span className="font-heading font-bold text-white">Cyril Ayisu</span>
            </div>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Cyril Ayisu. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-white/30 text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-primary fill-primary mx-0.5" />
            <span>using React & Node.js</span>
          </div>

          {/* Social & Scroll to top */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/cyrilayisu' },
              { icon: Linkedin, href: 'https://linkedin.com/in/cyrilayisu' },
              { icon: Twitter, href: 'https://twitter.com/cyrilayisu' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-colors"
              >
                <social.icon size={16} />
              </motion.a>
            ))}

            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors ml-2"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Twitter, Download, Eye, Mail } from 'lucide-react';

const HeroSection = () => {
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      {/* Floating geometric elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-primary/20 rounded-full animate-spin-slow opacity-40" />
      <div className="absolute top-40 right-32 w-10 h-10 border border-primary/30 rotate-45 animate-pulse-slow opacity-30" />
      <div className="absolute bottom-32 left-10 w-16 h-16 border border-primary/20 rounded-full animate-float opacity-40" />
      <div className="absolute bottom-20 left-32 w-8 h-8 bg-primary/20 rounded-full animate-pulse-slow opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-medium font-mono">Available for work</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-2 tracking-wide"
            >
              CYRIL
              <span className="text-primary">.</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-6 tracking-wide"
            >
              AYISU<span className="text-primary">.</span>
            </motion.h1>

            {/* Type Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg sm:text-xl font-heading font-medium text-primary mb-4 min-h-[32px]"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer', 2000,
                  'Creative Web Designer', 2000,
                  'React Specialist', 2000,
                  'Node.js Developer', 2000,
                  'Graphic Designer', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Building scalable digital experiences with creativity and precision.
              Turning ideas into elegant, high-performance web solutions.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex gap-8 mb-10"
            >
              {[
                { value: '5+', label: 'Projects' },
                { value: '3+', label: 'Clients' },
                { value: '2+', label: 'Years Exp.' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-heading text-primary">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll('projects')}
                className="btn-primary flex items-center gap-2"
              >
                <Eye size={18} />
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll('contact')}
                className="btn-outline flex items-center gap-2"
              >
                <Mail size={18} />
                Hire Me
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/Ayisu_Cyril_CV.pdf" 
                download
                className="btn-ghost flex items-center gap-2 border border-white/10"
              >
                <Download size={18} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex gap-4"
            >
              {[
                { icon: Github, href: 'https://github.com/ayisucyril/BS-Solution', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
                /* { icon: Twitter, href: 'https://twitter.com/cyrilayisu', label: 'Twitter' },*/
              ].map(social => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-primary/20"
              />

              {/* Inner decorative ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-primary/10"
              />

              {/* Profile image container */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full relative overflow-hidden m-4 sm:m-8">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 via-dark-100 to-dark-400 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                  {/* Fallback avatar */}
                  <img
                    src="/profile.jpg"
                    alt="Cyril Ayisu"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 -right-4 glass-card-orange px-3 py-2 rounded-xl"
              >
                <div className="text-xs text-white/60">Experience</div>
                <div className="text-primary font-bold font-heading">2+ Years</div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-4 -left-8 glass-card-orange px-3 py-2 rounded-xl"
              >
                <div className="text-xs text-white/60">Projects Done</div>
                <div className="text-primary font-bold font-heading">5+</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={18} className="text-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

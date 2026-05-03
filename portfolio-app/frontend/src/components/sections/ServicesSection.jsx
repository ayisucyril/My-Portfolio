import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code2, Palette, Server, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Crafting visually stunning, user-friendly websites that make lasting first impressions. Pixel-perfect designs that convert.',
    features: ['UI/UX Design', 'Responsive Design', 'Prototyping', 'Design Systems'],
    gradient: 'from-orange-500/20 to-amber-500/10'
  },
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'End-to-end web application development from database architecture to polished front-end interfaces.',
    features: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
    gradient: 'from-blue-500/20 to-cyan-500/10'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Human-centered design that creates intuitive, delightful experiences users love to interact with.',
    features: ['Figma Design', 'User Research', 'Wireframing', 'Usability Testing'],
    gradient: 'from-purple-500/20 to-pink-500/10'
  },
  {
    icon: Server,
    title: 'API Development',
    description: 'Robust, scalable API solutions that power your applications with reliability and performance.',
    features: ['RESTful APIs', 'Authentication', 'Database Design', 'Documentation'],
    gradient: 'from-green-500/20 to-emerald-500/10'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Supercharging existing applications with speed optimizations, caching, and best practices.',
    features: ['Core Web Vitals', 'Code Splitting', 'Lazy Loading', 'SEO'],
    gradient: 'from-yellow-500/20 to-orange-500/10'
  },
  {
    icon: Shield,
    title: 'Technical Consulting',
    description: 'Expert guidance on architecture, tech stack selection, and scaling strategies for your projects.',
    features: ['Architecture Review', 'Code Audit', 'Tech Strategy', 'Mentoring'],
    gradient: 'from-red-500/20 to-rose-500/10'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-primary text-sm tracking-widest uppercase"
          >
            04. Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            What I <span className="gradient-text">Offer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 max-w-xl mx-auto"
          >
            Comprehensive digital solutions tailored to your unique needs and goals.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="glass-card p-6 group cursor-default transition-all duration-300 hover:border-primary/30 hover:shadow-orange"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon size={26} className="text-primary" />
              </div>

              <h3 className="font-heading font-bold text-white text-lg mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

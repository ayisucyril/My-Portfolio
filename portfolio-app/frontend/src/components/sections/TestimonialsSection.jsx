import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Moses Xenyo',
    role: 'Branch Manager, GIFEC GH',
    avatar: 'KM',
    rating: 5,
    text: 'Cyril delivered our platform ahead of schedule and exceeded every expectation. The code quality is exceptional and the attention to detail in the UI is remarkable. Highly recommended!'
  },
  {
    name: 'Abena Osei',
    role: 'Product Manager, FinTech Africa',
    avatar: 'AO',
    rating: 5,
    text: 'Working with Cyril was an absolute pleasure. He understood our vision immediately, asked the right questions, and built exactly what we needed. The end product is beautiful and performs flawlessly.'
  },
  {
    name: 'Prof. Ayima John C., PhD',
    role: 'Head of CS Dept., HTU',
    avatar: 'AJ',
    rating: 5,
    text: 'As Cyril\'s professor, I\'ve watched him grow into an exceptional developer. His technical skills are matched only by his professionalism and leadership. A true asset to any team.'
  },
  {
    name: 'Sarah Mitchell',
    role: 'Founder, EduTech Solutions',
    avatar: 'SM',
    rating: 5,
    text: 'Cyril built our entire e-learning platform from scratch. His full-stack expertise and design sensibility produced something we\'re incredibly proud of. The students love it!'
  },
  {
    name: 'Emmanuel Yeboah',
    role: 'CTO, AgriDigital',
    avatar: 'EY',
    rating: 5,
    text: 'We hired Cyril for an API integration project and were blown away by the code quality and documentation. He takes security seriously and delivers clean, maintainable code.'
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [auto]);

  const prev = () => { setCurrent(c => (c - 1 + testimonials.length) % testimonials.length); setAuto(false); };
  const next = () => { setCurrent(c => (c + 1) % testimonials.length); setAuto(false); };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-primary text-sm tracking-widest uppercase"
          >
            06. Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            What Clients <span className="gradient-text">Say</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div className="relative glass-card p-8 md:p-12 mb-8">
            <Quote size={48} className="text-primary/20 absolute top-6 left-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex mb-4">
                  {Array(testimonials[current].rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="text-primary fill-primary" />
                  ))}
                </div>

                <p className="text-white/80 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                    <span className="font-bold text-primary">{testimonials[current].avatar}</span>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-white">{testimonials[current].name}</div>
                    <div className="text-white/40 text-sm">{testimonials[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAuto(false); }}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-primary' : 'w-1.5 bg-white/20'}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-primary/50 transition-all"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-primary/50 transition-all"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

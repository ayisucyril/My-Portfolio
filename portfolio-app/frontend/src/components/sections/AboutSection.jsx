import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, MapPin, Mail, Calendar, Award, Code2, Palette } from 'lucide-react';

const timelineItems = [
  {
    year: '2025/2026',
    title: 'COMPSSA President',
    subtitle: 'Computer Science Students Association',
    description: 'Leading a community of 2000+ CS students, organizing tech events, hackathons, and workshops.',
    icon: Award,
    color: 'primary'
  },
  {
    year: '2024',
    title: 'Full Stack Developer',
    subtitle: 'Freelance & Contract Work',
    description: 'Delivered 15+ production web applications for clients across various industries.',
    icon: Code2,
    color: 'primary'
  },
  {
    year: '2023',
    title: 'UI/UX Design Journey',
    subtitle: 'Self-directed Learning',
    description: 'Mastered design principles, Figma, and user-centered design thinking.',
    icon: Palette,
    color: 'primary'
  },
  {
    year: '2023',
    title: 'Started Coding',
    subtitle: 'Computer Science Student',
    description: 'Began the journey into software development with HTML, CSS, and JavaScript.',
    icon: Code2,
    color: 'primary'
  }
];

const SectionWrapper = ({ children, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} id={id}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <SectionWrapper id="about">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-primary text-sm tracking-widest uppercase"
            >
              01. About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mt-2"
            >
              The <span className="gradient-text">Story</span> Behind the Code
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Bio */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 mb-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <User size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Cyril Ayisu</h3>
                    <p className="text-primary text-sm">Full Stack Developer</p>
                  </div>
                </div>

                <div className="space-y-3 text-white/70 leading-relaxed">
                  <p>
                    I'm a passionate full-stack developer and creative web designer based in Ghana, West Africa.
                    With over 2 years of hands-on experience, I specialize in building modern, scalable web
                    applications that blend technical excellence with beautiful design.
                  </p>
                  <p>
                    As the President of COMPSSA (Computer Science Students Association), I lead and inspire
                    a community of over 2000+ aspiring developers, organizing hackathons, workshops, and
                    mentorship programs that shape the next generation of tech talent.
                  </p>
                  <p>
                    My philosophy: <span className="text-primary font-semibold">code with purpose, design with empathy</span>.
                    Every line I write and every pixel I place serves a real human need.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: MapPin, text: 'Ghana, West Africa' },
                    { icon: Mail, text: 'ayisucyril@email.com' },
                    { icon: Calendar, text: 'Available Immediately' },
                    { icon: Award, text: 'COMPSSA President' },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-2 text-sm">
                      <item.icon size={15} className="text-primary flex-shrink-0" />
                      <span className="text-white/60">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { value: '5+', label: 'Projects' },
                  { value: '3+', label: 'Clients' },
                  { value: '2+', label: 'Years' },
                  { value: '3+', label: 'Certificates' },
                ].map(stat => (
                  <div key={stat.label} className="glass-card p-4 text-center hover-card">
                    <div className="text-2xl font-bold font-heading text-primary">{stat.value}</div>
                    <div className="text-white/50 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Timeline */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-heading font-bold text-xl text-white mb-8"
              >
                Career Journey
              </motion.h3>

              <div className="relative pl-8 border-l border-white/10">
                {timelineItems.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative mb-8 last:mb-0 timeline-item"
                  >
                    <div className="glass-card p-5 hover-card">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-primary">{item.year}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-xs text-white/50">{item.subtitle}</span>
                          </div>
                          <h4 className="font-heading font-semibold text-white mb-1">{item.title}</h4>
                          <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default AboutSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    type: 'leadership',
    icon: Trophy,
    title: 'COMPSSA President',
    organization: 'Computer Science Students Association',
    period: '2023/2024 – Present',
    description: 'Leading 2000+ IT students. Organized 10+ tech events, 3 hackathons, and multiple mentorship sessions.',
    highlights: ['2000+ Members Led', '10+ Events Organized', '3 Hackathons'],
    color: 'orange'
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'Freelance Full Stack Developer',
    organization: 'Self-Employed',
    period: '2024 – Present',
    description: 'Delivered production-grade web applications for clients in e-commerce, education, and fintech sectors.',
    highlights: ['5+ Projects Delivered', '20+ Satisfied Clients', '98% Client Retention'],
    color: 'blue'
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'BTech Information and Communication Technology',
    organization: 'Ho Technical University',
    period: '2023/2024 – Present',
    description: 'Studying cInformation and Communication Technology with focus on software engineering, algorithms, and distributed systems.',
    highlights: ['First Class Honors', 'Dean\'s List', 'Research Published'],
    color: 'green'
  }
];

const certifications = [
  { name: 'Meta Front-End Developer', issuer: 'Meta / Coursera', year: '2023' },
  { name: 'Node.js Developer', issuer: 'OpenJS Foundation', year: '2023' },
  { name: 'MongoDB Developer', issuer: 'MongoDB University', year: '2023' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Google UX Design', issuer: 'Google / Coursera', year: '2022' },
  { name: 'React – Complete Guide', issuer: 'Udemy', year: '2022' },
  { name: 'CS50 Web Programming', issuer: 'Harvard / edX', year: '2022' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2021' },
];

const colorMap = {
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  green: 'bg-green-500/15 text-green-400 border-green-500/20'
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-primary text-sm tracking-widest uppercase"
          >
            05. Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            Leadership & <span className="gradient-text">Achievements</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <div>
            <h3 className="font-heading font-bold text-white mb-8 flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Experience & Leadership
            </h3>
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 hover-card group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorMap[exp.color]}`}>
                      <exp.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-heading font-semibold text-white group-hover:text-primary transition-colors">
                          {exp.title}
                        </h4>
                        <span className="text-xs font-mono text-primary/70 flex-shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-white/40 text-sm mb-3">{exp.organization}</p>
                      <p className="text-white/60 text-sm leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map(h => (
                          <span key={h} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-heading font-bold text-white mb-8 flex items-center gap-2">
              <Award size={20} className="text-primary" /> Certifications
            </h3>
            <div className="grid gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card p-4 flex items-center gap-4 hover-card group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                    <Star size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm group-hover:text-primary transition-colors truncate">{cert.name}</div>
                    <div className="text-white/40 text-xs">{cert.issuer}</div>
                  </div>
                  <span className="font-mono text-xs text-primary/60">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

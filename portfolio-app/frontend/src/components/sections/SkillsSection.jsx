import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 92, icon: '🎨' },
      { name: 'JavaScript', level: 90, icon: '⚡' },
      { name: 'React.js', level: 88, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 90, icon: '💨' },
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85, icon: '🟩' },
      { name: 'Express.js', level: 83, icon: '🚀' },
    ]
  },
  {
    category: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 82, icon: '🍃' },
      { name: 'PostgreSQL', level: 75, icon: '🐘' },
    ]
  },
  {
    category: 'Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 88, icon: '📋' },
      { name: 'GitHub', level: 90, icon: '🐙' },
      { name: 'Figma', level: 85, icon: '✏️' },
    ]
  }
];

const SkillBar = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="group"
  >
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <span className="text-base">{skill.icon}</span>
        <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{skill.name}</span>
      </div>
      <span className="text-primary text-sm font-mono">{skill.level}%</span>
    </div>
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full relative"
      >
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 blur-sm" />
      </motion.div>
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-primary text-sm tracking-widest uppercase"
          >
            02. Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            Technical <span className="gradient-text">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 max-w-xl mx-auto"
          >
            A comprehensive set of skills refined through real-world projects and continuous learning.
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass-card p-6 hover-card group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-xl group-hover:bg-primary/25 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-heading font-semibold text-white">{cat.category}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'Figma', 'REST API', 'JWT', 'PostgreSQL', 'GitHub'].map(tech => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,0,0.5)' }}
              className="skill-badge cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

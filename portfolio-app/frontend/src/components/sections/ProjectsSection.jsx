import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Layers } from 'lucide-react';
import { projectsApi } from '../../utils/api';

const categories = ['all', 'fullstack', 'frontend', 'backend', 'design'];

const defaultProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    image: '',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
    category: 'fullstack',
    githubLink: '#', 
    liveLink: '#',
    featured: true
  },
  {
    _id: '2',
    title: 'Portfolio CMS',
    description: 'A headless CMS for managing portfolio content with drag-and-drop interface and real-time preview.',
    image: '',
    techStack: ['React', 'Express', 'PostgreSQL', 'REST API'],
    category: 'fullstack',
    githubLink: '#',
    liveLink: '#',
    featured: true
  },
  {
    _id: '3',
    title: 'Analytics Dashboard',
    description: 'Interactive data visualization dashboard with real-time charts, custom date ranges, and export features.',
    image: '',
    techStack: ['React', 'D3.js', 'Tailwind', 'WebSockets'],
    category: 'frontend',
    githubLink: '#',
    liveLink: '#'
  },
  {
    _id: '4',
    title: 'REST API Service',
    description: 'Scalable microservices API with authentication, rate limiting, caching, and comprehensive documentation.',
    image: '',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'JWT'],
    category: 'backend',
    githubLink: '#',
    liveLink: '#'
  },
  {
    _id: '5',
    title: 'Mobile App UI',
    description: 'Modern fintech mobile app UI design with seamless animations and intuitive user flows.',
    image: '',
    techStack: ['Figma', 'React Native', 'Expo'],
    category: 'design',
    githubLink: '#',
    liveLink: '#'
  },
  {
    _id: '6',
    title: 'School Management System',
    description: 'Comprehensive platform for managing students, teachers, grades, and communication.',
    image: '',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    category: 'fullstack',
    githubLink: '#',
    liveLink: '#'
  }
];

const categoryColors = {
  fullstack: 'from-orange-500/20 to-amber-500/10',
  frontend: 'from-blue-500/20 to-cyan-500/10',
  backend: 'from-green-500/20 to-emerald-500/10',
  design: 'from-purple-500/20 to-pink-500/10',
  mobile: 'from-rose-500/20 to-pink-500/10',
};

const ProjectCard = ({ project, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ delay: index * 0.05 }}
    className="glass-card overflow-hidden group hover-card"
  >
    {/* Project thumbnail */}
    <div className={`h-44 bg-gradient-to-br ${categoryColors[project.category] || categoryColors.fullstack} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 relative z-10">
          <Layers size={40} className="text-primary/60" />
          <span className="text-white/30 text-xs font-mono uppercase">{project.category}</span>
        </div>
      )}
      {project.featured && (
        <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          Featured
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(project.techStack || []).slice(0, 4).map(tech => (
          <span key={tech} className="text-xs bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md">
            {tech}
          </span>
        ))}
        {project.techStack?.length > 4 && (
          <span className="text-xs text-white/30 px-2 py-0.5">+{project.techStack.length - 4}</span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2">
        {project.githubLink && (
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm py-2 rounded-lg transition-all"
          >
            <Github size={14} />
            Code
          </motion.a>
        )}
        {project.liveLink && (
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-sm py-2 rounded-lg transition-all border border-primary/20"
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi.getAll()
      .then(res => {
        if (res.data.projects?.length > 0) setProjects(res.data.projects);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-primary text-sm tracking-widest uppercase"
          >
            03. Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 max-w-xl mx-auto"
          >
            A selection of my best work — each project built with purpose and attention to detail.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-orange'
                  : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Code2 size={48} className="mx-auto mb-4 opacity-30" />
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

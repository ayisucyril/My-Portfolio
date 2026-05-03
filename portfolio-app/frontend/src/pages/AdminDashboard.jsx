import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, MessageSquare, User, Settings,
  LogOut, Plus, Trash2, Edit2, Eye, EyeOff, Check, X, Menu,
  Mail, Code2, ChevronRight, BarChart3, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { projectsApi, messagesApi, profileApi } from '../utils/api';
import toast from 'react-hot-toast';

// Sidebar nav items
const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/admin/profile', icon: User, label: 'Profile' },
];

// ===== OVERVIEW =====
const Overview = ({ projects, messages }) => {
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'orange' },
    { label: 'Total Messages', value: messages.length, icon: MessageSquare, color: 'blue' },
    { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: Bell, color: 'red' },
    { label: 'Featured Projects', value: projects.filter(p => p.featured).length, icon: BarChart3, color: 'green' },
  ];

  const colorClass = { orange: 'text-orange-400 bg-orange-500/15', blue: 'text-blue-400 bg-blue-500/15', red: 'text-red-400 bg-red-500/15', green: 'text-green-400 bg-green-500/15' };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-white">Dashboard Overview</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass[stat.color]}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-white mb-1">{stat.value}</div>
            <div className="text-white/50 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent messages */}
      <div className="glass-card p-6">
        <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-primary" /> Recent Messages
        </h3>
        <div className="space-y-3">
          {messages.slice(0, 5).map(msg => (
            <div key={msg._id} className={`flex items-start gap-3 p-3 rounded-xl ${!msg.read ? 'bg-primary/5 border border-primary/10' : 'bg-white/3'}`}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary text-sm font-bold">
                {msg.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{msg.name}</span>
                  {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-white/40 text-xs truncate">{msg.subject}</p>
              </div>
              <span className="text-white/30 text-xs flex-shrink-0">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {messages.length === 0 && <p className="text-white/30 text-sm text-center py-4">No messages yet</p>}
        </div>
      </div>
    </div>
  );
};

// ===== PROJECTS MANAGER =====
const defaultForm = { title: '', description: '', longDescription: '', image: '', techStack: '', category: 'fullstack', githubLink: '', liveLink: '', featured: false, status: 'completed' };

const ProjectsManager = ({ projects, setProjects }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => { setForm(defaultForm); setEditingId(null); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ ...p, techStack: (p.techStack || []).join(', ') });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean) };
      if (editingId) {
        const res = await projectsApi.update(editingId, data);
        setProjects(ps => ps.map(p => p._id === editingId ? res.data.project : p));
        toast.success('Project updated');
      } else {
        const res = await projectsApi.create(data);
        setProjects(ps => [res.data.project, ...ps]);
        toast.success('Project created');
      }
      setShowForm(false);
    } catch {
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsApi.delete(id);
      setProjects(ps => ps.filter(p => p._id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-white">Projects</h2>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-semibold text-white">{editingId ? 'Edit' : 'New'} Project</h3>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" required placeholder="Project name" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  {['fullstack', 'frontend', 'backend', 'design', 'mobile', 'other'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-white/50 text-xs mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="input-field resize-none" required placeholder="Short description" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Tech Stack (comma separated)</label>
                <input value={form.techStack} onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))} className="input-field" placeholder="React, Node.js, MongoDB" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Image URL</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="input-field" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">GitHub Link</label>
                <input value={form.githubLink} onChange={e => setForm(f => ({ ...f, githubLink: e.target.value }))} className="input-field" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5">Live Link</label>
                <input value={form.liveLink} onChange={e => setForm(f => ({ ...f, liveLink: e.target.value }))} className="input-field" placeholder="https://..." />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-primary" />
                  <span className="text-white/60 text-sm">Featured project</span>
                </label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="input-field max-w-40">
                  {['completed', 'in-progress', 'archived'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 text-sm">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
                  {editingId ? 'Update' : 'Create'} Project
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost text-sm">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/40 text-xs font-medium">PROJECT</th>
                <th className="text-left p-4 text-white/40 text-xs font-medium hidden md:table-cell">CATEGORY</th>
                <th className="text-left p-4 text-white/40 text-xs font-medium hidden lg:table-cell">STATUS</th>
                <th className="text-left p-4 text-white/40 text-xs font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/3 hover:bg-white/3 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-white text-sm">{p.title}</div>
                    <div className="text-white/30 text-xs mt-0.5 truncate max-w-xs">{p.description}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full capitalize">{p.category}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      p.status === 'completed' ? 'bg-green-500/15 text-green-400' :
                      p.status === 'in-progress' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-white/10 text-white/40'
                    }`}>{p.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-white/5 hover:bg-primary/20 text-white/50 hover:text-primary transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-white/30">
                    <Code2 size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No projects yet. Add your first one!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ===== MESSAGES MANAGER =====
const MessagesManager = ({ messages, setMessages }) => {
  const [selected, setSelected] = useState(null);

  const markRead = async (id) => {
    try {
      await messagesApi.markRead(id);
      setMessages(ms => ms.map(m => m._id === id ? { ...m, read: true } : m));
    } catch {}
  };

  const deleteMsg = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await messagesApi.delete(id);
      setMessages(ms => ms.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const openMsg = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg._id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-white">Messages
        <span className="ml-2 text-sm font-normal text-primary">
          ({messages.filter(m => !m.read).length} unread)
        </span>
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-white/5">
            {messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openMsg(msg)}
                className={`p-4 cursor-pointer transition-colors hover:bg-white/5 ${selected?._id === msg._id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary text-sm font-bold">
                    {msg.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm font-medium ${!msg.read ? 'text-white' : 'text-white/60'}`}>{msg.name}</span>
                      <span className="text-white/30 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className={`text-xs truncate ${!msg.read ? 'text-white/70' : 'text-white/30'}`}>{msg.subject}</div>
                    {!msg.read && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />}
                  </div>
                </div>
              </motion.div>
            ))}
            {messages.length === 0 && (
              <div className="p-8 text-center text-white/30">
                <Mail size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="glass-card p-6">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading font-semibold text-white">{selected.subject}</h3>
                  <p className="text-white/40 text-sm">{selected.name} · {selected.email}</p>
                </div>
                <button onClick={() => deleteMsg(selected._id)} className="text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="bg-white/3 rounded-xl p-4 text-white/70 text-sm leading-relaxed">
                {selected.message}
              </div>
              <div className="flex gap-2 mt-4">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary text-sm flex items-center gap-1.5 py-2">
                  <Mail size={14} /> Reply
                </a>
                <button onClick={() => deleteMsg(selected._id)} className="btn-ghost text-sm text-red-400 border border-red-500/20 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white/20 text-center">
              <div>
                <MessageSquare size={40} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== PROFILE MANAGER =====
const ProfileManager = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    profileApi.get().then(res => setProfile(res.data.profile)).catch(() => {});
  }, []);

  const handleSave = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await profileApi.update(profile);
      setProfile(res.data.profile);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="text-white/40 text-center py-20">Loading profile...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-white">Profile Settings</h2>
      <form onSubmit={handleSave} className="glass-card p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            ['Name', 'name', profile.name],
            ['Title', 'title', profile.title],
            ['Email', 'email', profile.email],
            ['Phone', 'phone', profile.phone],
            ['Location', 'location', profile.location],
            ['CV URL', 'cvUrl', profile.cvUrl],
          ].map(([label, key, val]) => (
            <div key={key}>
              <label className="block text-white/50 text-xs mb-1.5">{label}</label>
              <input
                value={profile[key] || ''}
                onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                className="input-field"
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-white/50 text-xs mb-1.5">Tagline</label>
          <input value={profile.tagline || ''} onChange={e => setProfile(p => ({ ...p, tagline: e.target.value }))} className="input-field" />
        </div>

        <div>
          <label className="block text-white/50 text-xs mb-1.5">Bio</label>
          <textarea value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={4} className="input-field resize-none" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {['github', 'linkedin', 'twitter'].map(social => (
            <div key={social}>
              <label className="block text-white/50 text-xs mb-1.5 capitalize">{social}</label>
              <input
                value={profile.socialLinks?.[social] || ''}
                onChange={e => setProfile(p => ({ ...p, socialLinks: { ...p.socialLinks, [social]: e.target.value } }))}
                className="input-field"
                placeholder={`https://${social}.com/...`}
              />
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 text-sm">
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
          Save Changes
        </button>
      </form>
    </div>
  );
};

// ===== MAIN DASHBOARD =====
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    projectsApi.getAll().then(r => setProjects(r.data.projects || [])).catch(() => {});
    messagesApi.getAll().then(r => setMessages(r.data.messages || [])).catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        className="hidden md:flex flex-col bg-dark-100 border-r border-white/5 flex-shrink-0 transition-all duration-300 relative z-20"
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white text-base">CA</span>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="font-heading font-bold text-white text-sm whitespace-nowrap"
              >
                Admin Panel
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                    {item.label === 'Messages' && unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">{unreadCount}</span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-dark-100 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-primary/50 transition-all z-10"
        >
          <ChevronRight size={12} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-dark-100 border-r border-white/5 z-40 md:hidden p-4"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-display text-white text-base">CA</span>
                </div>
                <span className="font-heading font-bold text-white">Admin Panel</span>
              </div>
              <nav className="space-y-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                        isActive ? 'bg-primary/15 text-primary' : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full mt-4 text-sm">
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-dark-100 border-b border-white/5 flex items-center justify-between px-4 md:px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <div className="relative">
                <Bell size={18} className="text-white/40" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-white text-xs flex items-center justify-center">{unreadCount}</div>
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-sm font-medium">{user?.name}</div>
              <div className="text-white/40 text-xs capitalize">{user?.role}</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview projects={projects} messages={messages} />} />
            <Route path="/projects" element={<ProjectsManager projects={projects} setProjects={setProjects} />} />
            <Route path="/messages" element={<MessagesManager messages={messages} setMessages={setMessages} />} />
            <Route path="/profile" element={<ProfileManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

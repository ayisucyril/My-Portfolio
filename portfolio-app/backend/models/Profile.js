const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Cyril Ayisu' },
  title: { type: String, default: 'Full Stack Developer | Creative Web Designer' },
  tagline: { type: String, default: 'Building scalable digital experiences with creativity and precision.' },
  bio: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  avatar: { type: String, default: '' },
  cvUrl: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  stats: {
    projects: { type: Number, default: 0 },
    clients: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    certifications: { type: Number, default: 0 }
  },
  updatedAt: { type: Date, default: Date.now }
});

profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', profileSchema);

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  image: { type: String, default: '' },
  techStack: [{ type: String, trim: true }],
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'design', 'mobile', 'other'],
    default: 'fullstack'
  },
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['completed', 'in-progress', 'archived'], default: 'completed' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);

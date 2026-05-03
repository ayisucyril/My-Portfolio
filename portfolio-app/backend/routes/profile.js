const express = require('express');
const Profile = require('../models/Profile');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/profile
// @desc    Get profile (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Cyril Ayisu',
        title: 'Full Stack Developer | Creative Web Designer',
        tagline: 'Building scalable digital experiences with creativity and precision.',
        bio: 'Passionate full-stack developer and creative web designer with expertise in building modern, scalable web applications. I blend technical precision with creative design thinking to deliver exceptional digital experiences.',
        email: 'cyrilayisu@email.com',
        location: 'Ghana, West Africa',
        socialLinks: {
          github: 'https://github.com/cyrilayisu',
          linkedin: 'https://linkedin.com/in/cyrilayisu'
        },
        stats: { projects: 30, clients: 20, experience: 3, certifications: 8 }
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private/Admin
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
    }
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

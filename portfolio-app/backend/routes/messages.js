const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

const sendEmailNotification = async (messageData) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact: ${messageData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #fff; border-radius: 10px;">
          <h2 style="color: #ff6b00; border-bottom: 2px solid #ff6b00; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong style="color: #ff6b00;">From:</strong> ${messageData.name} (${messageData.email})</p>
          <p><strong style="color: #ff6b00;">Subject:</strong> ${messageData.subject}</p>
          <p><strong style="color: #ff6b00;">Message:</strong></p>
          <p style="background: #1a1a1a; padding: 15px; border-radius: 5px; border-left: 3px solid #ff6b00;">${messageData.message}</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">Sent from Cyril Ayisu Portfolio</p>
        </div>
      `
    });
  } catch (err) {
    console.error('Email notification error:', err.message);
  }
};

// @route   POST /api/messages
// @desc    Send contact message (public)
// @access  Public
router.post('/', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await Message.create({ name, email, subject, message });
    sendEmailNotification({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully! I will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/messages
// @desc    Get all messages (admin)
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    const unread = await Message.countDocuments({ read: false });
    res.json({ success: true, count: messages.length, unread, messages });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PATCH /api/messages/:id/read
// @desc    Mark message as read
// @access  Private/Admin
router.patch('/:id/read', protect, adminOnly, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

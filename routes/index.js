const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Home
router.get('/', (req, res) => {
  res.render('index', {
    page: 'home',
    title: 'TD Handy Man Australia — Expert Gardening & Landscaping',
    description: 'Professional gardening, landscaping, and garden maintenance services across Australia. Trusted local experts transforming outdoor spaces.'
  });
});

// Services
router.get('/services', (req, res) => {
  res.render('services', {
    page: 'services',
    title: 'Our Services — TD Handy Man Australia',
    description: 'Comprehensive gardening and landscaping services including lawn care, garden design, pruning, irrigation, and more across Australia.'
  });
});

// Gallery
router.get('/gallery', (req, res) => {
  res.render('gallery', {
    page: 'gallery',
    title: 'Project Gallery — TD Handy Man Australia',
    description: 'Browse our portfolio of stunning garden transformations and landscaping projects across Australia.'
  });
});

// About
router.get('/about', (req, res) => {
  res.render('about', {
    page: 'about',
    title: 'About Us — TD Handy Man Australia',
    description: 'Learn about TD Handy Man Australia — a passionate team of local gardening and landscaping professionals serving communities across Australia.'
  });
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact', {
    page: 'contact',
    title: 'Contact Us — TD Handy Man Australia',
    description: 'Get a free quote or book a service with TD Handy Man Australia. We serve residential and commercial clients across Australia.',
    success: false,
    error: false
  });
});

// Contact POST
router.post('/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.render('contact', {
      page: 'contact',
      title: 'Contact Us — TD Handy Man Australia',
      description: 'Get in touch with TD Handy Man Australia.',
      success: false,
      error: 'Please fill in all required fields.'
    });
  }

  // NOTE: Configure your SMTP credentials in environment variables or below
  // For now, we log the submission and show a success message
  console.log('📬 Contact Form Submission:');
  console.log({ name, email, phone, service, message });

  /*
  // Uncomment and configure to enable email sending:
  const transporter = nodemailer.createTransport({
    host: 'smtp.youremail.com',
    port: 587,
    auth: { user: 'your@email.com', pass: 'yourpassword' }
  });
  await transporter.sendMail({
    from: email,
    to: 'info@tdhandyman.com.au',
    subject: `New Enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
  });
  */

  res.render('contact', {
    page: 'contact',
    title: 'Contact Us — TD Handy Man Australia',
    description: 'Get in touch with TD Handy Man Australia.',
    success: true,
    error: false
  });
});

module.exports = router;

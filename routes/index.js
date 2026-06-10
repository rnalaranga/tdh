const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Home
router.get('/', (req, res) => {
  res.render('index', {
    page: 'home',
    title: 'TD HANDYMAN — Expert Property Maintenance & Handyman Services',
    description: 'Professional handyman, landscaping, retaining walls, rendering, and property maintenance services in South East Melbourne, Victoria.'
  });
});

// Services
router.get('/services', (req, res) => {
  res.render('services', {
    page: 'services',
    title: 'Our Services — TD HANDYMAN',
    description: 'Comprehensive handyman and property services including landscaping, tiling, painting, retaining walls, and modern wall moulding in Melbourne.'
  });
});

// Gallery
router.get('/gallery', (req, res) => {
  res.render('gallery', {
    page: 'gallery',
    title: 'Project Gallery — TD HANDYMAN',
    description: 'Browse our portfolio of stunning property transformations, landscaping projects, and handyman work across South East Melbourne.'
  });
});

// About
router.get('/about', (req, res) => {
  res.render('about', {
    page: 'about',
    title: 'About Us — TD HANDYMAN',
    description: 'Learn about TD HANDYMAN — a passionate team of local property maintenance and handyman professionals serving South East Melbourne.'
  });
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact', {
    page: 'contact',
    title: 'Contact Us — TD HANDYMAN',
    description: 'Get a free quote or book a service with TD HANDYMAN. We serve residential clients across South East Melbourne, Victoria.',
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
      title: 'Contact Us — TD HANDYMAN',
      description: 'Get in touch with TD HANDYMAN.',
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
    to: 'tdmnptyltd@gmail.com',
    subject: `New Enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
  });
  */

  res.render('contact', {
    page: 'contact',
    title: 'Contact Us — TD HANDYMAN',
    description: 'Get in touch with TD HANDYMAN.',
    success: true,
    error: false
  });
});

module.exports = router;

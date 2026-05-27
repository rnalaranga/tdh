// ============================================
//  TD Handy Man Australia — Enhanced Main JS
//  Glass effects, particles, tilt, cursor glow
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Mobile detection — skip heavy FX on touch devices
  const isMobile = window.matchMedia('(max-width: 768px)').matches
    || ('ontouchstart' in window)
    || (navigator.maxTouchPoints > 0);

  const isDesktop = window.matchMedia('(pointer: fine)').matches && !isMobile;

  // ============================================
  // PAGE LOADER BAR
  // ============================================
  const loader = document.createElement('div');
  loader.className = 'loading-bar';
  document.body.appendChild(loader);
  setTimeout(() => loader.remove(), 2000);

  // ============================================
  // CURSOR GLOW (desktop only)
  // ============================================
  if (isDesktop) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0, cx = 0, cy = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cx += (mouseX - cx) * 0.08;
      cy += (mouseY - cy) * 0.08;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      raf = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Glow reacts to hovering dark sections
    document.querySelectorAll('.services-preview, .cta-banner, .footer, .page-hero, .hero').forEach(section => {
      section.addEventListener('mouseenter', () => {
        cursor.style.background = 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)';
      });
      section.addEventListener('mouseleave', () => {
        cursor.style.background = 'radial-gradient(circle, rgba(82,183,136,0.06) 0%, transparent 65%)';
      });
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  const isLightPage = document.body.classList.contains('light-nav');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      if (isLightPage) navbar.classList.remove('light');
    } else {
      navbar.classList.remove('scrolled');
      if (isLightPage) navbar.classList.add('light');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
  if (isLightPage) navbar.classList.add('light');

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // FLOATING PARTICLES (Hero only — desktop)
  // ============================================
  const hero = document.querySelector('.hero-editorial');
  if (hero && !isMobile) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    hero.insertBefore(particleContainer, hero.firstChild);

    const particleCount = 28;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      // Randomize size (1–5px)
      const size = Math.random() * 4 + 1;
      p.style.width  = size + 'px';
      p.style.height = size + 'px';

      // Position
      p.style.left = Math.random() * 100 + '%';

      // Colors: mostly white, some gold/green
      const colors = [
        'rgba(255,255,255,0.5)',
        'rgba(255,255,255,0.3)',
        'rgba(232,201,106,0.6)',
        'rgba(116,198,157,0.5)',
        'rgba(255,255,255,0.7)',
      ];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];

      // Animation duration and delay
      const dur   = Math.random() * 15 + 8;
      const delay = Math.random() * 10;
      p.style.animationDuration = dur + 's';
      p.style.animationDelay   = '-' + delay + 's';

      // Some particles are bigger and blurry
      if (size > 3.5) {
        p.style.filter = 'blur(1px)';
        p.style.borderRadius = '50%';
      }

      particleContainer.appendChild(p);
    }

    // Glow rings
    const ringData = [
      { size: 300, top: '30%', left: '70%', delay: '0s' },
      { size: 180, top: '60%', left: '15%', delay: '2s' },
      { size: 240, top: '15%', left: '40%', delay: '4s' },
    ];

    ringData.forEach(({ size, top, left, delay }) => {
      const ring = document.createElement('div');
      ring.className = 'hero-glow-ring';
      ring.style.width  = size + 'px';
      ring.style.height = size + 'px';
      ring.style.top  = top;
      ring.style.left = left;
      ring.style.transform = 'translate(-50%, -50%)';
      ring.style.animationDelay = delay;
      hero.appendChild(ring);
    });

    // Ambient orbs in hero
    const orbs = [
      { size: 400, top: '20%', right: '10%', type: 'orb-green', dur: '10s' },
      { size: 280, bottom: '15%', left: '5%',  type: 'orb-gold',  dur: '14s' },
    ];

    orbs.forEach(({ size, top, bottom, right, left, type, dur }) => {
      const orb = document.createElement('div');
      orb.className = `orb ${type}`;
      orb.style.width  = size + 'px';
      orb.style.height = size + 'px';
      if (top)    orb.style.top    = top;
      if (bottom) orb.style.bottom = bottom;
      if (right)  orb.style.right  = right;
      if (left)   orb.style.left   = left;
      orb.style.animationDuration = dur;
      hero.appendChild(orb);
    });
  }

  // ============================================
  // PAGE HERO GLASS DECORATIONS
  // ============================================
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    const gl = document.createElement('div');
    gl.className = 'page-hero-glass-left';
    pageHero.appendChild(gl);

    const gr = document.createElement('div');
    gr.className = 'page-hero-glass-right';
    pageHero.appendChild(gr);

    const line = document.createElement('div');
    line.className = 'page-hero-line';
    pageHero.appendChild(line);
  }

  // ============================================
  // SCROLL REVEAL (Intersection Observer)
  // ============================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children).filter(
            c => c.classList.contains('reveal') || c.classList.contains('reveal-left') || c.classList.contains('reveal-right')
          );
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const dur    = 2000;
          const start  = performance.now();

          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const e = 1 - Math.pow(1 - p, 4); // ease-out quart
            el.textContent = Math.round(e * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObs.observe(el));
  }

  // ============================================
  // 3D TILT EFFECT on service/testimonial cards
  // ============================================
  if (isDesktop) {
    document.querySelectorAll('.service-card, .testimonial-card, .value-card, .why-feature').forEach(card => {
      const MAX = 10;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * MAX}deg) rotateX(${-y * MAX}deg) translateY(-8px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
      });
    });
  }

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  if (isDesktop) {
    document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
      const STRENGTH = 0.35;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * STRENGTH;
        const dy = (e.clientY - cy) * STRENGTH;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
        btn.style.transition = 'transform 0.15s ease';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background 0.3s ease';
      });
    });
  }

  // ============================================
  // GALLERY FILTER
  // ============================================
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;

        if (show) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92) translateY(16px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
            item.style.opacity = '1';
            item.style.transform = '';
          }, 20);
        } else {
          item.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => { item.style.display = 'none'; }, 280);
        }
      });
    });
  });

  // ============================================
  // LIGHTBOX
  // ============================================
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.getAttribute('data-src');
        lightboxImg.alt = item.getAttribute('data-alt') || 'Gallery image';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 400);
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
  }

  // ============================================
  // PARALLAX on PAGE HERO background
  // ============================================
  if (pageHero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      pageHero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }, { passive: true });
  }

  // ============================================
  // HERO PARALLAX CONTENT (desktop only — causes jank on mobile)
  // ============================================
  const heroContent = document.querySelector('.hero-editorial-content');
  if (heroContent && isDesktop) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.18}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.85));
      }
    }, { passive: true });
  }

  // ============================================
  // GLASS CARD SHIMMER on hover (touch/click)
  // ============================================
  document.querySelectorAll('.testimonial-card, .value-card').forEach(card => {
    card.classList.add('glass-shimmer');
  });

  // ============================================
  // SMOOTH ANCHOR SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // WHY-US SECTION ORBS (desktop only)
  // ============================================
  const whyUs = document.querySelector('.why-us');
  if (whyUs && isDesktop) {
    const orbData = [
      { size: 300, top: '-80px', right: '-60px', type: 'orb-green', dur: '10s' },
      { size: 200, bottom: '-60px', left: '10%', type: 'orb-gold',  dur: '13s' },
    ];

    orbData.forEach(({ size, top, bottom, right, left, type, dur }) => {
      const orb = document.createElement('div');
      orb.className = `orb ${type}`;
      orb.style.cssText = `width:${size}px; height:${size}px; filter:blur(70px); animation-duration:${dur};`;
      if (top)    orb.style.top    = top;
      if (bottom) orb.style.bottom = bottom;
      if (right)  orb.style.right  = right;
      if (left)   orb.style.left   = left;
      whyUs.appendChild(orb);
    });
  }

  // ============================================
  // SERVICES PREVIEW ORBS (desktop only)
  // ============================================
  const servicesPreview = document.querySelector('.services-preview');
  if (servicesPreview && isDesktop) {
    const orb1 = document.createElement('div');
    orb1.className = 'orb orb-dark';
    orb1.style.cssText = 'width:500px; height:500px; top:-100px; left:-100px; filter:blur(80px); animation-duration:14s; z-index:0;';
    servicesPreview.appendChild(orb1);
  }

  // ============================================
  // TESTIMONIALS SECTION ORBS (desktop only)
  // ============================================
  const testimonials = document.querySelector('.testimonials');
  if (testimonials && isDesktop) {
    const orb = document.createElement('div');
    orb.className = 'orb orb-green';
    orb.style.cssText = 'width:400px; height:400px; top:-100px; right:-80px; filter:blur(80px); animation-duration:12s; opacity:0.5;';
    testimonials.appendChild(orb);
  }

  // ============================================
  // STAT ITEMS — stagger entrance
  // ============================================
  document.querySelectorAll('.stat-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1 + 0.5}s`;
  });

  // ============================================
  // FORM SUBMIT ANIMATION
  // ============================================
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', () => {
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.8';
      submitBtn.disabled = true;
    });
  }

  // ============================================
  // SECTION SCROLL PROGRESS INDICATOR
  // (Adds a subtle colored top-border progress)
  // ============================================
  let progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; width: 0%; z-index: 9998;
    background: linear-gradient(90deg, #2d6a4f, #52b788, #c9a84c);
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

});

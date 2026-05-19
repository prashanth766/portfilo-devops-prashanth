/* Advanced Interactions for Portfolio */

document.addEventListener('DOMContentLoaded', function () {
  // --- Navigation & Scroll Behavior ---
  const header = document.querySelector('.topbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const mobileToggle = document.getElementById('mobileToggle');
  const navList = document.querySelector('.nav-links');

  // Handle header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    mobileToggle.classList.toggle('active');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      navList.classList.remove('open');
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active link on scroll
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  // --- Reveal Animations ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  // --- Magnetic Buttons (Desktop Only) ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    const magneticButtons = document.querySelectorAll('.button-primary, .button-secondary, .hero-pill');
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0, 0)`;
      });
    });
  }

  // --- Custom Cursor ---
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });

  // --- Form Handling ---
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.textContent = 'Message sent successfully! I will get back to you soon.';
      feedback.style.color = 'var(--accent)';
      form.reset();
      setTimeout(() => feedback.textContent = '', 5000);
    });
  }

  // --- Resume Download Handler ---
  const resumeBtn = document.querySelector('.button-secondary[download]');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
      // For local file:// access, we sometimes need to help the browser
      const href = this.getAttribute('href');
      if (href && href.endsWith('.pdf')) {
        // The 'download' attribute on the <a> tag is already there,
        // but we can log or add extra logic here if needed.
        console.log("Downloading resume...");
      }
    });
  }

});

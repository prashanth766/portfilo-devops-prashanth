/* Main JavaScript for navigation, section animations, and contact form behavior */

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.15,
  };

  // Toggle mobile navigation menu
  const mobileToggle = document.getElementById('mobileToggle');
  const navList = document.querySelector('.nav-links');
  mobileToggle.addEventListener('click', function () {
    navList.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
    });
  });

  // Smooth scroll anchor support for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        event.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Intersection Observer for reveal animation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach((element) => {
    revealObserver.observe(element);
  });

  // Highlight active nav item on scroll
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (entry.isIntersecting && navLink) {
          navLinks.forEach((item) => item.classList.remove('active'));
          navLink.classList.add('active');
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Contact form placeholder submission behavior
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      feedback.textContent = 'Thank you! Your message has been received. I will respond shortly.';
      form.reset();
      setTimeout(() => {
        feedback.textContent = '';
      }, 6000);
    });
  }
});

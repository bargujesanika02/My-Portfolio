/* =========================================================
   PORTFOLIO SCRIPT
   1. Mobile navigation (hamburger menu)
   2. Active nav link on scroll
   3. Scroll-reveal animations
   4. Back-to-top button
   5. Contact form validation
   6. Footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
  initBackToTop();
  initContactForm();
  setFooterYear();
});

/* ---------------------------------------------------------
   1. MOBILE NAVIGATION
   --------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('[data-nav-link]');

  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close the mobile menu whenever a nav link is clicked
  navLinkItems.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close the menu on Escape for keyboard users
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

/* ---------------------------------------------------------
   2. ACTIVE NAV LINK ON SCROLL
   --------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const setActive = (id) => {
    navAnchors.forEach((anchor) => {
      const isMatch = anchor.getAttribute('href') === `#${id}`;
      anchor.classList.toggle('active-link', isMatch);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS
   --------------------------------------------------------- */
function initScrollReveal() {
  const revealItems = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) || revealItems.length === 0) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   4. BACK TO TOP BUTTON
   --------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  const toggleVisibility = () => {
    backToTopBtn.classList.toggle('is-visible', window.scrollY > 480);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   5. CONTACT FORM VALIDATION
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formStatus = document.getElementById('formStatus');

  // Field configuration: id -> validation rule + error message
  const fieldRules = {
    name: {
      validate: (value) => value.trim().length >= 2,
      message: 'Please enter your name (at least 2 characters).',
    },
    email: {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Please enter a valid email address.',
    },
    subject: {
      validate: (value) => value.trim().length >= 3,
      message: 'Please enter a subject (at least 3 characters).',
    },
    message: {
      validate: (value) => value.trim().length >= 10,
      message: 'Your message should be at least 10 characters.',
    },
  };

  const validateField = (fieldName) => {
    const input = form.elements[fieldName];
    const errorEl = document.getElementById(`${fieldName}Error`);
    const rule = fieldRules[fieldName];
    const isValid = rule.validate(input.value);

    input.setAttribute('aria-invalid', String(!isValid));
    errorEl.textContent = isValid ? '' : rule.message;

    return isValid;
  };

  // Validate on blur for immediate feedback
  Object.keys(fieldRules).forEach((fieldName) => {
    const input = form.elements[fieldName];
    input.addEventListener('blur', () => validateField(fieldName));
    input.addEventListener('input', () => {
      // Clear the error as soon as the field becomes valid again
      if (input.getAttribute('aria-invalid') === 'true') {
        validateField(fieldName);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fieldNames = Object.keys(fieldRules);
    const results = fieldNames.map((fieldName) => validateField(fieldName));
    const allValid = results.every(Boolean);

    if (!allValid) {
      formStatus.textContent = 'Please fix the highlighted fields and try again.';
      formStatus.style.color = '#e0637a';
      return;
    }

    // No backend is connected yet -- this simulates a successful submission.
    formStatus.textContent = `Thanks, ${form.elements.name.value.trim()}! Your message has been noted.`;
    formStatus.style.color = '';
    form.reset();

    fieldNames.forEach((fieldName) => {
      form.elements[fieldName].removeAttribute('aria-invalid');
      document.getElementById(`${fieldName}Error`).textContent = '';
    });
  });
}

/* ---------------------------------------------------------
   6. FOOTER YEAR
   --------------------------------------------------------- */
function setFooterYear() {
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Sanika Barguje. All rights reserved.`;
  }
}
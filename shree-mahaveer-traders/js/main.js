// =========================================
//  SHREE MAHAVEER TRADERS — MAIN JS
// =========================================

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- SCROLL REVEAL ---
const reveals = document.querySelectorAll('.product-card, .feature-item, .contact-card, .team-member, .about-inner > *');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// --- ENQUIRY FORM ---
function handleEnquiry() {
  const inputs = document.querySelectorAll('.contact-card-form .form-input');
  let filled = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      filled = false;
      input.style.borderColor = '#ff453a';
      setTimeout(() => input.style.borderColor = '', 2000);
    }
  });
  if (!filled) return;

  showToast('✓ Enquiry sent! We\'ll contact you soon.');
  inputs.forEach(input => input.value = '');
}

// --- PRODUCT OVERLAY CLICK ---
document.querySelectorAll('.overlay-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name').textContent;
    showToast(`Enquiring about: ${name}`);
  });
});

// --- GET QUOTE BUTTON ---
document.querySelector('.nav-cta').addEventListener('click', () => {
  const contact = document.getElementById('contact');
  if (contact) {
    const offset = 70;
    const top = contact.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

// --- TOAST ---
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// --- ACTIVE NAV LINKS ---
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--gold)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// --- PAGE LOAD ANIMATION ---
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

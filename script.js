/* =============================================
   SNAP MAGIC PHOTOGRAPHY — JAVASCRIPT
   ============================================= */

// === LOADER ===
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1800);
});

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect
document.querySelectorAll('a, button, .filter-btn, .port-zoom, .social-btn, .slider-btn, .dot').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'rgba(201,168,76,0.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--gold)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observerNav.observe(sec));

// === MOBILE MENU ===
const burger = document.getElementById('burger');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeMenu = document.getElementById('closeMenu');

burger.addEventListener('click', () => {
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

closeMenu.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// === PARTICLES ===
const particlesContainer = document.getElementById('particles');
function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
  p.style.animationDuration = (Math.random() * 12 + 8) + 's';
  p.style.animationDelay = Math.random() * 10 + 's';
  p.style.opacity = Math.random() * 0.8;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 22000);
}
for (let i = 0; i < 30; i++) createParticle();
setInterval(createParticle, 800);

// === COUNT UP ANIMATION ===
function countUp(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// === SCROLL ANIMATIONS ===
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '[data-animate], .service-card, .port-item, .process-step, .testimonial-card, .contact-item'
).forEach(el => animObserver.observe(el));

// === PORTFOLIO FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const portItems = document.querySelectorAll('.port-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    portItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = '';
        setTimeout(() => item.classList.add('visible'), 50);
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
      }
    });
  });
});

// === TESTIMONIALS SLIDER ===
const track = document.getElementById('testimonialTrack');
const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let slidesPerView = 3;
let autoSlideTimer = null;
const totalSlides = cards.length;

function getSlidesPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 3;
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const numDots = Math.ceil(totalSlides / slidesPerView);
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(idx) {
  slidesPerView = getSlidesPerView();
  const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
  currentSlide = Math.max(0, Math.min(idx, maxSlide));

  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentSlide * cardWidth * slidesPerView}px)`;

  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  const maxSlide = Math.ceil(totalSlides / getSlidesPerView()) - 1;
  goToSlide(currentSlide < maxSlide ? currentSlide + 1 : 0);
}
function prevSlide() {
  const maxSlide = Math.ceil(totalSlides / getSlidesPerView()) - 1;
  goToSlide(currentSlide > 0 ? currentSlide - 1 : maxSlide);
}

prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 4500);
}

window.addEventListener('resize', () => {
  slidesPerView = getSlidesPerView();
  buildDots();
  goToSlide(0);
});

buildDots();
resetAutoSlide();

// === CONTACT FORM ===
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fname = document.getElementById('fname');
  const fmobile = document.getElementById('fmobile');
  const fnameError = document.getElementById('fnameError');
  const fmobileError = document.getElementById('fmobileError');

  let valid = true;

  // Validate name
  fnameError.textContent = '';
  if (!fname.value.trim()) {
    fnameError.textContent = 'Please enter your full name.';
    fname.style.borderColor = '#ff6b6b';
    valid = false;
  } else {
    fname.style.borderColor = '';
  }

  // Validate mobile
  fmobileError.textContent = '';
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!fmobile.value.trim()) {
    fmobileError.textContent = 'Please enter your mobile number.';
    fmobile.style.borderColor = '#ff6b6b';
    valid = false;
  } else if (!mobileRegex.test(fmobile.value.trim())) {
    fmobileError.textContent = 'Please enter a valid 10-digit mobile number.';
    fmobile.style.borderColor = '#ff6b6b';
    valid = false;
  } else {
    fmobile.style.borderColor = '';
  }

  if (!valid) return;

  // Build WhatsApp message
  const service = document.getElementById('fservice').value || 'Not specified';
  const date = document.getElementById('fdate').value || 'Not specified';
  const budget = document.getElementById('fbudget').value || 'Not specified';
  const message = document.getElementById('fmessage').value || '';

  const waMsg = encodeURIComponent(
    `Hello Snap Magic Photography! 📷\n\n` +
    `*Name:* ${fname.value.trim()}\n` +
    `*Mobile:* ${fmobile.value.trim()}\n` +
    `*Service:* ${service}\n` +
    `*Event Date:* ${date}\n` +
    `*Budget:* ${budget}\n` +
    `*Message:* ${message || 'N/A'}\n\n` +
    `Please get in touch with me. Thank you!`
  );

  window.open(`https://wa.me/918722221008?text=${waMsg}`, '_blank');

  formSuccess.classList.add('show');
  form.reset();

  setTimeout(() => {
    formSuccess.classList.remove('show');
  }, 6000);
});

// Reset field error color on input
['fname', 'fmobile'].forEach(id => {
  document.getElementById(id).addEventListener('input', function () {
    this.style.borderColor = '';
    document.getElementById(id + 'Error').textContent = '';
  });
});

// === BACK TO TOP ===
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === SMOOTH ANCHOR SCROLLING (offset for navbar) ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

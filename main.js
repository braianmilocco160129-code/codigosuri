document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCarousel();
  initContactForm();
  initSmoothScroll();
  initScrollAnimations();
});

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function initCarousel() {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  const cards = carousel.querySelectorAll('.experience-card');

  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(index));
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 32;
    const activeIndex = Math.round(scrollLeft / cardWidth);

    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  function scrollToCard(index) {
    const cardWidth = cards[0].offsetWidth + 32;
    carousel.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
  }

  prevBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 32;
    carousel.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 32;
    carousel.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  });

  carousel.addEventListener('scroll', updateDots);

  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      const cardWidth = cards[0].offsetWidth + 32;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  startAutoScroll();

  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);
  prevBtn.addEventListener('click', () => {
    stopAutoScroll();
    setTimeout(startAutoScroll, 10000);
  });
  nextBtn.addEventListener('click', () => {
    stopAutoScroll();
    setTimeout(startAutoScroll, 10000);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    formMessage.className = 'form-message';
    formMessage.textContent = 'Enviando mensaje...';
    formMessage.style.display = 'block';

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form data:', formData);

      formMessage.className = 'form-message success';
      formMessage.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';

      form.reset();

      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    } catch (error) {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
    }
  });
}

function initSmoothScroll() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.service-card, .experience-card, .team-card, .highlight-item');

  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  document.querySelectorAll('.section-title').forEach((title, index) => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(title);
  });
}

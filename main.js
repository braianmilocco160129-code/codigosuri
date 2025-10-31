document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCarousel();
  initContactForm();
  initSmoothScroll();
  initScrollAnimations();
  initProjectModal();
  initWhatsAppFloat();
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

  // Si no existe el formulario (porque usamos iframe de Google Forms), salir
  if (!form || !formMessage) {
    return;
  }

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

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const experienceCards = document.querySelectorAll('.experience-card');

  const projectData = {
    scrapy: {
      title: 'App Scrapy',
      badge: 'App Web',
      description: 'Refactorización completa de una aplicación móvil existente para optimizar la recolección de residuos de última milla, incluyendo desarrollo de backend API y sistema de administración web.',
      challenge: 'Recibimos una app móvil que estaba muy limitada en funcionalidades y rendimiento. Necesitaban una refactorización completa, nuevas funcionalidades críticas y un sistema de administración robusto.',
      solution: 'Refactorizamos completamente la aplicación móvil, desarrollamos una API backend sólida y creamos un sistema de administración en React que permite gestionar todas las operaciones de recolección de forma eficiente.',
      technologies: ['React Native', 'Laravel', 'React', 'MySQL'],
      features: [
        'Optimización de rutas de recolección',
        'Manejo de coordenadas GPS',
        'Sistema de mensajería interna',
        'Notificaciones push en tiempo real',
        'Estadísticas y reportes detallados',
        'Panel de administración web'
      ]
    },
    barzoom: {
      title: 'Bar Zoom',
      badge: 'Sistema de Gestión',
      description: 'Sistema de gestión integral 100% a medida para bares y restaurantes, con control completo de operaciones y conexión con periféricos.',
      challenge: 'El bar necesitaba centralizar todas sus operaciones en un solo sistema: caja, turnos, stock, ventas y estadísticas. Además, requerían integración con hardware existente y plataformas externas.',
      solution: 'Desarrollamos un sistema completamente personalizado que maneja todas las operaciones del bar, se conecta con lectores de código de barras e impresoras, integra AFIP y MercadoPago, y envía notificaciones automáticas por Telegram.',
      technologies: ['Django', 'PostgreSQL', 'React', 'MercadoPago API', 'AFIP SDK', 'Telegram Bot API'],
      features: [
        'Gestión de caja y ventas',
        'Control de turnos de personal',
        'Administración de stock e inventario',
        'Control de entradas y salidas',
        'Facturación electrónica AFIP',
        'Integración con MercadoPago',
        'Conexión con lectores de código de barras',
        'Impresión directa de comprobantes',
        'Notificaciones Telegram para incidentes',
        'Panel con estadísticas y métricas en tiempo real'
      ]
    },
    ecosnapshot: {
      title: 'EcoSnapshot',
      badge: 'IA + Análisis',
      description: 'Plataforma con IA y RAG que permite a PyMEs evaluar su desempeño en triple impacto y recibir planes de acción personalizados.',
      challenge: 'Las PyMEs necesitaban una forma accesible de medir y mejorar su impacto social, ambiental y económico, con recomendaciones específicas para su realidad.',
      solution: 'Creamos una plataforma que combina formularios inteligentes, análisis con IA y un sistema RAG con información especializada. Evalúa el triple impacto y genera informes personalizados con planes de mejora paso a paso adaptados a cada empresa.',
      technologies: ['Django', 'PostgreSQL', 'Vue.js', 'OpenAI API', 'RAG (Retrieval-Augmented Generation)'],
      features: [
        'Formulario inteligente de 50 preguntas',
        'Calificación automatizada por área',
        'Análisis de triple impacto (social, ambiental, económico)',
        'Informes personalizados con IA',
        'Planes de mejora estructurados paso a paso',
        'Recomendaciones adaptadas a cada PyME',
        'Sistema RAG con información especializada'
      ]
    },
    botseguros: {
      title: 'Bot de Seguros',
      badge: 'Bot IA',
      description: 'Bot inteligente de WhatsApp con agente de IA para gestión de incidentes de seguros en lenguaje natural, integrado con plataforma Oracle.',
      challenge: 'Los clientes de un broker de seguros necesitaban consultar y crear incidentes en Oracle de forma ágil, pero el sistema era complejo y poco accesible.',
      solution: 'Implementamos un bot de WhatsApp con un agente de IA que permite a los usuarios interactuar en lenguaje natural sin botoneras ni flujos estructurados. El bot se conecta con la plataforma Oracle para buscar y crear incidentes automáticamente.',
      technologies: ['Node.js', 'WhatsApp Bot Library', 'Redis', 'Django', 'PostgreSQL', 'LangGraph', 'Oracle Integration'],
      features: [
        'Conversación en lenguaje natural',
        'Agente de IA sin flujos estructurados',
        'Búsqueda de incidentes en Oracle',
        'Creación automática de nuevos incidentes',
        'Integración bidireccional con Oracle',
        'Procesamiento de contexto conversacional',
        'Sistema de caché con Redis'
      ]
    },
    mistral: {
      title: 'Espacio Mistral',
      badge: 'E-commerce',
      description: 'Plataforma completa para teatro independiente en España: gestión de eventos, funciones, suscripciones, venta de entradas y donaciones.',
      challenge: 'Un teatro independiente necesitaba digitalizar todas sus operaciones: venta de entradas, gestión de funciones, suscripciones de usuarios y donaciones, con métricas para optimizar su gestión.',
      solution: 'Desarrollamos una plataforma integral que permite administrar todos los aspectos del teatro, desde la creación de eventos hasta la venta de entradas y gestión de suscriptores, con un panel completo de métricas y estadísticas.',
      technologies: ['Django', 'PostgreSQL', 'React', 'Docker', 'Stripe'],
      features: [
        'Gestión completa de eventos y funciones',
        'Sistema de suscripciones de usuarios',
        'Venta de entradas online',
        'Procesamiento de donaciones',
        'Administración de entradas vendidas',
        'Panel con métricas y estadísticas',
        'Reportes para optimización de funciones',
        'Gestión de aforos y disponibilidad'
      ]
    },
    legal: {
      title: 'Estudio de Abogados',
      badge: 'Solución Legal',
      description: 'Automatización de sincronización bidireccional de casos y escritos entre el Poder Judicial y LexDoctor mediante scripts programados.',
      challenge: 'Un estudio de abogados trabajaba manualmente con dos sistemas diferentes: el Poder Judicial y LexDoctor. Necesitaban sincronizar diariamente novedades, casos y escritos entre ambas plataformas.',
      solution: 'Creamos scripts en Python que se ejecutan automáticamente todos los días. Descarga novedades del Poder Judicial y las sube a LexDoctor, y viceversa: toma escritos de LexDoctor y los sube al Poder Judicial, eliminando completamente el trabajo manual.',
      technologies: ['Python', 'Selenium', 'Task Scheduler', 'Web Scraping'],
      features: [
        'Descarga automática de novedades del Poder Judicial',
        'Carga automática a LexDoctor',
        'Descarga de escritos desde LexDoctor',
        'Carga automática al Poder Judicial',
        'Ejecución programada diaria',
        'Sincronización bidireccional completa',
        'Logs detallados de operaciones'
      ]
    }
  };

  experienceCards.forEach(card => {
    const btn = card.querySelector('.card-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
          showModal(project);
        }
      });
    }
  });

  modalClose.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function showModal(project) {
    const techList = project.technologies.map(tech => `<li>${tech}</li>`).join('');
    const featureList = project.features.map(feature => `<li>${feature}</li>`).join('');

    modalBody.innerHTML = `
      <div class="modal-badge">${project.badge}</div>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      
      <h3>El Desafío</h3>
      <p>${project.challenge}</p>
      
      <h3>Nuestra Solución</h3>
      <p>${project.solution}</p>
      
      <h3>Tecnologías Utilizadas</h3>
      <ul>${techList}</ul>
      
      <h3>Funcionalidades Principales</h3>
      <ul>${featureList}</ul>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initWhatsAppFloat() {
  const whatsappFloat = document.getElementById('whatsappFloat');
  const whatsappClose = document.getElementById('whatsappClose');
  
  if (whatsappClose) {
    whatsappClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      whatsappFloat.classList.add('message-hidden');
      localStorage.setItem('whatsappMessageClosed', 'true');
    });
  }

  // Verificar si el usuario ya cerró el mensaje antes
  if (localStorage.getItem('whatsappMessageClosed') === 'true') {
    whatsappFloat.classList.add('message-hidden');
  }
}

/**
 * Tamil Life Coach — Interactive Functionality
 * Vanilla JavaScript (No frameworks, zero external dependencies)
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Centralized WhatsApp Configuration
  // -------------------------------------------------------------------------
  const WHATSAPP_NUMBER = "919962549549";

  /**
   * Opens WhatsApp with an encoded contextual message
   * @param {string} message
   */
  function openWhatsApp(message) {
    const defaultMsg = "Hi, I would like to know more about Tamil Life Coach.";
    const text = message && message.trim().length > 0 ? message.trim() : defaultMsg;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Expose to window for inline calls if required
  window.openWhatsApp = openWhatsApp;

  // -------------------------------------------------------------------------
  // 2. Initialize Event Listeners on DOM Ready
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppTriggers();
    initStickyHeader();
    initMobileNavigation();
    initFaqAccordion();
    initTestimonialsSlider();
    initScrollReveal();
    initSmoothScroll();
    initCurrentYear();
  });

  // -------------------------------------------------------------------------
  // 3. Centralized WhatsApp Button Handlers
  // -------------------------------------------------------------------------
  function initWhatsAppTriggers() {
    // Bind click events on all elements with data-whatsapp-message
    const triggers = document.querySelectorAll('[data-whatsapp-message]');
    triggers.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const message = button.getAttribute('data-whatsapp-message');
        openWhatsApp(message);
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Sticky Header with Compact Scrolled State
  // -------------------------------------------------------------------------
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // -------------------------------------------------------------------------
  // 5. Mobile Navigation Drawer & Hamburger
  // -------------------------------------------------------------------------
  function initMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
    const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileDrawer) return;

    const openDrawer = () => {
      mobileDrawer.classList.add('open');
      if (drawerBackdrop) drawerBackdrop.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus first link or close button for accessibility
      if (drawerCloseBtn) drawerCloseBtn.focus();
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      if (drawerBackdrop) drawerBackdrop.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuToggle.focus();
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Close drawer when any mobile nav link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 6. Accessible FAQ Accordion (Single-open mode)
  // -------------------------------------------------------------------------
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question-btn');
      const answerPanel = item.querySelector('.faq-answer-panel');

      if (!questionBtn || !answerPanel) return;

      questionBtn.addEventListener('click', () => {
        const isCurrentlyOpen = item.classList.contains('active');

        // Close all other accordion items for clean single-item view
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isCurrentlyOpen) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answerPanel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          // Smooth height calculation
          answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
        }
      });
    });

    // Handle window resize to recalculate active answer height
    window.addEventListener('resize', () => {
      const activeItem = document.querySelector('.faq-item.active');
      if (activeItem) {
        const panel = activeItem.querySelector('.faq-answer-panel');
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 7. Testimonials Slider (Vanilla JS Carousel)
  // -------------------------------------------------------------------------
  function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;

    // Create dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
          dot.setAttribute('aria-current', idx === currentIndex ? 'true' : 'false');
        });
      }
    };

    const goToSlide = (index) => {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateSlider();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoplay();
      });
    }

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const threshold = 40;
      if (swipeDistance > threshold) {
        goToSlide(currentIndex - 1); // Swipe right -> prev
        resetAutoplay();
      } else if (swipeDistance < -threshold) {
        goToSlide(currentIndex + 1); // Swipe left -> next
        resetAutoplay();
      }
    }

    // Autoplay functionality with pause on hover
    const startAutoplay = () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 6000);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    const sliderContainer = document.querySelector('.testimonials-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoplay);
      sliderContainer.addEventListener('mouseleave', startAutoplay);
      sliderContainer.addEventListener('focusin', stopAutoplay);
      sliderContainer.addEventListener('focusout', startAutoplay);
    }

    startAutoplay();
  }

  // -------------------------------------------------------------------------
  // 8. Scroll Reveal Animations (IntersectionObserver)
  // -------------------------------------------------------------------------
  function initScrollReveal() {
    // Check if reduced motion is requested
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // -------------------------------------------------------------------------
  // 9. Smooth Scrolling for Internal Navigation Links with Offset
  // -------------------------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 16;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 10. Update Copyright Year dynamically
  // -------------------------------------------------------------------------
  function initCurrentYear() {
    const yearEls = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearEls.forEach(el => {
      el.textContent = currentYear;
    });
  }

})();

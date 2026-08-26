// Portfolio Website JavaScript
// Author: Assistant
// Modern ES6+ JavaScript for interactive portfolio features

class PortfolioWebsite {
  constructor() {
    this.init();
    this.bindEvents();
    this.initAnimations();
    this.initScrollAnimations();
  }

  init() {
    // Dark theme only - no theme switching
    
    // Initialize mobile navigation
    this.mobileNavOpen = false;
    
    // Initialize scroll position
    this.lastScrollTop = 0;
    
    // Initialize loading screen
    this.showLoadingScreen();
    
    // Initialize intersection observer for animations
    this.setupIntersectionObserver();
    
    // Initialize smooth scroll behavior
    this.setupSmoothScroll();
    
    // Initialize techy animations
    this.initTechyAnimations();
    
    // Initialize typing animation
    this.initTypingAnimation();
  }

  bindEvents() {
    // No theme toggle - dark theme only

    // Mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => this.toggleMobileNav());
      
      // Close mobile nav when clicking on nav links
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (this.mobileNavOpen) {
            this.toggleMobileNav();
          }
        });
      });
    }

    // Navbar scroll behavior
    window.addEventListener('scroll', () => {
      this.handleNavbarScroll();
      this.updateActiveNavLink();
      this.handleMatrixFade();
      this.handleScrollIndicatorFade();
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.mobileNavOpen) {
        this.toggleMobileNav();
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.smoothScrollTo(target);
        }
      });
    });

    // Form handling (if any forms are added later)
    this.setupFormHandling();

    // Add click handlers for project links and resume link
    this.setupExternalLinks();

    // Add typing effect for hero title
    this.setupTypingEffect();
  }

  initAnimations() {
    // Add initial animation classes
    this.addRevealAnimations();
    
    // Start hero animations after loading
    setTimeout(() => {
      this.startHeroAnimations();
    }, 100);

    // Add scroll-triggered animations
    this.setupScrollAnimations();
  }

  // Removed theme management - dark theme only

  // Mobile Navigation
  toggleMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      this.mobileNavOpen = !this.mobileNavOpen;
      
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when mobile nav is open
      document.body.style.overflow = this.mobileNavOpen ? 'hidden' : '';
    }
  }

  // Navbar Scroll Behavior
  handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
      if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
      }
    }
    
    this.lastScrollTop = scrollTop;
  }

  // Matrix Rain Fade on Scroll
  handleMatrixFade() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Calculate opacity based on scroll position
    // Full opacity at top (0), fade out over first 2.5 screen heights (extends into about section)
    const fadeDistance = windowHeight * 2.5;
    const opacity = Math.max(0, Math.min(0.15, 0.15 - (scrollTop / fadeDistance) * 0.15));
    
    canvas.style.opacity = opacity;
  }

  // Scroll Indicator Fade on Scroll
  handleScrollIndicatorFade() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Fade out over first 300 pixels of scrolling
    const fadeDistance = 300;
    const opacity = Math.max(0, 1 - (scrollTop / fadeDistance));
    
    scrollIndicator.style.opacity = opacity;
  }

  // Active Navigation Link
  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPos = window.pageYOffset + 100;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth Scrolling
  setupSmoothScroll() {
    // Modern browsers support smooth scroll behavior in CSS
    // But we'll add a JavaScript fallback for better control
  }

  smoothScrollTo(target) {
    const targetPosition = target.offsetTop - 70; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = this.easeInOutCubic(progress / duration);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // Loading Screen
  showLoadingScreen() {
    const loadingHTML = `
      <div class="loading" id="loading">
        <div class="loader"></div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
          loading.classList.add('hide');
          setTimeout(() => {
            loading.remove();
          }, 500);
        }
      }, 500);
    });
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Add staggered animation for project cards
          if (entry.target.classList.contains('project-card')) {
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, observerOptions);
  }

  // Add Reveal Animations
  addRevealAnimations() {
    const elementsToReveal = [
      '.section-header',
      '.about-card',
      '.project-card',
      '.gallery-item',
      '.resume-cta'
    ];

    elementsToReveal.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.classList.add('reveal');
        if (this.observer) {
          this.observer.observe(element);
        }
      });
    });
  }

  // Hero Animations
  startHeroAnimations() {
    // Add floating animation to shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      shape.style.animationDelay = `${index * 0.5}s`;
    });

    // Trigger hero content animations
    const heroElements = document.querySelectorAll('[class*="fadeIn"]');
    heroElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0) translateY(0)';
    });
  }

  // Scroll Animations
  setupScrollAnimations() {
    // Add parallax effect to floating shapes
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const shapes = document.querySelectorAll('.shape');
      
      shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollTop * speed);
        shape.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Add scroll progress indicator
    this.addScrollProgress();
  }

  // Scroll Progress Indicator
  addScrollProgress() {
    const progressHTML = `
      <div class="scroll-progress">
        <div class="progress-bar"></div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', progressHTML);
    
    // Add CSS for progress bar
    const progressCSS = `
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--border-color);
        z-index: 1001;
      }
      
      .progress-bar {
        height: 100%;
        background: var(--accent-gradient);
        width: 0%;
        transition: width 0.1s ease;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = progressCSS;
    document.head.appendChild(style);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    });
  }

  // Typing Effect
  setupTypingEffect() {
    const nameElement = document.querySelector('.title-name');
    if (nameElement) {
      const originalText = nameElement.textContent;
      nameElement.textContent = '';
      
      let index = 0;
      const typeInterval = setInterval(() => {
        nameElement.textContent += originalText[index];
        index++;
        
        if (index >= originalText.length) {
          clearInterval(typeInterval);
          
          // Add blinking cursor effect
          const cursor = document.createElement('span');
          cursor.textContent = '|';
          cursor.style.animation = 'blink 1s infinite';
          cursor.style.marginLeft = '2px';
          nameElement.appendChild(cursor);
          
          // Remove cursor after 3 seconds
          setTimeout(() => {
            cursor.remove();
          }, 3000);
        }
      }, 100);
    }
    
    // Add CSS for blinking cursor
    const cursorCSS = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = cursorCSS;
    document.head.appendChild(style);
  }

  // Form Handling (for future contact forms)
  setupFormHandling() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  handleFormSubmit(form) {
    // Add form submission logic here
    console.log('Form submitted:', form);
    
    // Show success message
    this.showNotification('Message sent successfully!', 'success');
  }

  // External Links
  setupExternalLinks() {
    // Add target="_blank" to external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // Notification System
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add CSS for notifications
    const notificationCSS = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
      }
      
      .notification-success {
        background: #10b981;
      }
      
      .notification-error {
        background: #ef4444;
      }
      
      .notification-info {
        background: var(--accent-color);
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
    `;
    
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = notificationCSS;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // ===== TECHY ANIMATIONS =====
  
  initTechyAnimations() {
    // Initialize Matrix Digital Rain (user loves it!)
    this.initMatrixRain();
    
    // Initialize matrix fade on scroll
    this.handleMatrixFade();
    
    // Initialize subtle Interactive Elements only
    this.initMinimalInteractiveElements();
  }

  // Matrix Digital Rain Effect
  initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Create drops array
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    // Animation function
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color').trim();
      
      ctx.fillStyle = accentColor || '#64b5f6';
      ctx.font = fontSize + 'px Courier New';
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    setInterval(drawMatrix, 35);
  }

  // Particle System
  initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const mouse = { x: undefined, y: undefined };
    
    // Mouse move event
    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = 1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.1;
        if (this.opacity > 0) this.opacity -= 0.02;
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = getComputedStyle(document.documentElement)
          .getPropertyValue('--accent-color').trim() || '#00d4ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Animation function
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add particles at mouse position
      if (mouse.x !== undefined && mouse.y !== undefined) {
        if (particles.length < 100) {
          particles.push(new Particle(mouse.x, mouse.y));
        }
      }
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].size <= 0.2 || particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
  }

  // Mouse Trail Effect
  initMouseTrail() {
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
      if (mouseTrail.length < 10) {
        const trail = document.createElement('div');
        trail.className = 'particle-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        mouseTrail.push(trail);
        
        setTimeout(() => {
          trail.remove();
          mouseTrail = mouseTrail.filter(t => t !== trail);
        }, 800);
      }
    });
  }

  // Minimal Interactive Elements
  initMinimalInteractiveElements() {
    // Add subtle tilt effect to project cards only
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20; // Much more subtle
        const rotateY = (centerX - x) / 20; // Much more subtle
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(-2px) 
          scale(1.01)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      });
    });
  }

  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Initialize Scroll Animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const imageUrl = entry.target.getAttribute('data-image');
        const delay = entry.target.getAttribute('data-delay') || 0;
        
        if (entry.isIntersecting) {
          // Element is entering view
          setTimeout(() => {
            entry.target.classList.add('in-view');
            
            // Load image if it exists and hasn't been loaded yet
            if (imageUrl && !entry.target.classList.contains('image-loaded')) {
              // Add a small delay for image loading to show the breathing animation
              setTimeout(() => {
                this.loadGalleryImage(entry.target, imageUrl);
                entry.target.classList.add('image-loaded');
              }, 200);
            }
          }, parseInt(delay));
        } else {
          // Element is leaving view - add exit animation
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Load gallery image with elegant reveal animation
  loadGalleryImage(element, imageUrl) {
    const placeholder = element.querySelector('.image-placeholder');
    const placeholderContent = element.querySelector('.placeholder-content');
    
    if (!placeholder) return;

    // Create image element
    const img = new Image();
    img.onload = () => {
      // Fade out placeholder content first
      if (placeholderContent) {
        placeholderContent.style.opacity = '0';
        placeholderContent.style.transform = 'scale(0.8)';
      }
      
      setTimeout(() => {
        // Clear placeholder and add image
        placeholder.innerHTML = '';
        placeholder.appendChild(img);
        placeholder.classList.remove('loading');
        placeholder.classList.add('image-reveal');
        
        // Elegant reveal animation - blur to focus
        img.style.opacity = '0';
        img.style.transform = 'scale(1.05)';
        img.style.filter = 'blur(10px)';
        
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
          img.style.filter = 'blur(0px)';
        }, 100);
      }, 300); // Wait for placeholder fade out
    };
    
    img.onerror = () => {
      // Show elegant error state
      placeholder.classList.remove('loading');
      placeholder.classList.add('image-error');
      if (placeholderContent) {
        placeholderContent.innerHTML = '<i class="fas fa-image-slash"></i>';
      }
    };
    
    img.src = imageUrl;
    img.alt = element.querySelector('.image-caption')?.textContent || 'Gallery image';
  }

  // Typing Animation for Role Title
  initTypingAnimation() {
    const typewriter = document.getElementById('typewriter');
    const cursor = document.getElementById('cursor');
    
    if (!typewriter || !cursor) return;
    
    const roles = [
      'Software Developer',
      'Data Analyst', 
      'Dessert Connoisseur',
      'Software Engineer'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let delayAfterWord = false;
    
    const typeSpeed = 40;      // Speed when typing  
    const deleteSpeed = 25;    // Speed when deleting
    const delayBetweenRoles = 300;  // Pause between words
    
    function type() {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting && currentCharIndex < currentRole.length) {
        // Typing forward
        typewriter.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(type, typeSpeed);
        
      } else if (isDeleting && currentCharIndex > 0) {
        // Deleting backward
        typewriter.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(type, deleteSpeed);
        
      } else if (!isDeleting && currentCharIndex === currentRole.length) {
        // Finished typing current role
        if (currentRoleIndex === roles.length - 1) {
          // Final role (Software Engineer) - stop here, don't delete
          return;
        } else {
          // Not final role - start deleting after delay
          delayAfterWord = true;
          setTimeout(() => {
            delayAfterWord = false;
            isDeleting = true;
            type();
          }, delayBetweenRoles);
        }
        
      } else if (isDeleting && currentCharIndex === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        currentRoleIndex++;
        
        // Small delay before starting next word
        setTimeout(type, 150);
      }
    }
    
    // Start typing after initial delay to let other animations settle
    setTimeout(() => {
      type();
    }, 3000); // Start after startup animation completes
  }
}

// Initialize the portfolio website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioWebsite();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.about-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add click effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const rippleCSS = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = rippleCSS;
  document.head.appendChild(style);
});

// Add Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join() === konamiSequence.join()) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
      style.remove();
    }, 2000);
    
    konamiCode = [];
  }
});

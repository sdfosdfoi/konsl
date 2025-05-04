// Main JS file
document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  // Scroll event listener for header
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when a link is clicked
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal-text');
  const revealOnScroll = function() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('visible');
      }
    }
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check on page load
  
  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      if (!name.value.trim()) {
        highlightError(name);
        isValid = false;
      } else {
        removeError(name);
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        highlightError(email);
        isValid = false;
      } else {
        removeError(email);
      }
      
      if (!message.value.trim()) {
        highlightError(message);
        isValid = false;
      } else {
        removeError(message);
      }
      
      if (isValid) {
        // Form is valid, here you would normally submit data
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Message Sent!';
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2000);
        }, 1500);
      }
    });
  }
  
  function highlightError(element) {
    element.style.borderColor = 'var(--color-error)';
    const label = element.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.style.color = 'var(--color-error)';
    }
  }
  
  function removeError(element) {
    element.style.borderColor = '';
    const label = element.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.style.color = '';
    }
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
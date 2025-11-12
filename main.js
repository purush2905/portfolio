// ================================================
// PORTFOLIO WEBSITE JAVASCRIPT
// Pure Vanilla JS - No Frameworks
// ================================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initProjectFilters();
  initProjectDetails();
  initContactForm();
  initCurrentYear();
  initSmoothScroll();
});

// ================================================
// MOBILE MENU
// ================================================

function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}

// ================================================
// SMOOTH SCROLLING
// ================================================

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for sticky nav
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function initSmoothScroll() {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    });
  });
}

// ================================================
// PROJECT FILTERING
// ================================================

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.tab-trigger');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      filterProjects(filter);
    });
  });
}

function filterProjects(category) {
  // Update active tab
  const tabs = document.querySelectorAll('.tab-trigger');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-filter') === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Filter projects
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(project => {
    const projectCategory = project.getAttribute('data-category');
    
    if (category === 'all' || projectCategory === category) {
      project.style.display = 'flex';
      // Fade in animation
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'scale(1)';
      }, 10);
    } else {
      project.style.opacity = '0';
      project.style.transform = 'scale(0.95)';
      setTimeout(() => {
        project.style.display = 'none';
      }, 200);
    }
  });
}

// ================================================
// PROJECT DETAILS TOGGLE
// ================================================

function initProjectDetails() {
  const toggleButtons = document.querySelectorAll('.toggle-details');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.project-card');
      const details = card.querySelector('.project-details');
      const detailsText = this.querySelector('.details-text');
      const isExpanded = details.classList.contains('show');
      
      if (isExpanded) {
        // Collapse
        details.classList.remove('show');
        this.classList.remove('expanded');
        detailsText.textContent = 'View Details';
      } else {
        // Expand
        details.classList.add('show');
        this.classList.add('expanded');
        detailsText.textContent = 'Show Less';
      }
    });
  });
}

// ================================================
// CONTACT FORM
// ================================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleContactSubmit(this);
    });
  }
}

function handleContactSubmit(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submit-text');
  const formData = new FormData(form);
  
  // Get form values
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitText.textContent = 'Sending...';
  
  // Simulate form submission (in a real app, this would send to a server)
  setTimeout(() => {
    // Show success message
    showToast('Message sent!', 'Thank you for your message. I\'ll get back to you soon.');
    
    // Reset form
    form.reset();
    
    // Re-enable button
    submitButton.disabled = false;
    submitText.textContent = 'Send Message';
    
    // Log the submission (for demonstration)
    console.log('Form submitted:', { name, email, message });
  }, 1000);
}

// ================================================
// TOAST NOTIFICATIONS
// ================================================

function showToast(title, description) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `;
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'card';
  toast.style.cssText = `
    min-width: 300px;
    max-width: 400px;
    padding: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  `;
  
  toast.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
      <div>
        <div style="font-weight: 600; margin-bottom: 0.25rem;">${title}</div>
        <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${description}</div>
      </div>
      <button onclick="this.closest('.card').remove()" style="color: hsl(var(--muted-foreground)); padding: 0.25rem; cursor: pointer; background: none; border: none; font-size: 1.25rem; line-height: 1;">
        ×
      </button>
    </div>
  `;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  if (!document.getElementById('toast-styles')) {
    style.id = 'toast-styles';
    document.head.appendChild(style);
  }
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// ================================================
// CURRENT YEAR
// ================================================

function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Debounce function for performance
function debounce(func, wait) {
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

// Scroll to top function (if needed)
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add scroll indicator on scroll (optional enhancement)
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add/remove shadow to nav on scroll
  const nav = document.querySelector('nav');
  if (nav) {
    if (scrollTop > 0) {
      nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }
  
  lastScrollTop = scrollTop;
}, 10));

// ================================================
// PERFORMANCE OPTIMIZATIONS
// ================================================

// Lazy load images (optional - already handled by browser)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ================================================
// EXPORTS (for potential future use)
// ================================================

window.scrollToSection = scrollToSection;
window.closeMobileMenu = closeMobileMenu;
window.filterProjects = filterProjects;

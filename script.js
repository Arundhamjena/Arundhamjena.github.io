// Portfolio Enhancement JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger skill bar animations when skills section comes into view
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations when about section comes into view
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade elements
    const fadeElements = document.querySelectorAll('.fade-element');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Animated counters for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            updateCounter();
        });
    }

    // Skills progress bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage');
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, index * 200); // Stagger the animations
        });
    }

    // Profile image interactive effects
    const profileImage = document.querySelector('.face');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
        });

        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // Add click effect
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(-5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        });
    }

    // Enhanced text highlighting
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.textShadow = '3px 3px 6px rgba(0,0,0,0.3)';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.2s ease';
        });

        highlight.addEventListener('mouseleave', function() {
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            this.style.transform = 'scale(1)';
        });
    });

    // Dynamic background particles for hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (3 + Math.random() * 4) + 's';
            hero.appendChild(particle);
        }
    }

    // Contact form enhancements
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on page load
        if (input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
            
            // Remove focused class from all form groups
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            border-radius: 5px;
            z-index: 3000;
            transform: translateX(300px);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Scroll-based effects
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update active navigation
        updateActiveNav();
        
        // Navbar hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
        
        lastScrollTop = scrollTop;
    });

    // Loading animation
    function showLoadingAnimation() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    // Typing animation for hero text (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        const originalHTML = element.innerHTML;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    const tagEnd = text.indexOf('>', i);
                    element.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        
        setTimeout(() => {
            type();
        }, 1000);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Navigate sections with arrow keys
        if (e.altKey) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                window.scrollBy(0, window.innerHeight);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                window.scrollBy(0, -window.innerHeight);
            }
        }
        
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="flex"]');
            if (openModal) {
                const modalId = openModal.id.replace('modal-', '');
                closeProjectModal(modalId);
            }
        }
    });

    // ===== NEW: Make About stats keyboard-activatable =====
    const statItems = document.querySelectorAll('.stat-item[data-modal]');
    statItems.forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const id = item.getAttribute('data-modal');
                openProjectModal(id);
            }
        });
    });

    // Initialize everything
    function init() {
        showLoadingAnimation();
        createParticles();
        // Optional typing effect
        // const mainHeading = document.querySelector('.hero h1');
        // if (mainHeading) typeWriter(mainHeading, mainHeading.innerHTML, 50);
    }

    // Start initialization
    init();

    // Console welcome message
    console.log(`
    🚀 Welcome to Arundham Jena's Portfolio!
    
    Built with modern web technologies:
    • HTML5 & CSS3
    • Vanilla JavaScript
    • Responsive Design
    • Smooth Animations
    
    Thanks for checking out the code!
    If you're a recruiter or fellow developer,
    feel free to reach out!
    `);
});

// Project Modal Functions (Global scope for onclick handlers)
function openProjectModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.3s ease';
        document.body.style.overflow = 'hidden';
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal(projectId);
            }
        });
    }
}

function closeProjectModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Utility Functions
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

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Theme toggle (optional feature for future enhancement)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Intersection Observer for lazy loading images (future enhancement)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Google Analytics or other tracking code would go here
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Add event tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('CTA', 'click', 'Primary Button');
    }
    if (e.target.classList.contains('project-card')) {
        trackEvent('Project', 'view', 'Project Modal');
    }
});

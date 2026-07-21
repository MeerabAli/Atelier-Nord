/**
 * ATELIER NORD — Premium Architecture Studio
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initSidebar();
    initSmoothScroll();
    initRevealAnimations();
    initParallax();
    initCounters();
    initProjectFilter();
    initFAQ();
    initNewsletter();
    initContactForm();
    initArchitecturalGrid();
});

/**
 * Custom Cursor
 */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Slower follow for follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

/**
 * Sidebar Navigation
 */
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !sidebar) return;
    
    function openSidebar() {
        menuToggle.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebarMenu() {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    menuToggle.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    
    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebarMenu);
    });
    
    // Close on outside click
    sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar) {
            closeSidebarMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarMenu();
        }
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Reveal Animations on Scroll
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Parallax Effect
 */
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (parallaxLayers.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * Animated Counters
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Project Filter
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.masonry-item, .project-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Newsletter Form
 */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = '#4CAF50';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1500);
    });
}

/**
 * Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = '#4CAF50';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 2000);
    });
}

/**
 * Architectural Grid Animation
 */
function initArchitecturalGrid() {
    const grid = document.getElementById('archGrid');
    
    if (!grid) return;
    
    // Create grid lines
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.background = 'rgba(255,255,255,0.05)';
        
        if (i % 2 === 0) {
            line.style.width = '100%';
            line.style.height = '1px';
            line.style.top = `${i * 5}%`;
            line.style.left = '0';
        } else {
            line.style.width = '1px';
            line.style.height = '100%';
            line.style.left = `${i * 5}%`;
            line.style.top = '0';
        }
        
        grid.appendChild(line);
    }
}

/**
 * Page Transition (if needed for SPA behavior)
 */
function handlePageTransition() {
    const body = document.body;
    body.style.opacity = '0';
    
    setTimeout(() => {
        body.style.transition = 'opacity 0.5s ease';
        body.style.opacity = '1';
    }, 100);
}

// Handle browser back/forward
window.addEventListener('popstate', handlePageTransition);

/**
 * Lazy Loading Images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Performance Optimization: Debounce
 */
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

/**
 * Handle Window Resize
 */
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent features
}, 250));

/**
 * Console Branding
 */
console.log('%c ATELIER NORD ', 'background: #2E2E2E; color: #F7F5F2; font-size: 20px; padding: 10px;');
console.log('%c Designing spaces beyond imagination ', 'color: #A48D73; font-style: italic;');
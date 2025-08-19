// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.innerHTML = '<span class="loading"></span> Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = '✓ Quote Sent!';
            button.style.background = '#10b981';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }, 2000);
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .service-card, .reason-item, .cert-item, .team-member, .value-item, .advisor-item, .testimonial-card, .additional-item, .process-step, .mv-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Statistics counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
    }, 20);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-item h3').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Add active class to current page navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Keyboard navigation support
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//         hamburger.classList.remove('active');
//         navMenu.classList.remove('active');
//     }
// });

// Service card hover effects
document.querySelectorAll('.service-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Trust banner scroll effect
// window.addEventListener('scroll', () => {
//     const trustBanner = document.querySelector('.trust-banner');
//     if (trustBanner) {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * -0.2;
//         trustBanner.style.transform = `translateY(${rate}px)`;
//     }
// });

// Add loading states for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Testimonial carousel effect (simple)
// document.addEventListener('DOMContentLoaded', () => {
//     const testimonials = document.querySelectorAll('.testimonial-card');
//     let currentTestimonial = 0;
    
//     if (testimonials.length > 0) {
//         setInterval(() => {
//             testimonials[currentTestimonial].style.opacity = '0.7';
//             currentTestimonial = (currentTestimonial + 1) % testimonials.length;
//             testimonials[currentTestimonial].style.opacity = '1';
//         }, 5000);
//     }
// });

// Testimonial carousel effect (scale + reset)
document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0) {
        testimonials[currentTestimonial].classList.add('active'); // first card active

        setInterval(() => {
            // remove active from current
            testimonials[currentTestimonial].classList.remove('active');
            
            // go to next
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            
            // add active to new
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);
    }
});



// Process steps animation
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        processObserver.observe(step);
    });
});

console.log('SecureGuard Pro website loaded successfully!');
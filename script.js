async function loadComponent(id, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component from ${path}:`, error);
    }
}

// Entry point
import { initNavbar } from './components/navbar/navbar.js';
import { initHero } from './components/hero/hero.js';
import { initContact } from './components/contact/contact.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Load components sequentially or in parallel
    await Promise.all([
        loadComponent('app-navbar', './components/navbar/navbar.html'),
        loadComponent('app-hero', './components/hero/hero.html'),
        loadComponent('app-about', './components/about/about.html'),
        loadComponent('app-skills', './components/skills/skills.html'),
        loadComponent('app-projects', './components/projects/projects.html'),
        loadComponent('app-experience', './components/experience/experience.html'),
        loadComponent('app-contact', './components/contact/contact.html'),
        loadComponent('app-footer', './components/footer/footer.html')
    ]);

    // Initialize logic after HTML is loaded
    initNavbar();
    initHero();
    initContact();

    // Smooth scroll for all anchor links with custom easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const progressPercentage = Math.min(progress / duration, 1);
                    
                    // Easing function: easeInOutCubic
                    const easing = progressPercentage < 0.5
                        ? 4 * progressPercentage * progressPercentage * progressPercentage
                        : 1 - Math.pow(-2 * progressPercentage + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * easing);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            }
        });
    });

    // Global Scroll Reveal using Intersection Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    const initReveals = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => revealObserver.observe(el));
    };

    initReveals(); // Initial call after components load

    // Custom Cursor Logic
    const initCustomCursor = () => {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        
        if (!dot || !outline) return;

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor on first move
            dot.style.opacity = '1';
            outline.style.opacity = '1';

            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Smooth outline follow
        const animateOutline = () => {
            const distX = mouseX - outlineX;
            const distY = mouseY - outlineY;

            outlineX = outlineX + distX * 0.15;
            outlineY = outlineY + distY * 0.15;

            outline.style.left = outlineX + 'px';
            outline.style.top = outlineY + 'px';

            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Hover effects using event delegation for dynamic content
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .btn, .menu-toggle')) {
                document.body.classList.add('cursor-hover');
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .btn, .menu-toggle')) {
                document.body.classList.remove('cursor-hover');
            }
        });
    };

    initCustomCursor();
});

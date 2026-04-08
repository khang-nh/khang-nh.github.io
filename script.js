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

    // Global Scroll Reveal (needs to run after all components are in DOM)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});

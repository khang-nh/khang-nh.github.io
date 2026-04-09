export const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const navClose = document.querySelector('.nav-close');
    
    if (menuToggle && navLinks && navOverlay) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);
        if (navClose) navClose.addEventListener('click', closeMenu);

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
};

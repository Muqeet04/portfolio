document.addEventListener('DOMContentLoaded', () => {

    /* -------- CUSTOM CURSOR -------- */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Only enable custom cursor if it's a non-touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add a slight lag to the outline for a smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effects for links and buttons
        const interactables = document.querySelectorAll('a, button, .hover-lift');

        interactables.forEach(interactive => {
            interactive.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
            });

            interactive.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    /* -------- NAVBAR SCROLL EFFECT -------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* -------- MOBILE MENU TOGGLE -------- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    /* -------- SCROLL ANIMATIONS (Intersection Observer) -------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    /* -------- ACTIVE LINK HIGHLIGHTING ON SCROLL -------- */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset to account for sticky navbar
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

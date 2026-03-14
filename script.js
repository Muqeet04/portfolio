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

                // Reset magnetic effect if applied
                if (interactive.classList.contains('magnetic')) {
                    interactive.style.transform = 'translate(0px, 0px)';
                }
            });

            // Magnetic effect for specific buttons/links
            if (interactive.classList.contains('magnetic')) {
                interactive.addEventListener('mousemove', (e) => {
                    const rect = interactive.getBoundingClientRect();
                    const h = rect.width / 2;
                    const v = rect.height / 2;
                    const x = e.clientX - rect.left - h;
                    const y = e.clientY - rect.top - v;

                    interactive.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                });
            }
        });
    }

    /* -------- SCROLL PROGRESS BAR -------- */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

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

    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-bottom, .zoom-in, .slide-up');
    fadeElements.forEach(el => observer.observe(el));

    /* -------- 3D CARD TILT EFFECT (Bonus) -------- */
    const cards = document.querySelectorAll('.glass-card');

    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;

                // Push inner elements more on hover
                const children = card.querySelectorAll(':scope > *');
                children.forEach(child => {
                    child.style.transform = `translateZ(60px)`;
                });

                card.style.transform = `perspective(1000px) scale3d(1.05, 1.05, 1.05) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                const children = card.querySelectorAll(':scope > *');
                children.forEach(child => {
                    child.style.transform = `translateZ(30px)`;
                });
                card.style.transform = '';
            });
        });
    }

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

    /* -------- 3D BACKGROUND (THREE.JS) -------- */
    const initThreeJS = () => {
        const canvas = document.getElementById('canvas-3d');
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x02000a, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        const color1 = new THREE.Color(0x00ff66);
        const color2 = new THREE.Color(0x00f0ff);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            const r = 40 + Math.random() * 20;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            posArray[i] = r * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = r * Math.cos(phi);

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colorsArray[i] = mixedColor.r;
            colorsArray[i + 1] = mixedColor.g;
            colorsArray[i + 2] = mixedColor.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Add 3D Wireframe Shapes
        const shapeGroup = new THREE.Group();

        const geo1 = new THREE.IcosahedronGeometry(8, 1);
        const mat1 = new THREE.MeshBasicMaterial({ color: 0x00ff66, wireframe: true, transparent: true, opacity: 0.15 });
        const shape1 = new THREE.Mesh(geo1, mat1);
        shape1.position.set(-18, 8, -10);
        shapeGroup.add(shape1);

        const geo2 = new THREE.TorusKnotGeometry(6, 1.5, 100, 16);
        const mat2 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.15 });
        const shape2 = new THREE.Mesh(geo2, mat2);
        shape2.position.set(18, -8, -15);
        shapeGroup.add(shape2);

        scene.add(shapeGroup);

        // Mouse Parallax Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;

            particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

            shape1.rotation.x = elapsedTime * 0.2;
            shape1.rotation.y = elapsedTime * 0.3;

            shape2.rotation.x = elapsedTime * 0.3;
            shape2.rotation.y = elapsedTime * 0.2;

            shapeGroup.position.x += (mouseX * 0.01 - shapeGroup.position.x) * 0.05;
            shapeGroup.position.y += (-mouseY * 0.01 - shapeGroup.position.y) * 0.05;

            renderer.render(scene, camera);
        };

        animate();
    };

    initThreeJS();
});

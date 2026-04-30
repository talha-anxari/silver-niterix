 // ── Loader ──
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1800);
        });

        // ── Cursor ──
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        let rx = 0, ry = 0, mx = 0, my = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
        });
        (function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * .12;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(animRing);
        })();

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.6)');
            el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
        });

        // ── Stars ──
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 80; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;--delay:${Math.random() * 4}s`;
            starsContainer.appendChild(s);
        }

        // ── Navbar scroll ──
        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
        });

        // ── Scroll reveal ──
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));


        // navbar

        // Get elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    // ── Navbar scroll effect ──
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ── Toggle mobile menu function ──
    function toggleMenu() {
        const isOpen = hamburger.classList.contains('active');
        
        if (!isOpen) {
            // Open menu
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
            body.classList.add('menu-open');
        } else {
            // Close menu
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    // ── Close menu function ──
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Event listeners for menu toggle
    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a nav link (smooth scroll)
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close menu if open (on mobile)
            if (window.innerWidth <= 968) {
                closeMenu();
            }
            
            // Smooth scroll to section
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize - reset menu state if resizing to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 968) {
                // Reset menu state on desktop
                closeMenu();
                // Ensure nav-links have correct desktop styles
                navLinks.style.display = 'flex';
                navLinks.style.right = '';
            } else {
                // On mobile, ensure menu is closed when resizing
                closeMenu();
            }
        }, 250);
    });

    // Optional: Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').substring(1);
            if (href === current) {
                item.style.color = 'var(--gold)';
                // Add active class styling
                const pseudo = document.createElement('style');
                if (!document.querySelector('#active-nav-style')) {
                    pseudo.id = 'active-nav-style';
                    pseudo.textContent = `.nav-links a.active::after { width: 100%; }`;
                    document.head.appendChild(pseudo);
                }
                item.classList.add('active');
            } else {
                item.style.color = '';
                item.classList.remove('active');
            }
        });
    });
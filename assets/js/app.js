// ─────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1800);
    }
});


// ─────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let rx = 0,
    ry = 0,
    mx = 0,
    my = 0;

if (cursor && ring) {

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;

        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;

        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';

        requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button').forEach(el => {

        el.addEventListener('mouseenter', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
        });

        el.addEventListener('mouseleave', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
        });

    });
}


// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
const starContainer = document.getElementById('stars');

if (starContainer) {

    for (let i = 0; i < 80; i++) {

        const s = document.createElement('div');

        s.className = 'star';

        s.style.cssText = `
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            --d:${2 + Math.random() * 4}s;
            --delay:${Math.random() * 4}s;
        `;

        starContainer.appendChild(s);
    }
}


// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;


// ─────────────────────────────────────────────
// NAVBAR SCROLL EFFECT
// ─────────────────────────────────────────────
window.addEventListener('scroll', () => {

    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

});


// ─────────────────────────────────────────────
// TOGGLE MENU
// ─────────────────────────────────────────────
function toggleMenu() {

    if (!hamburger || !navLinks || !menuOverlay) return;

    const isOpen = hamburger.classList.contains('active');

    if (!isOpen) {

        hamburger.classList.add('active');
        navLinks.classList.add('active');
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');

    } else {

        closeMenu();
    }
}


// ─────────────────────────────────────────────
// CLOSE MENU
// ─────────────────────────────────────────────
function closeMenu() {

    if (!hamburger || !navLinks || !menuOverlay) return;

    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
}


// ─────────────────────────────────────────────
// MENU EVENTS
// ─────────────────────────────────────────────
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}


// ─────────────────────────────────────────────
// SMOOTH SCROLL
// ─────────────────────────────────────────────
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {

    link.addEventListener('click', (e) => {

        const targetId = link.getAttribute('href');

        // ONLY HANDLE SAME PAGE HASH LINKS
        if (targetId.startsWith('#')) {

            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            if (window.innerWidth <= 968) {
                closeMenu();
            }

            if (targetSection) {

                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// ─────────────────────────────────────────────
// WINDOW RESIZE
// ─────────────────────────────────────────────
let resizeTimer;

window.addEventListener('resize', () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        if (window.innerWidth > 968) {

            closeMenu();

            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.style.right = '';
            }

        } else {

            closeMenu();
        }

    }, 250);

});


// ─────────────────────────────────────────────
// ESC KEY CLOSE MENU
// ─────────────────────────────────────────────
document.addEventListener('keydown', (e) => {

    if (
        e.key === 'Escape' &&
        hamburger &&
        hamburger.classList.contains('active')
    ) {
        closeMenu();
    }

});


// ─────────────────────────────────────────────
// ACTIVE NAV LINK
// ─────────────────────────────────────────────
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {

    let current = '';

    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            current = section.getAttribute('id');
        }

    });

    navItems.forEach(item => {

        item.classList.remove('active');
        item.style.color = '';

        const href = item.getAttribute('href');

        // ONLY HANDLE HASH LINKS
        if (href.startsWith('#')) {

            const cleanHref = href.substring(1);

            if (cleanHref === current) {

                item.classList.add('active');
                item.style.color = 'var(--gold)';
            }
        }
    });

});


// ─────────────────────────────────────────────
// REVEAL ON SCROLL
// ─────────────────────────────────────────────
const reveals = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
);

if (reveals.length > 0) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));
}


// ─────────────────────────────────────────────
// FANCYBOX
// ─────────────────────────────────────────────
if (typeof Fancybox !== 'undefined') {

    Fancybox.bind('[data-fancybox="gallery"]', {

        animated: true,

        showClass: "fancybox-zoomIn",
        hideClass: "fancybox-zoomOut",

        Thumbs: {
            type: "classic",
        },

        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["slideshow", "thumbs", "close"],
            },
        },

        Images: {
            zoom: true,
        },

        Carousel: {
            transition: "fade",
        },

    });

}


/* ========================================
       MUSIC PLAYER — works for multiple cards
       Each card is fully independent
    ======================================== */
 
    document.querySelectorAll('.song-card').forEach(card => {
      const audioSrc  = card.dataset.src;
      const audio     = new Audio(audioSrc);
 
      const fillEl      = card.querySelector('[data-fill]');
      const currentEl   = card.querySelector('[data-current]');
      const totalEl     = card.querySelector('[data-total]');
      const durationEl  = card.querySelector('[data-duration]');
      const seekTrack   = card.querySelector('[data-seek]');
      const playPauseBtn= card.querySelector('[data-playpause]');
      const artPlayBtn  = card.querySelector('.art-play-btn');
      const rewindBtn   = card.querySelector('[data-rewind]');
      const forwardBtn  = card.querySelector('[data-forward]');
      const muteBtn     = card.querySelector('[data-mute]');
      const volSlider   = card.querySelector('[data-volume]');
 
      const allPlayIcons  = card.querySelectorAll('.icon-play');
      const allPauseIcons = card.querySelectorAll('.icon-pause');
 
      /* ---- Helpers ---- */
      function fmt(s) {
        if (isNaN(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
      }
 
      function setPlayState(playing) {
        allPlayIcons.forEach(i  => i.style.display = playing ? 'none' : '');
        allPauseIcons.forEach(i => i.style.display = playing ? '' : 'none');
        card.classList.toggle('is-playing', playing);
      }
 
      /* ---- Metadata ---- */
      audio.addEventListener('loadedmetadata', () => {
        totalEl.textContent    = fmt(audio.duration);
        durationEl.textContent = fmt(audio.duration);
      });
 
      /* ---- Time update ---- */
      audio.addEventListener('timeupdate', () => {
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        fillEl.style.width     = pct + '%';
        currentEl.textContent  = fmt(audio.currentTime);
      });
 
      /* ---- Ended ---- */
      audio.addEventListener('ended', () => setPlayState(false));
 
      /* ---- Play / Pause ---- */
      function togglePlay() {
        if (audio.paused) {
          audio.play();
          setPlayState(true);
        } else {
          audio.pause();
          setPlayState(false);
        }
      }
 
      playPauseBtn.addEventListener('click', togglePlay);
      artPlayBtn.addEventListener('click', togglePlay);
 
      /* ---- Seek ---- */
      seekTrack.addEventListener('click', e => {
        const rect = seekTrack.getBoundingClientRect();
        const pct  = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
      });
 
      /* ---- Rewind / Forward ---- */
      rewindBtn.addEventListener('click',  () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
      forwardBtn.addEventListener('click', () => { audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); });
 
      /* ---- Volume ---- */
      volSlider.addEventListener('input', () => {
        audio.volume = volSlider.value;
        const muted  = audio.volume === 0;
        card.querySelector('.icon-vol').style.display    = muted ? 'none' : '';
        card.querySelector('.icon-muted').style.display  = muted ? '' : 'none';
      });
 
      muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        card.querySelector('.icon-vol').style.display    = audio.muted ? 'none' : '';
        card.querySelector('.icon-muted').style.display  = audio.muted ? '' : 'none';
      });
    });
 
    /* ---- Reveal on scroll ---- */
    const reveales = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveales.forEach(el => obs.observe(el));



     /* ===== STARS ===== */
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 120; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        --dur: ${(Math.random() * 3 + 2).toFixed(1)}s;
        --op: ${(Math.random() * 0.5 + 0.2).toFixed(2)};
        animation-delay: ${(Math.random() * 4).toFixed(1)}s;
      `;
      starsContainer.appendChild(star);
    }
 
const bookSwiper = new Swiper('.books_swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 900,
    centeredSlides: true,

    effect: 'fade',

    fadeEffect: {
        crossFade: true
    },

    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }

});

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    navbar.classList.remove('menu-open');
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = navMenu.classList.toggle('open');
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open);
        navbar.classList.toggle('menu-open', open);
    });
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMenu();
        }
    });
}

// Mobile sub-menu toggles (Services mega menu + Industries dropdown)
document.querySelectorAll('.has-mega > .nav-link, .has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth > 980) return;
        e.preventDefault();
        const item = link.closest('.nav-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.has-mega, .has-dropdown').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// Stats tabs highlight on click
document.querySelectorAll('.stats-tabs .tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.stats-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
}

// Client Video Reviews carousel
const csCards = [
    {
        video: './video/cheng.mp4',
        review: '"Impressive team, fast execution, and growth-driven strategies delivering exceptional content consistently."',
        name: 'Randy Cheng',
        designation: 'Founder & CEO, Collab Management Group'
    },
    {
        video: './video/seth.mp4',
        review: '"Exceptional dedication, attentiveness, and productivity make WhiteBunnie a reliable growth partner."',
        name: 'Seth Kleinman',
        designation: 'Co-Founder, Go Remote Cr'
    },
    {
        video: './video/Christina.mp4',
        review: '"Their team invested deeply in our growth. The performance was beyond what we expected."',
        name: 'Christina',
        designation: 'Co-Founder, Segwise.ai'
    },
    {
        video: './newHome/Testimonial.mp4',
        review: '"Consistently delivering returns while saving our time. That\'s White Bunnie for you."',
        name: 'Adarsh Menon',
        designation: 'Partner, Fireside Ventures | ex-CXO, Flipkart'
    }
];
let csPage = 0; 
const csPerPage = 3;
const csTotal = csCards.length;
const csTotalPages = Math.ceil(csTotal / csPerPage);
const csTrack = document.getElementById('csTrack');

// Build all pages upfront so sliding works
if (csTrack) {
    const pages = [];
    for (let pi = 0; pi < csTotal; pi += csPerPage) {
        pages.push(csCards.slice(pi, pi + csPerPage));
    }
    csTrack.innerHTML = pages.map(page => `
			<div class="cs-page">
				${page.map(c => `
					<article class="cs-card">
						<div class="cs-video-wrap">
							<video src="${c.video}" autoplay muted loop playsinline></video>
						</div>
						<div class="cs-body">
							<p class="cs-review-quote">${c.review}</p>
							<div class="cs-reviewer">
								<span class="cs-reviewer-name">${c.name}</span>
								<span class="cs-reviewer-desig">${c.designation}</span>
							</div>
						</div>
					</article>
				`).join('')}
			</div>
		`).join('');
}

function renderCS() {
    const countEl = document.getElementById('csCount');
    if (!csTrack) return;
    const start = csPage * csPerPage;
    const end = Math.min(start + csPerPage, csTotal);
    countEl.textContent = (start + 1) + ' - ' + end + ' of ' + csTotal;
    csTrack.style.transform = `translateX(-${csPage * 100}%)`;
}

document.getElementById('csNext')?.addEventListener('click', () => {
    if (csPage < csTotalPages - 1) { csPage++; renderCS(); }
});
document.getElementById('csPrev')?.addEventListener('click', () => {
    if (csPage > 0) { csPage--; renderCS(); }
});
renderCS();

// Contact form submit placeholder
const auditForm = document.getElementById('auditForm');
if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = auditForm.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Request Received! We\'ll be in touch within 24 hrs.';
            btn.style.background = '#00C97A';
        }, 1200);
    });
}

/* Reads everything from the HTML above — no content stored here. */
(function () {
    const stage = document.getElementById("wbtc-stage");
    if (!stage) return;
    const slides = Array.from(stage.querySelectorAll(".wbtc-slide"));
    const dotsWrap = document.getElementById("wbtc-dots");
    const cardsWrap = document.getElementById("wbtc-cards");
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const DURATION = 6000;
    const SIL = '<svg class="wbtc-ph" viewBox="0 0 24 24" fill="#94A3B8"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6Z"/></svg>';
    const stars = r => "â˜…".repeat(r) + "â˜†".repeat(5 - r);

    // const tabIcon = '<span class="wbtc-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 6.75v10.5a.75.75 0 0 0 1.14.64l8.25-5.25a.75.75 0 0 0 0-1.28L9.14 6.11A.75.75 0 0 0 8 6.75Z"/></svg></span>';

    let i = 0, timer = null, dir = 1;
    cardsWrap.setAttribute("role", "tablist");
    cardsWrap.setAttribute("aria-label", "Client testimonial tabs");

    slides.forEach((slide, idx) => {
        const name = slide.dataset.name, role = slide.dataset.role,
            company = slide.dataset.company, loc = slide.dataset.location,
            rating = parseInt(slide.dataset.rating || "5", 10),
            href = slide.dataset.href || "#", photo = slide.dataset.photo || "";

        slide.querySelector(".wbtc-ghost-name").textContent = name;
        slide.querySelector(".wbtc-label").innerHTML = role + " &mdash; " + company;
        slide.querySelector(".wbtc-pill").textContent = loc;
        slide.querySelector(".wbtc-cta").setAttribute("href", href);

        // Inject YouTube play icon into the play button
        const playBtn = slide.querySelector(".wbtc-play");
        if (playBtn) {
            playBtn.innerHTML = '<svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74 0 13.05 0 24 0 24s0 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C68 34.95 68 24 68 24S68 13.05 66.52 7.74z" fill="#FF0000"/><path d="M45 24 27 14v20" fill="#fff"/></svg>';
        }

        const photoEl = slide.querySelector(".wbtc-photo");
        const phEl = slide.querySelector(".wbtc-placeholder");
        if (photo) { photoEl.style.backgroundImage = "url('" + photo + "')"; phEl.style.display = "none"; }
        else { photoEl.style.display = "none"; }

        slide._stats = Array.from(slide.querySelectorAll(".wbtc-num")).map(n => n.textContent.trim());

        const dot = document.createElement("button");
        dot.className = "wbtc-dot"; dot.setAttribute("aria-label", "Slide " + (idx + 1));
        dot.onclick = () => { dir = idx >= i ? 1 : -1; go(idx); resetTimer(); };
        dotsWrap.appendChild(dot);

        const card = document.createElement("button");
        card.className = "wbtc-card";
        card.type = "button";
        card.setAttribute("role", "tab");
        const thumb = photo
            ? '<div class="wbtc-thumb" style="background-image:url(\'' + photo + '\')"></div>'
            : '<div class="wbtc-thumb">' + SIL + '</div>';
        const tabRole = [role, company].filter(Boolean).join(", ");
        card.innerHTML = thumb +
            '<div class="wbtc-card-meta">' +
            '<div class="wbtc-c-name">' + name + '</div>' +
            '<div class="wbtc-c-role">' + tabRole + '</div>' +
            '<div class="wbtc-stars">' + stars(rating) + '</div>' +
            '</div>';
        card.onclick = () => { dir = idx >= i ? 1 : -1; go(idx); resetTimer(); };
        cardsWrap.appendChild(card);
    });

    function countUp(node, raw) {
        if (reduce) { node.textContent = raw; return; }
        const m = raw.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
        if (!m) { node.textContent = raw; return; }
        const prefix = m[1], target = parseFloat(m[2]), suffix = m[3];
        const dec = (m[2].split(".")[1] || "").length, dur = 900, start = performance.now();
        (function f(now) {
            const t = Math.min((now - start) / dur, 1); const e = 1 - Math.pow(1 - t, 3);
            node.textContent = prefix + (target * e).toFixed(dec) + suffix;
            if (t < 1) requestAnimationFrame(f); else node.textContent = raw;
        })(start);
    }

    function render() {
        slides.forEach((s, idx) => {
            const on = idx === i;
            s.classList.toggle("wbtc-active", on);
            s.classList.toggle("wbtc-rev", on && dir < 0);
            if (on) {
                void s.offsetWidth;
                s.querySelectorAll(".wbtc-num").forEach((n, k) => countUp(n, s._stats[k]));
            }
        });
        dotsWrap.querySelectorAll(".wbtc-dot").forEach((d, idx) => d.classList.toggle("wbtc-on", idx === i));
        cardsWrap.querySelectorAll(".wbtc-card").forEach((c, idx) => {
            const on = idx === i;
            c.classList.toggle("wbtc-active", on);
            c.setAttribute("aria-selected", on ? "true" : "false");
            c.setAttribute("tabindex", on ? "0" : "-1");
        });
    }
    function go(n) { i = (n + slides.length) % slides.length; render(); }
    function next() { dir = 1; go(i + 1); }
    function prev() { dir = -1; go(i - 1); }
    function start() { if (!reduce) timer = setInterval(next, DURATION); }
    function resetTimer() { clearInterval(timer); start(); }

    document.getElementById("wbtc-next").onclick = () => { next(); resetTimer(); };
    document.getElementById("wbtc-prev").onclick = () => { prev(); resetTimer(); };
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { next(); resetTimer(); }
        if (e.key === "ArrowLeft") { prev(); resetTimer(); }
    });
    stage.addEventListener("mouseenter", () => clearInterval(timer));
    stage.addEventListener("mouseleave", start);

    render(); start();
})();


const wbLogos = [
    "https://whitebunnie.com/wp-content/uploads/2026/04/drupal_logo_icon_170208.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/HubSpot-Logo.wine_.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/Joomla-Logo.wine_.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/nextjs.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/Magento.svg_.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/OpenCart_logo.svg_.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/php.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/shopify-official-logo.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/wordpress-png-logo.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/reactjs.webp",
    "https://whitebunnie.com/wp-content/uploads/2026/04/Webflow_logo_2023.webp"
];

const wbTrack = document.getElementById("wbTrack");

function createWBSlide() {
    const slide = document.createElement("div");
    slide.classList.add("wb-slide-box");

    wbLogos.forEach(src => {
        const logoWrap = document.createElement("div");
        logoWrap.classList.add("wb-logo");

        const img = document.createElement("img");
        img.src = src;
        img.alt = "client-logo";

        logoWrap.appendChild(img);
        slide.appendChild(logoWrap);
    });

    return slide;
}

// Duplicate slides for smooth loop
if (wbTrack) {
    wbTrack.appendChild(createWBSlide());
    wbTrack.appendChild(createWBSlide());
}



(function () {
    'use strict';
    var SLIDE_DUR = 6000;
    var slides = document.querySelectorAll('.ctesti-slide');
    var prog = document.getElementById('ctestiProg');
    var floatTrack = document.getElementById('ctestiFloat');
    var grid = document.getElementById('ctestiGrid');
    if (!slides.length || !prog || !floatTrack || !grid) return;

    var cur = 0, timer = null, isPaused = false;
    var slideStart = Date.now(), pauseStart = 0;

    function restartProg() {
        prog.style.animation = 'none';
        void prog.offsetWidth;
        prog.style.animation = 'ctesti-prog-fill ' + SLIDE_DUR + 'ms linear forwards';
        if (isPaused) prog.style.animationPlayState = 'paused';
    }

    function goTo(idx) {
        slides[cur].classList.remove('active');
        cur = ((idx % slides.length) + slides.length) % slides.length;
        slides[cur].classList.add('active');
        restartProg();
        slideStart = Date.now();
    }

    function scheduleNext(delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            goTo(cur + 1);
            scheduleNext(SLIDE_DUR);
        }, delay);
    }

    grid.addEventListener('mouseenter', function () {
        if (isPaused) return;
        isPaused = true;
        pauseStart = Date.now();
        clearTimeout(timer);
        floatTrack.style.animationPlayState = 'paused';
        prog.style.animationPlayState = 'paused';
    });

    grid.addEventListener('mouseleave', function () {
        if (!isPaused) return;
        isPaused = false;
        var elapsed = pauseStart - slideStart;
        var remaining = Math.max(300, SLIDE_DUR - elapsed);
        slideStart = Date.now() - elapsed;
        floatTrack.style.animationPlayState = 'running';
        prog.style.animationPlayState = 'running';
        scheduleNext(remaining);
    });

    // Init
    restartProg();
    scheduleNext(SLIDE_DUR);
})();




document.addEventListener('DOMContentLoaded', () => {

    const isMobile = () => window.innerWidth < 768;

    /* â”€â”€ Tabs â”€â”€ */
    document.querySelectorAll('.ai-tool').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ai-tool').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.ai-panel').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    /* â”€â”€ Sliders â”€â”€ */
    document.querySelectorAll('.result-slider').forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const dotsWrap = slider.querySelector('.dots-inner');
        let current = 0;
        let mobileItems = []; // flat list of all images for mobile

        /* Collect all slide-items (images) for mobile flat slider */
        function buildMobileSlider() {
            /* Extract all images from slides */
            const allItems = [...slider.querySelectorAll('.slide-item')];
            mobileItems = allItems;
            const total = allItems.length;

            /* Rebuild track: each image becomes its own slide */
            track.innerHTML = '';
            allItems.forEach(item => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                slide.style.minWidth = '100%';
                slide.style.flexShrink = '0';
                const grid = document.createElement('div');
                grid.className = 'slide-grid';
                grid.style.padding = '0 12px';
                grid.appendChild(item.cloneNode(true));
                slide.appendChild(grid);
                track.appendChild(slide);
            });

            /* Build dots */
            dotsWrap.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const d = document.createElement('span');
                d.className = 'dot' + (i === 0 ? ' active' : '');
                dotsWrap.appendChild(d);
            }
            current = 0;
            return total;
        }

        /* Desktop: original slides (pairs of images) */
        function buildDesktopSlider() {
            /* Nothing to rebuild — original HTML stays */
            /* Just count original .slide elements */
            return slider.querySelectorAll('.slide').length;
        }

        let totalSlides;
        let mobileBuilt = false;
        let originalHTML = track.innerHTML; // save original

        function init() {
            current = 0;
            if (isMobile()) {
                if (!mobileBuilt) {
                    mobileItems = [];
                    /* Save original items before rebuilding */
                    originalHTML = track.innerHTML;
                    totalSlides = buildMobileSlider();
                    mobileBuilt = true;
                } else {
                    totalSlides = track.querySelectorAll('.slide').length;
                }
            } else {
                if (mobileBuilt) {
                    track.innerHTML = originalHTML;
                    mobileBuilt = false;
                }
                totalSlides = track.querySelectorAll('.slide').length;
                /* Rebuild dots for desktop */
                dotsWrap.innerHTML = '';
                for (let i = 0; i < totalSlides; i++) {
                    const d = document.createElement('span');
                    d.className = 'dot' + (i === 0 ? ' active' : '');
                    dotsWrap.appendChild(d);
                }
            }
            goTo(0);
        }

        function goTo(idx) {
            const slides = track.querySelectorAll('.slide');
            const total = slides.length;
            if (idx < 0) idx = total - 1;
            if (idx >= total) idx = 0;
            current = idx;
            track.scrollTo({ left: track.clientWidth * current, behavior: 'smooth' });
            dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        /* Desktop buttons */
        slider.querySelector('.next').addEventListener('click', () => goTo(current + 1));
        slider.querySelector('.prev').addEventListener('click', () => goTo(current - 1));

        /* Mobile buttons */
        slider.querySelector('.mob-next').addEventListener('click', () => goTo(current + 1));
        slider.querySelector('.mob-prev').addEventListener('click', () => goTo(current - 1));

        /* Touch swipe */
        let startX = 0;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        });

        /* Init + resize */
        init();
        window.addEventListener('resize', () => { init(); });
    });

});





(function () {
    // Use the full hero section as bounds so icons can be dragged anywhere in the 100vh hero
    const scene = document.getElementById('heroContainer');
    if (!scene) return;

    const nodes = Array.from(scene.querySelectorAll('[data-drag-node]'));
    if (!nodes.length) return;

    function clampNode(node) {
        if (!node.style.left || !node.style.top) return;
        const maxX = Math.max(0, scene.clientWidth - node.offsetWidth);
        const maxY = Math.max(0, scene.clientHeight - node.offsetHeight);
        const nextX = Math.min(maxX, Math.max(0, parseFloat(node.style.left) || 0));
        const nextY = Math.min(maxY, Math.max(0, parseFloat(node.style.top) || 0));
        node.style.left = nextX + 'px';
        node.style.top = nextY + 'px';
    }

    // Place icons in the four corners — tight on mobile, random-within-zone on desktop
    function randomiseIcons() {
        const sw = scene.clientWidth;
        const sh = scene.clientHeight;

        if (sw < 640) {
            // Fixed positions per icon (perplexity, chatgpt, claude, gemini)
            const mobilePositions = [
                { x: 14, y: 130 },
                { x: 313, y: 286 },
                { x: 20, y: 435 },
                { x: 315, y: 517 },
            ];
            nodes.forEach((node, i) => {
                const pos = mobilePositions[i % mobilePositions.length];
                node.style.left = pos.x + 'px';
                node.style.top = pos.y + 'px';
                node.style.right = 'auto';
                node.style.bottom = 'auto';
                node._homeLeft = pos.x;
                node._homeTop = pos.y;
            });
            return;
        }

        const edgePad = 24;
        const navH = 90;
        const midX = sw * 0.5;
        const midY = sh * 0.5;
        const safeW = sw * 0.22;
        const zones = [
            { xMin: edgePad, xMax: edgePad + safeW, yMin: navH, yMax: midY - 20 },
            { xMin: sw - edgePad - safeW, xMax: sw - edgePad, yMin: navH, yMax: midY - 20 },
            { xMin: edgePad, xMax: edgePad + safeW, yMin: midY + 20, yMax: sh - edgePad - 120 },
            { xMin: sw - edgePad - safeW, xMax: sw - edgePad, yMin: midY + 20, yMax: sh - edgePad - 120 },
        ];
        nodes.forEach((node, i) => {
            const zone = zones[i % zones.length];
            const nw = node.offsetWidth || 80;
            const nh = node.offsetHeight || 80;
            const rangeX = Math.max(0, zone.xMax - zone.xMin - nw);
            const rangeY = Math.max(0, zone.yMax - zone.yMin - nh);
            const x = zone.xMin + Math.random() * rangeX;
            const y = zone.yMin + Math.random() * rangeY;
            node.style.left = x + 'px';
            node.style.top = y + 'px';
            node.style.right = 'auto';
            node.style.bottom = 'auto';
            node._homeLeft = x;
            node._homeTop = y;
        });
    }
    randomiseIcons();

    nodes.forEach(node => {
        let pointerId = null;
        let startX = 0;
        let startY = 0;
        let originX = 0;
        let originY = 0;

        node.addEventListener('pointerdown', event => {
            const sceneRect = scene.getBoundingClientRect();
            const nodeRect = node.getBoundingClientRect();

            pointerId = event.pointerId;
            startX = event.clientX;
            startY = event.clientY;
            originX = nodeRect.left - sceneRect.left;
            originY = nodeRect.top - sceneRect.top;

            node.style.left = originX + 'px';
            node.style.top = originY + 'px';
            node.style.right = 'auto';
            node.style.bottom = 'auto';
            node.style.transition = 'none';
            node.classList.add('is-dragging');
            node.setPointerCapture(pointerId);
        });

        node.addEventListener('pointermove', event => {
            if (pointerId !== event.pointerId) return;

            const maxX = Math.max(0, scene.clientWidth - node.offsetWidth);
            const maxY = Math.max(0, scene.clientHeight - node.offsetHeight);
            const nextX = Math.min(maxX, Math.max(0, originX + (event.clientX - startX)));
            const nextY = Math.min(maxY, Math.max(0, originY + (event.clientY - startY)));

            node.style.left = nextX + 'px';
            node.style.top = nextY + 'px';
        });

        function stopDrag(event) {
            if (pointerId === null) return;
            if (event.pointerId && event.pointerId !== pointerId) return;

            node.classList.remove('is-dragging');
            if (node.hasPointerCapture(pointerId)) {
                node.releasePointerCapture(pointerId);
            }
            pointerId = null;

            // Snap back to original position
            node.style.transition = 'left 0.55s cubic-bezier(.16,1,.3,1), top 0.55s cubic-bezier(.16,1,.3,1)';
            node.style.left = node._homeLeft + 'px';
            node.style.top = node._homeTop + 'px';
            setTimeout(() => { node.style.transition = ''; }, 560);
        }

        node.addEventListener('pointerup', stopDrag);
        node.addEventListener('pointercancel', stopDrag);
        node.addEventListener('lostpointercapture', stopDrag);
    });

    window.addEventListener('resize', () => {
        requestAnimationFrame(() => {
            randomiseIcons();
            nodes.forEach(node => {
                clampNode(node);
            });
        });
    });
})();




(function () {
    var navbar = document.getElementById('navbar');
    var darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    if (!navbar || !darkSections.length) return;

    function updateNavTheme() {
        var navH = navbar.offsetHeight + 10;
        var isDark = false;
        darkSections.forEach(function (sec) {
            var r = sec.getBoundingClientRect();
            if (r.top <= navH && r.bottom >= 0) isDark = true;
        });
        navbar.classList.toggle('nav-on-dark', isDark);
    }

    window.addEventListener('scroll', updateNavTheme, { passive: true });
    updateNavTheme();
})();



/* â”€â”€ Ticker / Marquee â”€â”€ */
(function () {
    const wrap = document.querySelector('.ticker-wrap');
    if (!wrap) return;

    /* Collect original spans only (remove hardcoded duplicates if present) */
    const allSpans = Array.from(wrap.querySelectorAll('span'));
    const half = allSpans.length / 2;
    const origSpans = (Number.isInteger(half) && half >= 1)
        ? allSpans.slice(0, half)
        : allSpans;

    /* Build a single track with originals + one clone set for seamless loop */
    const track = document.createElement('div');
    track.className = 'ticker-tr';
    origSpans.forEach(s => track.appendChild(s.cloneNode(true)));
    origSpans.forEach(s => track.appendChild(s.cloneNode(true)));

    wrap.innerHTML = '';
    wrap.appendChild(track);

    /* Auto-speed: ~80 px/s based on actual content width */
    requestAnimationFrame(() => {
        const singleW = track.scrollWidth / 2;
        track.style.animationDuration = Math.max(18, singleW / 80) + 's';
    });
})();


document.addEventListener("DOMContentLoaded", () => {
  const navPills = document.querySelectorAll(".hub-nav-pill");
  const consolePanes = document.querySelectorAll(".console-pane");

  navPills.forEach((pill) => {
    // Listens to click events for seamless multi-device tracking control
    pill.addEventListener("click", () => {
      const targetId = pill.getAttribute("data-target");

      // 1. Terminate all active states from tracking layers
      navPills.forEach((p) => p.classList.remove("active"));
      consolePanes.forEach((pane) => {
        pane.classList.remove("active");
      });

      // 2. Initialize tracking updates to newly targeted nodes
      pill.classList.add("active");
      
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        // Trigger temporary display block before structural opacity fade-in initialization
        targetPane.classList.add("active");
      }
    });
  });
});
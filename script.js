
/* =========================================
   AFTERLIGHT
   THE SILENT RELICS OF SPACE EXPLORATION
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       01. PRELOADER
    ===================================== */

    const preloader = document.querySelector(".preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("loaded");
        }
    }

    window.addEventListener("load", hidePreloader);

    // Fallback in case the load event has already fired.
    if (document.readyState === "complete") {
        hidePreloader();
    }


    /* =====================================
       02. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector("#navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("active");
        navLinks.classList.add("open");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Close menu after clicking a navigation link.
        navItems.forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu when clicking outside.
        document.addEventListener("click", event => {

            const clickedInside =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInside) {
                closeMenu();
            }

        });

        // Close menu with Escape.
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Reset navigation when returning to desktop layout.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    /* =====================================
       03. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(`
        .section-label,
        .intro-heading,
        .intro-text,
        .section-heading,
        .world-card,
        .featured-story,
        .artifact-card,
        .quote-content,
        .timeline-item,
        .explorer-content,
        .footer-main
    `);

    revealElements.forEach(element => {

        element.classList.add("reveal");

    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================
       04. HEADER SCROLL EFFECT
    ===================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================
       05. ACTIVE NAVIGATION
    ===================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    navItems.forEach(link => {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {

            navItems.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }

    });


    /* =====================================
       06. SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

        });

    });


    /* =====================================
       07. CARD HOVER INTERACTIONS
    ===================================== */

    const cards = document.querySelectorAll(`
        .world-card,
        .artifact-card
    `);

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("is-hovered");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("is-hovered");

        });

    });


    /* =====================================
       08. IMAGE LOADING FALLBACK
    ===================================== */

    document.querySelectorAll(".world-image, .artifact-image").forEach(image => {

        const background = getComputedStyle(image).backgroundImage;

        if (!background || background === "none") {

            image.classList.add("image-fallback");

        }

    });


    /* =====================================
       09. BACK TO TOP
    ===================================== */

    const backToTop = document.querySelector(
        '.footer-bottom a[href="#top"]'
    );

    if (backToTop) {

        backToTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       10. CURRENT YEAR
    ===================================== */

    const copyright = document.querySelector(".footer-bottom span");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} AFTERLIGHT. ALL RIGHTS RESERVED.`;

    }


    /* =====================================
       11. PAGE READY
    ===================================== */

    document.body.classList.add("page-ready");

    console.log(
        "%c AFTERLIGHT ",
        "background:#48c8f0;color:#050912;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "The silent relics of space exploration."
    );

});

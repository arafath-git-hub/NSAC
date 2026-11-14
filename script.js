/* =========================================
   ABANDONED BUT NOT FORGOTTEN
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        // Close menu after clicking a link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }


    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });


    // 4. Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    // 5. Current Page Navigation
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    // 6. Footer Current Year
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
        navLinks.classList.toggle("open", !isExpanded);
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            navLinks.classList.remove("open");
        });
    });
}

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
                const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
                link.classList.toggle("active", isCurrent);
                if (isCurrent) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
}

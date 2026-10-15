// Shared behavior used by every page.

const menuButton = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const currentYear = document.querySelector("#current-year");

function toggleNavigation() {
    if (menuButton && primaryNavigation) {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        menuButton.setAttribute(
            "aria-label",
            isExpanded ? "Open navigation menu" : "Close navigation menu"
        );
        primaryNavigation.classList.toggle("open");
    }
}

function updateCopyrightYear() {
    if (currentYear) {
        currentYear.textContent = `${new Date().getFullYear()}`;
    }
}

if (menuButton) {
    menuButton.addEventListener("click", toggleNavigation);
}

updateCopyrightYear();

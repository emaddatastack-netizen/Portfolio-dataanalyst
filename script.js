/* ============================================================
   SCRIPT.JS
   ------------------------------------------------------------
   Kept as small, named functions so new features can be added
   as new functions rather than growing one big inline script.

   Function index:
     renderSkills()          - builds Skill cards from data.js
     renderProjects()        - builds Project cards from data.js
     renderContact()         - builds Contact items from data.js
     initNav()               - sticky nav: mobile toggle + dropdown
     initScrollAnimations()  - IntersectionObserver fade-ins
     initSmoothScrollFallback() - smooth scroll for older browsers
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderContact();
  initNav();
  initScrollAnimations();
  initSmoothScrollFallback();
});


/* ------------------------------------------------------------
   renderSkills()
   Reads the `skills` array from data.js and injects one card
   per entry into #skillsGrid. Add a new skill by adding one
   object to that array — nothing here needs to change.
------------------------------------------------------------ */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid || typeof skills === "undefined") return;

  grid.innerHTML = skills
    .map(
      (skill) => `
    <article class="skill-card fade-in" id="skill-${skill.id}">
      <div class="skill-card__icon">${skill.icon}</div>
      <h3 class="skill-card__name">${skill.name}</h3>
      <p class="skill-card__desc">${skill.description}</p>
      <ul class="skill-card__list">
        ${skill.bullets
          .map(
            (bullet) => `<li>${ICONS.check}<span>${bullet}</span></li>`
          )
          .join("")}
      </ul>
    </article>
  `
    )
    .join("");
}


/* ------------------------------------------------------------
   renderProjects()
   Reads the `projects` array from data.js and injects one card
   per entry into #projectsGrid. Add a new project by adding one
   object to that array — nothing here needs to change.
------------------------------------------------------------ */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid || typeof projects === "undefined") return;

  grid.innerHTML = projects
    .map((project) => {
      const hasDemo = project.demoUrl && project.demoUrl.trim() !== "";
      const demoButton = hasDemo
        ? `<a href="${project.demoUrl}" class="btn btn--ghost" target="_blank" rel="noopener">${ICONS.externalLink} Live Demo</a>`
        : `<span class="btn btn--disabled" aria-disabled="true" title="Live demo coming soon">Coming soon</span>`;

      return `
      <article class="project-card fade-in">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.description}</p>
        <div class="project-card__tags">
          ${project.tags.map((tag) => `<span class="project-card__tag">${tag}</span>`).join("")}
        </div>
        <div class="project-card__actions">
          <a href="${project.githubUrl}" class="btn btn--ghost" target="_blank" rel="noopener">${ICONS.github} GitHub</a>
          ${demoButton}
        </div>
      </article>
    `;
    })
    .join("");
}


/* ------------------------------------------------------------
   renderContact()
   Reads the `contact` array from data.js and injects one item
   per entry into #contactList.
------------------------------------------------------------ */
function renderContact() {
  const list = document.getElementById("contactList");
  if (!list || typeof contact === "undefined") return;

  list.innerHTML = contact
    .map(
      (item) => `
    <li>
      <a href="${item.href}" class="contact__item" target="${item.id === "email" || item.id === "phone" ? "_self" : "_blank"}" rel="noopener">
        <span class="contact__icon">${item.icon}</span>
        <span>
          <span class="contact__label">${item.label}</span>
          <span class="contact__value">${item.value}</span>
        </span>
      </a>
    </li>
  `
    )
    .join("");
}


/* ------------------------------------------------------------
   initNav()
   Handles the mobile hamburger toggle and the tap-to-open
   Skills dropdown on mobile. Desktop hover is handled purely
   in CSS (:hover / :focus-within), so this only needs to cover
   the tap/click case for touch devices and keyboard users.
------------------------------------------------------------ */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const dropdownToggle = document.getElementById("skillsDropdownToggle");
  const dropdownItem = dropdownToggle ? dropdownToggle.closest(".navbar__item--dropdown") : null;

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (!isOpen && dropdownItem) {
        dropdownItem.classList.remove("is-open");
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener("click", () => {
      const isOpen = dropdownItem.classList.toggle("is-open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Close the mobile menu after a nav link is followed
  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        if (dropdownItem) {
          dropdownItem.classList.remove("is-open");
          dropdownToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Close dropdown when clicking outside of it
  document.addEventListener("click", (event) => {
    if (dropdownItem && !dropdownItem.contains(event.target)) {
      dropdownItem.classList.remove("is-open");
      if (dropdownToggle) dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
}


/* ------------------------------------------------------------
   initScrollAnimations()
   Adds a subtle fade-in-on-scroll to any element with the
   .fade-in class, using IntersectionObserver (no library).
------------------------------------------------------------ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(".fade-in");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}


/* ------------------------------------------------------------
   initSmoothScrollFallback()
   Native CSS `scroll-behavior: smooth` (set in style.css) covers
   most browsers. This adds a tiny JS-driven scroll for browsers
   or reduced-motion setups where a manual offset is preferred,
   and keeps focus management correct for keyboard users after
   navigating to a section.
------------------------------------------------------------ */
function initSmoothScrollFallback() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Move focus to the target section for keyboard/screen-reader users
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

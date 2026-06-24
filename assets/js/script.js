'use strict';



// =========================
// ELEMENT TOGGLE FUNCTION
// =========================
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};



// =========================
// SIDEBAR
// =========================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
}



// =========================
// UNIFIED MODAL SYSTEM
// =========================

const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modal = document.querySelector("[data-modal]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelectorAll("[data-modal-title]");
const modalSubtitle = document.querySelector("[data-modal-subtitle]");
const modalText = document.querySelectorAll("[data-modal-text]");

function openModal(type, { title, subtitle, image, text }) {

  modal.classList.remove("image-modal", "info-modal");
  modal.classList.add(type + "-modal");

  modalTitle.forEach(el => el.innerHTML = title || "");
  modalText.forEach(el => el.innerHTML = text || "");

  if (modalSubtitle) {
    modalSubtitle.innerHTML = subtitle || "";
  }

  if (image && modalImg) {
    modalImg.src = image;
    modalImg.alt = title || "";
  }

  modalContainer.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (overlay) {
  overlay.addEventListener("click", closeModal);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

document.querySelectorAll("[data-modal-trigger]").forEach(card => {
  card.addEventListener("click", function () {
    const type     = this.dataset.modalType;
    const title    = this.dataset.title;
    const subtitle = this.dataset.subtitle;
    const image    = this.dataset.image;
    const text     = this.dataset.text;

    openModal(type, { title, subtitle, image, text });
  });
});



// =========================
// FILTER SYSTEM (PORTFOLIO)
// =========================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

const filterItems = document.querySelectorAll("[data-filter-item]");

function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

if (selectItems.length > 0) {
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();

      if (selectValue) selectValue.innerText = this.innerText;

      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });
}

if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();

      if (selectValue) selectValue.innerText = this.innerText;

      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}



// =========================
// CONTACT FORM
// =========================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}



// =========================
// PAGE NAVIGATION
// =========================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {

      const target = this.innerHTML.toLowerCase();

      pages.forEach(page => {
        page.classList.toggle("active", page.dataset.page === target);
      });

      navigationLinks.forEach(nav => {
        nav.classList.remove("active");
      });

      this.classList.add("active");
      window.scrollTo(0, 0);

    });
  });
}



// =========================
// ABOUT-PAGE ICON -> RESEARCH CARD LINKING
// =========================
// Clicking a "What I'm doing" icon on the About page jumps to the
// Research page and opens the matching JWST Dashboard card's modal.
// Requires:
//   1. data-link-target="card-xxx" on each .service-item in the About page
//   2. id="card-xxx" on the matching .modal-card[data-modal-trigger] in Research

const serviceItems = document.querySelectorAll('.service-item[data-link-target]');

serviceItems.forEach(function (item) {
  item.style.cursor = 'pointer';
  item.addEventListener('click', function () {
    goToResearchCard(item.dataset.linkTarget);
  });
});

function goToResearchCard(targetId) {
  // Step 1: click the existing "Research" nav button so the normal
  // page-switching logic above runs exactly as it would for a real click
  navigationLinks.forEach(function (link) {
    if (link.textContent.trim().toLowerCase() === 'research') {
      link.click();
    }
  });

  // Step 2: give the page-switch a moment, then scroll to and "click"
  // the matching research card, which fires the existing modal-open logic
  setTimeout(function () {
    const card = document.getElementById(targetId);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { card.click(); }, 300);
    }
  }, 100);
}

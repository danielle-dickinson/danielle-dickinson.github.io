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

  // remove old type classes
  modal.classList.remove("image-modal", "info-modal");
  modal.classList.add(type + "-modal");

  // populate shared fields
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

modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});


// =========================
// ATTACH MODAL TRIGGERS
// (works for portfolio, jwst, testimonials — anything with data-modal-trigger)
// =========================

document.querySelectorAll("[data-modal-trigger]").forEach(card => {
  card.addEventListener("click", function () {
    const type  = this.dataset.modalType;   // "image" or "info"
    const title = this.dataset.title;
    const subtitle = this.dataset.subtitle;
    const image = this.dataset.image;
    const text  = this.dataset.text;

    openModal(type, { title, subtitle, image, text });
  });
});
// =========================
// TESTIMONIALS
// =========================
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");

testimonialsItems.forEach(item => {
  item.addEventListener("click", function () {

    const title = this.dataset.title;
    const image = this.dataset.image;
    const text = this.dataset.text;

    openModal(title, image, text);

  });
});



// =========================
// PORTFOLIO (PROJECTS)
// =========================
const projectItems = document.querySelectorAll("[data-project-item]");

projectItems.forEach(item => {
  item.addEventListener("click", function () {

    const title = this.dataset.title;
    const image = this.dataset.image;
    const text = this.dataset.text;

    openModal(title, image, text);

  });
});



// =========================
// JWST (NOW ALSO USES SAME SYSTEM)
// =========================
const jwstItems = document.querySelectorAll("[data-jwst-item]");

jwstItems.forEach(item => {
  item.addEventListener("click", function () {

    const title = this.dataset.title;
    const image = this.dataset.image;
    const text = this.dataset.text;

    openModal(title, image, text);

  });
});



// modal close events
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);



// =========================
// FILTER SYSTEM (PORTFOLIO)
// =========================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

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

selectItems.forEach(item => {
  item.addEventListener("click", function () {

    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;

    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
});

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {

    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;

    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });
});



// =========================
// CONTACT FORM
// =========================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {

    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
});



// =========================
// PAGE NAVIGATION
// =========================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

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

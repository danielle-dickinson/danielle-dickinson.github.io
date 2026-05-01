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
// (USED FOR EVERYTHING)
// =========================

// modal elements
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// open modal function
function openModal(title, image, text) {
  modalImg.src = image;
  modalImg.alt = title;
  modalTitle.innerHTML = title;
  modalText.innerHTML = text;

  modalContainer.classList.add("active");
  overlay.classList.add("active");
}

// close modal function
function closeModal() {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
}



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

import '../scss/main.scss';


// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector('.site-header__mobile-toggle');
const nav = document.querySelector('.site-header__nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    // Toggle the 'is-open' class on both the button and the nav
    menuToggle.classList.toggle('is-open');
    nav.classList.toggle('is-open');

    // Toggle the aria-expanded attribute for accessibility
    const isOpen = menuToggle.classList.contains('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}
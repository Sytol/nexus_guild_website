'use strict';

// Mobile navigation that closes after selection or resizing.
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  mobileNav.hidden = isOpen;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth > 730) closeMenu();
});

// Working category filters: no backend required.
const filters = document.querySelectorAll('[data-filter]');
const squadCards = document.querySelectorAll('.squad-card');
const filterStatus = document.querySelector('#filter-status');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(b => {
      const selected = b === button;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    squadCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    filterStatus.textContent = `${visible} squad${visible === 1 ? '' : 's'} shown.`;
  });
});

// Front-end-only join demo. NEVER send or store visitor input.
const dialog = document.querySelector('#join-dialog');
const joinForm = document.querySelector('#join-form');
const joinResult = document.querySelector('#join-result');
document.querySelectorAll('[data-open-join]').forEach(button => {
  button.addEventListener('click', () => {
    closeMenu();
    joinForm.reset();
    joinResult.hidden = true;
    if (!dialog.open) dialog.showModal();
    document.querySelector('#gamer-tag').focus();
  });
});
document.querySelector('[data-close-join]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  // Clicking the backdrop closes the modal, but clicking inside the dialog won't.
  if (event.target === dialog) dialog.close();
});
joinForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!joinForm.reportValidity()) return;
  joinResult.textContent = 'Demo complete! This preview is working, but your information was not submitted or saved. A real site would require an approved sign-up integration.';
  joinResult.hidden = false;
  joinForm.reset();
});
document.querySelector('#year').textContent = new Date().getFullYear();

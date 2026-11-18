// ============ ДВЕРИ: открываются автоматически при загрузке ============
window.addEventListener('load', () => {
  const doors = document.getElementById('doors');
  const heroText = document.querySelector('.hero-text');
  const sideCta = document.querySelector('.side-cta');

  setTimeout(() => {
    doors.classList.add('open');
    heroText.classList.add('show');
    sideCta.classList.add('show');
  }, 400);

  setTimeout(() => {
    doors.classList.add('hidden');
  }, 2000);
});

// ============ БУРГЕР-МЕНЮ ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

// Закрываем меню при клике по ссылке
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ============ МОДАЛКА ПОКУПКИ ============
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalClose = document.getElementById('modal-close');
const buyForm = document.getElementById('buy-form');
let currentProduct = null;

function openModal(product, name, price) {
  currentProduct = product;
  modalTitle.textContent = name;
  modalPrice.textContent = price;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  buyForm.reset();
}

document.querySelectorAll('.btn-buy').forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(
      btn.dataset.product,
      btn.dataset.name,
      btn.dataset.price
    );
  });
});

modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Стаб отправки формы — пока без бэкенда
buyForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(buyForm);
  const payload = {
    product: currentProduct,
    name: data.get('name'),
    contact: data.get('contact')
  };
  console.log('[STUB] Отправка на платёжку:', payload);
  alert(`Заявка принята: ${payload.name}\nПродукт: ${currentProduct}\n\n(Это заглушка — бэкенд оплаты подключим следующим шагом.)`);
  closeModal();
});

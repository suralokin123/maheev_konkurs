//   Блокировка прокрутки меню и открытие меню

  const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');

  // Добавляем/удаляем класс 'no-scroll' к body
  if (burgerMenu.classList.contains('active')) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});

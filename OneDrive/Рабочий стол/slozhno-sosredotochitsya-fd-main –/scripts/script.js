// Самовызывающаяся функция (IIFE) для инициализации темы при загрузке страницы.
(function initTheme() {
  // Получаем сохраненную тему из локального хранилища (localStorage).
  const theme = localStorage.getItem('theme');
  // Если тема была сохранена, применяем её.
  if (theme) {
    setTheme(theme);
  }
})();

// Добавляем обработчик события, который сработает после полной загрузки DOM-дерева.
document.addEventListener('DOMContentLoaded', () => {
  // Определяем текущую тему, находя класс у <html>, который начинается с "theme-".
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', ''); // Удаляем префикс "theme-", чтобы получить чистое имя темы.
  
  // Находим все кнопки для переключения тем.
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  
  // Устанавливаем активное состояние для кнопки, соответствующей текущей теме.
  setActiveButton(themeButtons, currentTheme);

  // Добавляем обработчики кликов на каждую кнопку переключения темы.
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Определяем выбранную тему по классу кнопки.
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_')) // Ищем класс, содержащий "_type_".
        .split('_type_')[1]; // Разделяем строку и берем название темы.
      
      // Применяем выбранную тему.
      setTheme(chosenTheme);
      // Устанавливаем активное состояние для нажатой кнопки.
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

/**
 * Функция для установки темы оформления страницы.
 * @param {string} theme - Название темы (например, 'light', 'dark').
 */
function setTheme(theme) {
  // Полностью очищаем классы у элемента <html>, чтобы удалить предыдущую тему.
  document.documentElement.className = '';
  // Добавляем новый класс темы к элементу <html>.
  document.documentElement.classList.add(`theme-${theme}`);
  // Сохраняем выбранную тему в локальное хранилище для последующих сессий.
  localStorage.setItem('theme', theme);
}

/**
 * Функция для установки активного состояния кнопки переключения темы.
 * @param {Array<HTMLElement>} buttonsArray - Массив кнопок тем.
 * @param {string} theme - Название текущей темы.
 */
function setActiveButton(buttonsArray, theme) {
  // Перебираем все кнопки.
  buttonsArray.forEach((button) => {
    // Удаляем класс активного состояния и атрибут 'disabled'.
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  
  // Находим кнопку, которая соответствует текущей теме.
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
  
  // Если такая кнопка найдена.
  if (target) {
    // Добавляем ей класс активного состояния и делаем её неактивной для нажатия.
    target.classList.add('header__theme-menu-button_active');
    target.setAttribute('disabled', true);
  } else {
    // Если по какой-то причине кнопка для текущей темы не найдена,
    // делаем активной кнопку "Авто" по умолчанию.
    const autoButton = document.querySelector(
      '.header__theme-menu-button_type_auto'
    );
    autoButton.classList.add('header__theme-menu-button_active');
    autoButton.setAttribute('disabled', true);
  }
}
// Дата добавления комментариев: 2025-08-07

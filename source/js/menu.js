document.addEventListener('DOMContentLoaded', () => {

  const navigation = document.querySelector('.navigation');
  const button = navigation.querySelector('.navigation__menu-button');
  navigation.classList.remove('navigation--no-js');

  if (window.matchMedia('(max-width: 767px)').matches) {
    setMainMenu(navigation, button);
  }

  window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMainMenu(navigation, button);
    } else {
      resetMainMenu(navigation, button);
    }
  });
});

function setMainMenu(navigation, button) {
  navigation.classList.add('navigation--closed');
  navigation.setAttribute('id', 'menu');
  button.setAttribute('aria-label', 'Открыть меню');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'menu');

  button.addEventListener('click', function() {
    if (button.getAttribute('aria-expanded') === 'false') {
      navigation.classList.remove('navigation--closed');
      navigation.classList.add('navigation--opened');
      button.setAttribute('aria-label', 'Закрыть меню');
      button.setAttribute('aria-expanded', 'true');
    } else if (button.getAttribute('aria-expanded') === 'true') {
      navigation.classList.add('navigation--closed');
      navigation.classList.remove('navigation--opened');
      button.setAttribute('aria-label', 'Открыть меню');
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

function resetMainMenu(navigation, button) {
  navigation.classList.remove('navigation--closed');
  navigation.classList.remove('navigation--opened');
  navigation.removeAttribute('id');
  button.removeAttribute('aria-label');
  button.removeAttribute('aria-expanded');
  button.removeAttribute('aria-controls');
}

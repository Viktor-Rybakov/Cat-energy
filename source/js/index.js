document.addEventListener('DOMContentLoaded', () => {

  const navigation = document.querySelector('.navigation');
  const button = navigation.querySelector('.navigation__menu-button');
  const menu = navigation.querySelector('.navigation__menu');

  navigation.classList.remove('navigation--no-js');
  navigation.classList.add('navigation--closed');


  button.addEventListener('click', function() {
    navigation.classList.toggle('navigation--closed');
    navigation.classList.toggle('navigation--opened');
  });
});

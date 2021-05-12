document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.form');

  if (form) {
    let inputs = form.querySelectorAll('input[required]');
    let button = form.querySelector('button[type="submit"]')

    button.addEventListener('click', () => {
      inputs.forEach((elem) => {
        if (!elem.value) {
          elem.classList.add('form__input--error');
        }
        if (elem.value) {
          elem.classList.remove('form__input--error');
        }
      });
    });
  }
});

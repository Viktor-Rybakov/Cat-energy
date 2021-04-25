document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.slider');
  const sliderButtonBefore = slider.querySelector('.slider__button--before');
  const sliderButtonAfter = slider.querySelector('.slider__button--after');
  const sliderRange = slider.querySelector('.slider__range');

  sliderRange.addEventListener('change', changeSeparatoePosition);

  sliderButtonBefore.addEventListener('click', (evt) => {
    evt.preventDefault();

    sliderRange.setAttribute('value', "0");
    changeSeparatoePosition();
  });

  sliderButtonAfter.addEventListener('click', (evt) => {
    evt.preventDefault();

    sliderRange.setAttribute('value', "100");
    changeSeparatoePosition();
  });

  function changeSeparatoePosition() {
    slider.setAttribute('style', `--separatop-position: ${sliderRange.value}%`);
  }
});

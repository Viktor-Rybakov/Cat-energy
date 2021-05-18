document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.slider');

  if (slider) {
    const sliderButtonBefore = slider.querySelector('.slider__button--before');
    const sliderButtonAfter = slider.querySelector('.slider__button--after');
    const sliderToggle = slider.querySelector('.slider__toggle');
    const sliderImageWrapper = slider.querySelector('.slider__image-wrapper');
    const sliderRange = slider.querySelector('.slider__range');
    const section = document.querySelector('.results');

    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileSlider();
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
      setTabletSlider();
    }

    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        setMobileSlider();
      }

      if (window.matchMedia('(min-width: 768px)').matches) {
        setTabletSlider();
      }
    });

    function setMobileSlider() {
      sliderImageWrapper.style.width = '100%';
      sliderToggle.classList.add('slider__toggle--before');
      sliderRange.value = '0';

      sliderButtonAfter.onclick = (evt) => {
        evt.preventDefault();

        sliderToggle.classList.remove('slider__toggle--before');
        sliderToggle.classList.add('slider__toggle--after');
        sliderImageWrapper.style.width = '0%';
      }

      sliderButtonBefore.onclick = (evt) => {
        evt.preventDefault();

        sliderToggle.classList.remove('slider__toggle--after');
        sliderToggle.classList.add('slider__toggle--before');
        sliderImageWrapper.style.width = '100%';
      }
    }

    function setTabletSlider() {
      sliderImageWrapper.style.width = '50%';
      sliderToggle.classList.remove('slider__toggle--before');
      sliderToggle.classList.remove('slider__toggle--after');
      sliderRange.value = '50';

      const sliderWidth = slider.offsetWidth;
      const rangeWidth = sliderRange.offsetWidth - 34;

      sliderRange.oninput = () => {
        let wrapperWidth = (sliderWidth - rangeWidth) / 2 + (rangeWidth) * sliderRange.value / 100;
        sliderImageWrapper.style.width = `${wrapperWidth}px`;
        section.classList.remove('results--before');
        section.classList.remove('results--after');
      };

      sliderButtonBefore.onclick = (evt) => {
        evt.preventDefault();

        sliderRange.value = '0';
        sliderImageWrapper.style.width = '100%';
        section.classList.add('results--before');
        section.classList.remove('results--after');
      };

      sliderButtonAfter.onclick = (evt) => {
        evt.preventDefault();

        sliderRange.value = '100';
        sliderImageWrapper.style.width = '0%';
        section.classList.remove('results--before');
        section.classList.add('results--after');
      };
    }
  }

});

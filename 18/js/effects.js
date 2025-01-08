const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptionals = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const setImageStyle = () => {
  if (chosenEffect === Effect.DEFAULT) {
    imageElement.style.filter = '';
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({min, max, step}) => {
  noUiSlider.create(sliderElement, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const showSlide = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlide = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  if (sliderElement.noUiSlider) {
    const { min, max, step } = effectToSliderOptionals[chosenEffect];
    sliderElement.noUiSlider.updateOptions({
      range: {min, max},
      step,
      start: max,
    });
  }
};

const setSlider = () => {
  hideSlide();

  if (chosenEffect !== Effect.DEFAULT) {
    if (!sliderElement.noUiSlider) {
      createSlider(effectToSliderOptionals[chosenEffect]);
    } else {
      updateSlider();
    }
    showSlide();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

function init() {
  hideSlide();
  setSlider();
  effectElement.addEventListener('change', onEffectChange);
}

export { init, reset };

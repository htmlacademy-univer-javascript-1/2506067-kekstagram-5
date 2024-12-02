const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const EFFECTS = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '', hiddenSlider: true },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег',
};

const body = document.body;
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const previewImage = document.querySelector('.img-upload__preview img');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = effectSliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectButtons = document.querySelectorAll('.effects__radio');
let currentEffect = 'none';

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const applyEffect = (effect, value) => {
  const { filter, unit } = EFFECTS[effect];
  previewImage.style.filter = filter ? `${filter}(${value}${unit})` : '';
  effectLevelValue.value = value;
};

const updateSlider = (effect) => {
  const { min, max, step, hiddenSlider } = EFFECTS[effect];
  effectSlider.noUiSlider.updateOptions({ range: { min, max }, start: max, step });
  effectSliderContainer.classList.toggle('hidden', hiddenSlider || effect === 'none');
};

const resetForm = () => {
  setScale(DEFAULT_SCALE);
  currentEffect = 'none';
  updateSlider(currentEffect);
  previewImage.style.filter = '';
  effectSliderContainer.classList.add('hidden');
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter(Boolean);

const isValidTags = (value) => {
  const tags = normalizeTags(value);
  const isValidCount = tags.length <= MAX_HASHTAG_COUNT;
  const isValidUnique = new Set(tags.map((tag) => tag.toLowerCase())).size === tags.length;
  const isValidPattern = tags.every((tag) => VALID_SYMBOLS.test(tag));
  return isValidCount && isValidUnique && isValidPattern;
};

const toggleModal = (isVisible) => {
  overlay.classList.toggle('hidden', !isVisible);
  body.classList.toggle('modal-open', isVisible);

  if (isVisible) {
    // eslint-disable-next-line no-use-before-define
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__hashtags, .text_description')) {
    evt.preventDefault();
    toggleModal(false);
    resetForm();
  }
};

scaleControlSmaller.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(Math.max(SCALE_MIN, currentValue - SCALE_STEP));
});

scaleControlBigger.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(Math.min(SCALE_MAX, currentValue + SCALE_STEP));
});

effectButtons.forEach((button) => {
  button.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    updateSlider(currentEffect);
    applyEffect(currentEffect, EFFECTS[currentEffect].max);
  });
});

noUiSlider.create(effectSlider, {
  range: { min: EFFECTS.none.min, max: EFFECTS.none.max },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', (values) => {
  applyEffect(currentEffect, values[0]);
});

fileField.addEventListener('change', () => {
  resetForm();
  toggleModal(true);
  fileField.value = '';
});

cancelButton.addEventListener('click', () => {
  toggleModal(false);
  resetForm();
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

pristine.addValidator(hashtagField, isValidTags, ErrorText.INVALID_PATTERN, 3, true);
resetForm();

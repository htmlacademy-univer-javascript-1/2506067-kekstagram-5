import { resetImageScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';
import { sendData } from './api.js';
import { displayErrorMessage, displaySuccessMessage } from './message.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const commentField = form.querySelector('.text_description');
const imgPreview = form.querySelector('.img-upload__preview');
const effectsPreview = form.querySelectorAll('.effects__preview');
const submitButton = form.querySelector('.img-upload__submit');

const hashtagField = form.querySelector('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег',
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const hideModal = () => {

  form.reset();
  resetImageScale();
  resetEffect();
  pristine.reset();


  imgPreview.querySelector('img').src = '';
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = '';
  });

  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  submitButton.disabled = false;
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    await sendData(new FormData(form))
      .then(() => {
        displaySuccessMessage();
        hideModal();
      })
      .catch(() => {
        displayErrorMessage();
        submitButton.disabled = false;
      });
  }
};

const showModal = (evt) => {
  imgPreview.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
  const imageURL = imgPreview.querySelector('img').src;
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url('${imageURL}')`;
  });
  form.addEventListener('submit', onFormSubmit);
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = (evt) => {
  showModal(evt);
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
initEffect();

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


pristine.addValidator(hashtagField, (value) => hasValidCount(value), ErrorText.INVALID_COUNT, 3, true);
pristine.addValidator(hashtagField, (value) => hasUniqueTags(value), ErrorText.NOT_UNIQUE, 1, true);
pristine.addValidator(hashtagField, (value) => hasValidTags(value), ErrorText.INVALID_PATTERN, 2, true);

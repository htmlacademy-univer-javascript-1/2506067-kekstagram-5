const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег',
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter(Boolean);

const isValidTags = (value) => {
  const tags = normalizeTags(value);
  const isValidCount = tags.length <= MAX_HASHTAG_COUNT;
  const isValidUnique = new Set(tags.map((tag) => tag.toLowerCase())).size === tags.length;
  const isValidPattern = tags.every((tag) => VALID_SYMBOLS.test(tag));

  return isValidCount && isValidUnique && isValidPattern;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagField, isValidTags, ErrorText.INVALID_PATTERN, 3, true);

const toggleModal = (isVisible) => {
  overlay.classList.toggle('hidden', !isVisible);
  body.classList.toggle('modal-open', isVisible);
  if (isVisible) {
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__hashtags, .text_description')) {
    evt.preventDefault();
    toggleModal(false);
  }
}

fileField.addEventListener('change', () => toggleModal(true));
cancelButton.addEventListener('click', () => toggleModal(false));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

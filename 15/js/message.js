import { isEscape } from './util.js';

const documentBody = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');


const offCloseMessageByEscape = () => {
  document.removeEventListener('keydown', closeMessageByEscape);
};

const offCloseMessageByBodyClick = () => {
  documentBody.removeEventListener('click', closeMessageByBodyClick);
};

const removeMessage = () => {
  const activeMessage = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  offCloseMessageByEscape();
  offCloseMessageByBodyClick();
  if (closeButton) {
    closeButton.removeEventListener('click', removeMessage);
  }
  activeMessage.remove();
};

function closeMessageByEscape(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    removeMessage();
  }
}

function closeMessageByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    removeMessage();
  }
}

const onCloseMessageByEscape = () => {
  document.addEventListener('keydown', closeMessageByEscape);
};

const onCloseMessageByBodyClick = () => {
  documentBody.addEventListener('click', closeMessageByBodyClick);
};

const displayMessage = (messageTemplate, closeButtonSelector) => {
  documentBody.append(messageTemplate);
  onCloseMessageByEscape();
  onCloseMessageByBodyClick();
  documentBody.querySelector(closeButtonSelector).addEventListener('click', removeMessage);
};

const displaySuccessMessage = () => displayMessage(successMessageTemplate, '.success__button');

const displayErrorMessage = () => displayMessage(errorMessageTemplate, '.error__button');

export { displaySuccessMessage, displayErrorMessage };

import { isEscape } from './util.js';

const documentBody = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureModal = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsCount = document.querySelector('.social__comment-count');

const COMMENTS_PER_LOAD = 5;

let displayedCommentsCount = 0;
let allComments = [];

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureModal.querySelector('.big-picture__img img').src = url;
  bigPictureModal.querySelector('.big-picture__img img').alt = description;
  bigPictureModal.querySelector('.likes-count').textContent = likes;
  bigPictureModal.querySelector('.social__caption').textContent = description;
};

const createCommentElement = ({ name, avatar, message }) => {
  const commentElement = document.createElement('li');
  commentElement.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  commentElement.classList.add('social__comment');

  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  displayedCommentsCount += COMMENTS_PER_LOAD;

  if (displayedCommentsCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
    displayedCommentsCount = allComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < displayedCommentsCount; index++) {
    fragment.append(createCommentElement(allComments[index]));
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  socialCommentsCount.innerHTML = `${displayedCommentsCount} из <span class="comments-count">${allComments.length}</span> комментариев`;
};

const onEscKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  bigPictureModal.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  renderPictureDetails(data);
  allComments = data.comments;
  if (allComments.length > 0) {
    renderComments();
  }
};

function closeBigPicture() {
  bigPictureModal.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  displayedCommentsCount = 0;
}

commentsLoader.addEventListener('click', () => {
  renderComments();
});

const onCloseButtonClick = () => {
  closeBigPicture();
};

closeButton.addEventListener('click', onCloseButtonClick);

export { openBigPicture };

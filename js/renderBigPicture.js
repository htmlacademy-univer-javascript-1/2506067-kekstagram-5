import { photosArray } from './main.js';

const COMMENTS_PER_PAGE = 5;
let displayedCommentsCount = 0;
let currentPhoto = null;

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
const likesBigSpan = bigPicture.querySelector('.likes-count');
const pictureCancel = document.querySelector('#picture-cancel');
const picturesContainer = document.querySelector('.pictures');

const toggleLike = () => {
  const pictureInfo = document.querySelectorAll('.picture__likes');

  if (!currentPhoto.isLiked) {
    currentPhoto.likes += 1;
    pictureInfo[currentPhoto.id - 1].textContent =
      parseInt(pictureInfo[currentPhoto.id - 1].textContent, 10) + 1;
    likesBigSpan.textContent = currentPhoto.likes;
    currentPhoto.isLiked = true;
  } else {
    currentPhoto.likes -= 1;
    pictureInfo[currentPhoto.id - 1].textContent =
      parseInt(pictureInfo[currentPhoto.id - 1].textContent, 10) - 1;
    likesBigSpan.textContent = currentPhoto.likes;
    currentPhoto.isLiked = false;
  }
};

const onEscapeKeyDown = (event) => {
  if (event.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const renderComments = () => {
  const commentsToShow = currentPhoto.comments.slice(
    displayedCommentsCount,
    displayedCommentsCount + COMMENTS_PER_PAGE
  );

  commentsToShow.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentElement);
  });

  displayedCommentsCount += commentsToShow.length;
  commentCount.textContent = `${displayedCommentsCount} из ${currentPhoto.comments.length} комментариев`;

  if (displayedCommentsCount >= currentPhoto.comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderBigPicture = (photo) => {
  currentPhoto = photo;
  displayedCommentsCount = 0;
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');

  img.src = photo.url;
  img.alt = photo.description;
  caption.textContent = photo.description;
  likesCount.textContent = photo.likes;

  commentsList.innerHTML = '';
  commentCount.textContent = `0 из ${photo.comments.length} комментариев`;

  if (!Object.prototype.hasOwnProperty.call(currentPhoto, 'isLiked')) {
    currentPhoto.isLiked = false;
  }
  renderComments();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeyDown);
  commentsLoader.addEventListener('click', renderComments);
  likesBigSpan.addEventListener('click', toggleLike);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeyDown);
  commentsLoader.removeEventListener('click', renderComments);
  likesBigSpan.removeEventListener('click', toggleLike);
};

picturesContainer.addEventListener('click', (event) => {
  const picture = event.target.closest('.picture');
  if (!picture) {
    return;
  }

  const photoId = picture.dataset.photoId;
  const photo = photosArray.find((item) => item.id === +photoId);
  if (photo) {
    renderBigPicture(photo);
  }
});

pictureCancel.addEventListener('click', closeBigPicture);

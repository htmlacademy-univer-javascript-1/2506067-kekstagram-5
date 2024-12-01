import { photosArray } from './main.js';

const COMMENTS_PER_PAGE = 5;
let displayedCommentsCount = 0;
let currentPhoto = null;

const renderComments = () => {
  const commentsList = document.querySelector('.social__comments');
  const commentsLoader = document.querySelector('.comments-loader');
  const commentCount = document.querySelector('.social__comment-count');
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
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const commentCount = document.querySelector('.social__comment-count');

  img.src = photo.url;
  img.alt = photo.description;
  caption.textContent = photo.description;
  likesCount.textContent = photo.likes;
  commentsList.innerHTML = '';
  commentCount.textContent = `0 из ${photo.comments.length} комментариев`;
  const likesBigSpan = bigPicture.querySelector('.likes-count');
  const pictureInfo = document.querySelectorAll('.picture__likes');
  let isLiked = false;
  likesBigSpan.addEventListener('click', () => {
    if (!isLiked) {
      photo.likes += 1;
      pictureInfo[photo.id - 1].textContent = parseInt(pictureInfo[photo.id - 1].textContent, 10) + 1;
      likesBigSpan.textContent = photo.likes;
      isLiked = true;
    } else {
      photo.likes -= 1;
      pictureInfo[photo.id - 1].textContent = parseInt(pictureInfo[photo.id - 1].textContent, 10) - 1;
      likesBigSpan.textContent = photo.likes;
      isLiked = false;
    }
  });
  renderComments();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const picturesContainer = document.querySelector('.pictures');
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

document.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

document.querySelector('.comments-loader').addEventListener('click', renderComments);

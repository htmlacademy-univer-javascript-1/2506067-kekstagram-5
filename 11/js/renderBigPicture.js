import { photosArray } from './main.js';

const renderBigPicture = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const pictureInfo = document.querySelectorAll('.picture__likes');
  img.src = photo.url;
  img.alt = photo.description;
  caption.textContent = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentElement);
  });

  const likesBigSpan = document.querySelector('.likes-count');
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

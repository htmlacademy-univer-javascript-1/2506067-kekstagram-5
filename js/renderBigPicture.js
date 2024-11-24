import { generatePhotosArray } from './photos.js';

const renderBigPicture = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const caption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');
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
  likesBigSpan.addEventListener('click', () => {
    photo.likes += 1;
    likesBigSpan.textContent = photo.likes;
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
  const photosArray = generatePhotosArray();
  const photo = photosArray.find((p) => p.id === +photoId);
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

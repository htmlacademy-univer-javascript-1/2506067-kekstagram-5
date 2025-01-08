import {openBigPicture} from './big-picture.js';


const thumbnailTemplateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnailElement = (pictureData) => {
  const { likes, url, description, comments } = pictureData;
  const thumbnailElement = thumbnailTemplateElement.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;

  thumbnailElement.addEventListener('click', (event) => {
    event.preventDefault();
    openBigPicture(pictureData);
  });

  return thumbnailElement;
};

const renderThumbnailElements = (picturesArray) => {
  const fragment = document.createDocumentFragment();
  picturesArray.forEach((picture) => {
    const thumbnailElement = createThumbnailElement(picture);
    fragment.append(thumbnailElement);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnailElements };


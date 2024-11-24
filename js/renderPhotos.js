export const renderPhotos = (photosArray) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.getElementById('picture');
  photosArray.forEach((photo) => {
    const pictureElement = template.content.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');
    const likesSpan = pictureElement.querySelector('.picture__likes');
    const commentsSpan = pictureElement.querySelector('.picture__comments');
    pictureElement.querySelector('a').dataset.photoId = photo.id;
    img.src = photo.url;
    img.alt = photo.description;
    likesSpan.textContent = photo.likes;
    commentsSpan.textContent = photo.comments.length;
    picturesContainer.appendChild(pictureElement);
  });
};

export const renderPhotos = (photosArray) => {
  const template = document.getElementById('picture');
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  photosArray.forEach((photo) => {
    const clone = document.importNode(template.content, true);
    const img = clone.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;
    const likesSpan = clone.querySelector('.picture__likes');
    likesSpan.textContent = `${photo.likes}`;
    const commentsSpan = clone.querySelector('.picture__comments');
    commentsSpan.textContent = `${photo.comments.length}`;
    fragment.appendChild(clone);
  });
  picturesContainer.appendChild(fragment);
};

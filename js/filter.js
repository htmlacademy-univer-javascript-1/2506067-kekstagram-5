import {renderThumbnailElements} from './thumbnail.js';
import {getRandomElementsArray, debounce} from './utils.js';

const MAX_RANDOM_THUMBNAILS_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const filterContainer = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

const getRandomThumbnails = (photos, count) => getRandomElementsArray(photos, count);

const sortByCommentsCount = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

const getDiscussedThumbnails = (photos) => photos.slice().sort(sortByCommentsCount);

const removeThumbnails = () => document.querySelectorAll('.picture').forEach((photo) => photo.remove());

const changeThumbnails = (photos) => {
  removeThumbnails();
  renderThumbnailElements(photos);
};

const setActiveButton = (button) => {
  const activeFilterButton = document.querySelector(`.${ACTIVE_CLASS}`);
  if (activeFilterButton) {
    activeFilterButton.classList.remove(ACTIVE_CLASS);
  }
  button.classList.add(ACTIVE_CLASS);
};

export const showFilteredPhotos = (photos) => {
  renderThumbnailElements(photos);
  filterContainer.classList.remove('img-filters--inactive');

  defaultFilterButton.addEventListener('click', (event) => {
    setActiveButton(event.target);
    debounce(() => changeThumbnails(photos))();
  });

  randomFilterButton.addEventListener('click', (event) => {
    setActiveButton(event.target);
    debounce(() => changeThumbnails(getRandomThumbnails(photos, MAX_RANDOM_THUMBNAILS_COUNT)))();
  });

  discussedFilterButton.addEventListener('click', (event) => {
    setActiveButton(event.target);
    debounce(() => changeThumbnails(getDiscussedThumbnails(photos)))();
  });
};

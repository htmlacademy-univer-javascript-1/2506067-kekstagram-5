import {renderThumbnailElements} from './thumbnail.js';
import {getRandomElementsArray, debounce} from './util.js';

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

const changeThumbnails = (photos, filterButton) => {
  removeThumbnails();
  const activeFilterButton = document.querySelector(`.${ACTIVE_CLASS}`);
  activeFilterButton.classList.remove(ACTIVE_CLASS);
  renderThumbnailElements(photos);
  filterButton.classList.add(ACTIVE_CLASS);
};

export const showFilteredPhotos = (photos) => {
  renderThumbnailElements(photos);
  filterContainer.classList.remove('img-filters--inactive');

  defaultFilterButton.addEventListener('click', debounce(() => {
    changeThumbnails(photos, defaultFilterButton);
  }));

  randomFilterButton.addEventListener('click', debounce(() => {
    changeThumbnails(getRandomThumbnails(photos, MAX_RANDOM_THUMBNAILS_COUNT), randomFilterButton);
  }));

  discussedFilterButton.addEventListener('click', debounce(() => {
    changeThumbnails(getDiscussedThumbnails(photos), discussedFilterButton);
  }));
};

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { generatePhotosArray } from './photos.js';
import { renderPhotos } from './renderPhotos.js';

const photosArray = generatePhotosArray();
renderPhotos(photosArray);

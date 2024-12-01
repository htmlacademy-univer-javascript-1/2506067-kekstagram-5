import { generatePhotosArray } from './photos.js';
import { renderPhotos } from './renderPhotos.js';

export const photosArray = generatePhotosArray();
renderPhotos(photosArray);

import { generatePhotosArray } from './photos.js';
import { renderPhotos } from './renderPhotos.js';

const photosArray = generatePhotosArray();
renderPhotos(photosArray);

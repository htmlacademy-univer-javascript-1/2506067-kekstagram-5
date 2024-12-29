import { getData } from './api.js';
import { showFilteredPhotos } from './filter.js';
import './form.js';

const loadThumbnails = async () => {
  try {
    showFilteredPhotos(await getData());
  } catch (err) {
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

loadThumbnails();

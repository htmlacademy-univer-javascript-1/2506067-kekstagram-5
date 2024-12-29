import { getRandomInteger } from './util.js';
import { COMMENTS, NAMES } from './data.js';

export const generatePhotosArray = () => {
  const photos = [];
  const generateComment = () => {
    const commentIdSet = new Set();
    const commentId = getRandomInteger(1, 1000);
    if (!commentIdSet.has(commentId)) {
      commentIdSet.add(commentId);
      return {
        id: commentId,
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
        name: NAMES[getRandomInteger(0, NAMES.length - 1)],
      };
    }
    return null;
  };

  for (let i = 0; i < 25; i++) {
    const photoId = i + 1;
    const commentCount = getRandomInteger(0, 30);

    const photo = {
      id: photoId,
      url: `photos/${photoId}.jpg`,
      description: `Описание фотографии ${photoId}`,
      likes: getRandomInteger(15, 200),
      comments: Array.from({ length: commentCount }, generateComment).filter(Boolean),
    };

    photos.push(photo);
  }

  return photos;
};

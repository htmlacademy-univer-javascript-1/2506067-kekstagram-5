import { getRandomInt } from './utils.js';
import { names, messages } from './data.js';

export const generatePhotosArray = () => {
  const photos = [];
  for (let i = 0; i < 25; i++) {
    const photo = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: `Описание фотографии ${i + 1}`,
      likes: getRandomInt(15, 200),
      comments: []
    };
    const commentCount = getRandomInt(0, 30);
    const commentIdSet = new Set();
    for (let j = 0; j < commentCount; j++) {
      let commentId = getRandomInt(1, 1000);
      while (commentIdSet.has(commentId)) {
        commentId = getRandomInt(1, 1000);
      }
      commentIdSet.add(commentId);
      const comment = {
        id: commentId,
        avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
        message: toString(messages[getRandomInt(0, messages.length - 1)]),
        name: toString(names[getRandomInt(0, names.length - 1)])
      };
      photo.comments.push(comment);
    }
    photos.push(photo);
  }
  return photos;
};

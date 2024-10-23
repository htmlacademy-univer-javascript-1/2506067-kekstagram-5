/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const names = [
  'Артём',
  'Мария',
  'Сергей',
  'Елена',
  'Дмитрий',
  'Анна',
  'Андрей',
  'Светлана',
  'Константин'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generatePhotosArray = () => {
  const photos = [];
  for (let i = 0; i < 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии ${i}`,
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

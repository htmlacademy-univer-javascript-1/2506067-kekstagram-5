/* eslint-disable no-unused-vars */
const checkIsLonger = (str, length) => str.length <= length;

const checkIsPalindrom = (str) => {
  const helpStr = str.toLowerCase().replaceAll(' ', '');
  return helpStr === helpStr.split('').reverse().join('');
};

const checkIsInteger = (str) => {
  const result = str.toString().replace(/\D/g,'');
  return result.length > 0 ? result : NaN;
};

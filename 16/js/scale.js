
const SCALE_INCREMENT = 25;
const MIN_SCALE_VALUE = 25;
const INITIAL_SCALE_VALUE = 100;

const uploadModalElement = document.querySelector('.img-upload');
const decreaseButtonElement = uploadModalElement.querySelector('.scale__control--smaller');
const increaseButtonElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleValueInputElement = uploadModalElement.querySelector('.scale__control--value');
const previewImageElement = uploadModalElement.querySelector('.img-upload__preview img');
const updateImageScale = (value) => {
  previewImageElement.style.transform = `scale(${value / 100})`;
  scaleValueInputElement.value = `${value}%`;
};

const onDecreaseButtonClick = () => {
  const currentScaleValue = parseInt(scaleValueInputElement.value, 10);
  const newScaleValue = currentScaleValue - SCALE_INCREMENT;
  if (newScaleValue >= MIN_SCALE_VALUE) {
    updateImageScale(newScaleValue);
  } else {
    decreaseButtonElement.setAttribute('disabled', true);
  }
};

const onIncreaseButtonClick = () => {
  const currentScaleValue = parseInt(scaleValueInputElement.value, 10);
  const newScaleValue = currentScaleValue + SCALE_INCREMENT;
  if (newScaleValue <= INITIAL_SCALE_VALUE) {
    updateImageScale(newScaleValue);
  } else {
    increaseButtonElement.setAttribute('disabled', true);
  }
};

const resetImageScale = () => updateImageScale(INITIAL_SCALE_VALUE);

decreaseButtonElement.addEventListener('click', onDecreaseButtonClick);
increaseButtonElement.addEventListener('click', onIncreaseButtonClick);

export { resetImageScale };

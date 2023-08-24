
import Notiflix from 'notiflix';

const resultButton = document.querySelector(`.form > button`);
const delayForm = document.querySelector(`.form`);
let delayFields = document.querySelectorAll(`input`);
let delayObject = {};
let amountRepeat = 0;
let timerId = { intervalId: 0, timeoutId: 0 };

let getDelayObject = () => {
  delayFields.forEach(
    elem => (delayObject[elem.getAttribute(`name`)] = elem.value)
  );
};

let resultBtnIsBlock = value => (resultButton.disabled = value);

function mainController() {
  event.preventDefault();
  getDelayObject();
  amountRepeat = 0;
  cleaningTimer();
  startTimeout();
  resultBtnIsBlock(true); // Disable the button when promises start
}

let startTimeout = () => {
  timerId.timeoutId = setTimeout(() => {
    createPromise();
    startInterval();
  }, delayObject.delay);
};

let startInterval = () => {
  timerId.intervalId = setInterval(() => {
    createPromise();
  }, delayObject.step);
};

let createPromise = () => {
  amountRepeat++;
  if (amountRepeat <= delayObject.amount) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      console.log(`ok`);
      Notiflix.Notify.success(
        `Fulfilled promise ${amountRepeat} in ${delayObject.step}ms`
      );
    } else {
      console.log(`not ok`);
      Notiflix.Notify.failure(
        `Rejected promise ${amountRepeat} in ${delayObject.step}ms`
      );
    }
  } else {
    cleaningTimer();
    resultBtnIsBlock(false); // Re-enable the button when promises are completed
  }
};

let cleaningTimer = () => {
  clearTimeout(timerId.intervalId);
  clearInterval(timerId.timeoutId);
};

function changeController() {
  for (const element of delayFields) {
    if (element.value < 0 || element.value == ``) {
      return resultBtnIsBlock(true);
    }
  }
  resultBtnIsBlock(false); // Re-enable the button when valid values are entered
}

resultButton.addEventListener(`click`, mainController);
delayForm.addEventListener(`input`, changeController); // Use 'input' event for immediate validation

resultBtnIsBlock(true);


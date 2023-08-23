import Notiflix from 'notiflix';

const resultButton = document.querySelector(`.form > button`);
const delayForm = document.querySelector(`.form`);
let delayFields = document.querySelectorAll(`input`);
let delayObject = {};
let amountRepeat = 0;
let timerId = { intervalId: 0, timeoutId: 0 };
let promisesExecuting = false; // Flag to track promise execution status

// Create new Object with delay property

let getDelayObject = () => {
  delayFields.forEach(
    elem => (delayObject[elem.getAttribute(`name`)] = elem.value)
  );
};

// Change button status

let resultBtnIsBlock = value => (resultButton.disabled = value);

// Main mainController

function mainController() {
  event.preventDefault();
  if (promisesExecuting) {
    return; // If promises are already executing, do not proceed
  }
  getDelayObject();
  amountRepeat = 0;
  cleaningTimer();
  startTimeout();
}

// First stage (first timeout delay)

let startTimeout = () => {
  timerId.timeoutId = setTimeout(() => {
    promisesExecuting = true; // Set the flag to indicate promises are executing
    createPromise();
    startInterval();
  }, delayObject.delay);
};

// Second stage (setInterval)

let startInterval = () => {
  timerId.intervalId = setInterval(() => {
    createPromise();
  }, delayObject.step);
};

// Check terms;

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
    promisesExecuting = false; // Reset the flag when all promises are executed
    resultBtnIsBlock(false); // Enable the button when promises are done
  }
};

let cleaningTimer = () => {
  clearTimeout(timerId.intervalId);
  clearInterval(timerId.timeoutId);
};

// Check validation

function changeController() {
  for (const element of delayFields) {
    if (element.value < 0 || element.value === '') {
      return resultBtnIsBlock(true);
    }
  }
  return resultBtnIsBlock(false);
}

// Event Listeners

resultButton.addEventListener(`click`, mainController);
delayForm.addEventListener(`change`, changeController);

// Main

resultBtnIsBlock(true);

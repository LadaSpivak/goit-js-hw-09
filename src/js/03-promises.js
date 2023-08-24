

// import Notiflix from 'notiflix';

// const resultButton = document.querySelector('.form > button');
// const delayForm = document.querySelector('.form');
// const delayFields = document.querySelectorAll('input');
// const delayObject = {};
// let amountRepeat = 0;
// const timerId = { intervalId: 0, timeoutId: 0 };

// const getDelayObject = () => {
//   delayFields.forEach(
//     element => (delayObject[element.getAttribute('name')] = element.value)
//   );
// };

// const setResultButtonDisabled = value => (resultButton.disabled = value);

// function mainController(event) {
//   event.preventDefault();
//   getDelayObject();
//   amountRepeat = 0;
//   clearTimers();
//   startTimeout();
//   setResultButtonDisabled(true); // Disable the button immediately
// }

// const startTimeout = () => {
//   timerId.timeoutId = setTimeout(() => {
//     createPromise();
//     startInterval();
//     setResultButtonDisabled(false); // Enable the button after the promises are started
//   }, delayObject.delay);
// };

// const startInterval = () => {
//   timerId.intervalId = setInterval(() => {
//     createPromise();
//   }, delayObject.step);
// };

// const createPromise = () => {
//   amountRepeat++;
//   if (amountRepeat <= delayObject.amount) {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       console.log('ok');
//       Notiflix.Notify.success(
//         `Fulfilled promise ${amountRepeat} in ${delayObject.step}ms`
//       );
//     } else {
//       console.log('not ok');
//       Notiflix.Notify.failure(
//         `Rejected promise ${amountRepeat} in ${delayObject.step}ms`
//       );
//     }
//   } else {
//     clearTimers();
//   }
// };

// const clearTimers = () => {
//   clearTimeout(timerId.intervalId);
//   clearInterval(timerId.timeoutId);
// };

// function changeController() {
//   for (const element of delayFields) {
//     if (element.value < 0 || element.value === '') {
//       return setResultButtonDisabled(true);
//     }
//   }
//   return setResultButtonDisabled(false);
// }

// resultButton.addEventListener('click', mainController);
// delayForm.addEventListener('change', changeController);

// setResultButtonDisabled(true);
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
  return resultBtnIsBlock(false);
}

resultButton.addEventListener(`click`, mainController);
delayForm.addEventListener(`change`, changeController);

resultBtnIsBlock(true);

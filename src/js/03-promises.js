

import Notiflix from 'notiflix';

const resultButton = document.querySelector('.form > button');
const delayForm = document.querySelector('.form');
const delayFields = document.querySelectorAll('input');
let delayObject = {};
let timerId = { intervalId: 0, timeoutId: 0 };

function getDelayObject() {
  delayFields.forEach(elem => (delayObject[elem.getAttribute('name')] = elem.value));
}

function resultBtnIsBlock(value) {
  resultButton.disabled = value;
}

async function mainController(event) {
  event.preventDefault();
  getDelayObject();
  cleaningTimer();
  resultBtnIsBlock(true);
  const amount = delayObject.amount || 1;
  
  for (let pos = 1; pos <= amount; pos += 1) {
    try {
      await createPromise(pos);
    } catch (error) {
      console.error(error);
    }
  }

  resultBtnIsBlock(false);
}

function startTimeout() {
  timerId.timeoutId = setTimeout(() => {
    startInterval();
  }, delayObject.delay);
}

function startInterval() {
  timerId.intervalId = setInterval(() => {
    createPromise();
  }, delayObject.step);
}

function createPromise(position) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position });
      } else {
        reject({ position });
      }
    }, delayObject.step);
  }).then(({ position }) => {
    console.log(`✅ Fulfilled promise ${position}`);
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delayObject.step}ms`);
  }).catch(({ position }) => {
    console.log(`❌ Rejected promise ${position}`);
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delayObject.step}ms`);
  });
}

function cleaningTimer() {
  clearTimeout(timerId.intervalId);
  clearTimeout(timerId.timeoutId);
}

function changeController() {
  for (const element of delayFields) {
    if (element.value < 0 || element.value === '') {
      return resultBtnIsBlock(true);
    }
  }
  resultBtnIsBlock(false);
}

resultButton.addEventListener('click', mainController);
delayForm.addEventListener('input', changeController);

resultBtnIsBlock(true);



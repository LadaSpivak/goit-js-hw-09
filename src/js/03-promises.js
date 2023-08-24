

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

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Disable the button

  const delayInput = this.querySelector('input[name="delay"]');
  const stepInput = this.querySelector('input[name="step"]');
  const amountInput = this.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  let promisesCompleted = 0; // To keep track of completed promises

  if (!isNaN(delay) && !isNaN(step) && !isNaN(amount)) {
    for (let i = 1; i <= amount; i++) {
      createPromise(i, delay + (i - 1) * step)
        .then(({ position, delay }) => {
          Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
        })
        .finally(() => {
          promisesCompleted++;
          if (promisesCompleted === amount) {
            submitButton.disabled = false; // Enable the button again
          }
        });
    }
  } else {
    Notiflix.Notify.Warning('Please fill in all the fields with valid numbers.');
  }
});

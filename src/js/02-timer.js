import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

const startBtn = document.querySelector(`[data-start]`);
let timerId;
let deadline;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // minDate: Date.now(),
  onClose(selectedDates) {
    deadline = selectedDates[0].getTime();
    deadline > Date.now()
      ? startBtnIsBlock(false)
      : startBtnIsBlock(true) &&
        Notiflix.Report.failure(
          'Error!',
          'It`s not correct time. Please, think about the future!',
          'Close'
        );
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  startBtnIsBlock(true);
  timerId = setInterval(() => {
    let differenceTime = deadline - Date.now();
    isFinishCheck(differenceTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Filling Timer fields

let fillingTimeField = (data, value) => {
  return (document.querySelector(`[data-${data}]`).textContent =
    addLeadingZero(value));
};

// Change `Start button` status

let startBtnIsBlock = value => (startBtn.disabled = value);

// Adding `0` before number if this need

let addLeadingZero = value => {
  return value < 10 ? `0${value}` : value;
};

startBtn.addEventListener(`click`, startTimer);

// Finish timer

function isFinishCheck(time) {
  if (time >= 0) {
    let timeLeft = convertMs(time);
    fillingTimeField(`days`, timeLeft.days);
    fillingTimeField(`hours`, timeLeft.hours);
    fillingTimeField(`minutes`, timeLeft.minutes);
    fillingTimeField(`seconds`, timeLeft.seconds);
  } else {
    Notify.success(`Time is over!`);
    return clearInterval(timerId);
  }
}

// Main

startBtnIsBlock(true);

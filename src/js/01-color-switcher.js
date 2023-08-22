const getElement = element => document.querySelector(element);
const startButton = getElement(`[data-start]`);
const stopButton = getElement(`[data-stop]`);
let intervalId;

startButton.addEventListener(`click`, function () {
  startIsActive(true);
  intervalId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener(`click`, function () {
  startIsActive(false);
  clearInterval(intervalId);
});

function startIsActive(status) {
  return (startButton.disabled = status);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
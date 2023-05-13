const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body')
let timerId = null;

btnStart.addEventListener('click', onClickStartGenerateColors);
btnStop.addEventListener('click', onClickStopGenerateColors);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onClickStartGenerateColors() {
    
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();    
    }, 1000)
    btnStart.disabled = true;
}

function onClickStopGenerateColors() {
    clearInterval(timerId)
    btnStart.disabled = false;
}


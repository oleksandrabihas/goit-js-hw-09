import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const daysRemaining = document.querySelector('[data-days]');
const hoursRemaining = document.querySelector('[data-hours]');
const minutesRemaining = document.querySelector('[data-minutes]');
const secondsRemaining = document.querySelector('[data-seconds]');
button.disabled = true;
datetimePicker.disabled = false;
let intervalId = null;
let selectedDate = null;
let currentDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onDateCheck(selectedDates);
    }
}
let leftTime = 0;

function onDateCheck(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();
    if (selectedDate > currentDate) {
        button.disabled = false;
        return
    } else {
        window.alert('Please choose a date in the future');  
    }
}
flatpickr(datetimePicker, options);
button.addEventListener('click', onClickStartTimer)

function onClickStartTimer() {
    datetimePicker.disabled = true;
    const inrervalId = setInterval(() => {
      if (selectedDate - currentDate >= 1000) {
        button.disabled = true;
        currentDate += 1000;
        leftTime = Math.floor(selectedDate - currentDate);
        convertMs(leftTime);
      } else {
          clearInterval(inrervalId);
          datetimePicker.disabled = false;
          button.disabled = false;
      }
    }, 1000);
}
function createMarkup({ days, hours, minutes, seconds }) {
    daysRemaining.textContent = days;
    hoursRemaining.textContent = hours;
    minutesRemaining.textContent = minutes;
    secondsRemaining.textContent = seconds;
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

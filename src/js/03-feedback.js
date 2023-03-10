import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));

populateText();

function onFormSubmit(event) {
  event.preventDefault();

  console.log('Отправляем форму');
  console.log(formData);
  formData = {};

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateText() {
  const saveData = localStorage.getItem(STORAGE_KEY);
  if (saveData) {
    formData = JSON.parse(saveData);
  }

  const entries = Object.entries(formData);

  entries.forEach(function (el) {
    const [key, value] = el;
    form[key].value = value;
  });
}

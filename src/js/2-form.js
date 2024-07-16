let formData = { email: '', message: '' };

const LS_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(LS_KEY);
if (savedData) {
  let parsedData = {};
  try {
    parsedData = JSON.parse(savedData);
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }

  if (parsedData.email) {
    formData.email = parsedData.email;
    form.email.value = parsedData.email;
  }
  if (parsedData.message) {
    formData.message = parsedData.message;
    form.message.value = parsedData.message;
  }
}

const saveData = () => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(formData));
  } catch (err) {
    console.error('Error stringifying JSON:', err);
  }
};

form.addEventListener('input', event => {
  if (event.target.name === 'email') {
    formData.email = event.target.value;
  } else if (event.target.name === 'message') {
    formData.message = event.target.value;
  }
  saveData();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  formData = { email: '', message: '' };
  localStorage.removeItem(LS_KEY);
  form.reset();
});

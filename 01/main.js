const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const repass = document.getElementById('repass');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'field error';
  const small = formControl.querySelector('.small');
  small.innerText = message;
}

function showSuccess(input) {
  const field = input.parentElement;
  field.className = 'field success';
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function check(inputs) {
  inputs.forEach((input) => {
    if (input.value === '') {
      showError(input, `${properMessage(input.id)} is required.`);
    } else if (input.id === 'email') {
      if (!isValidEmail) {
        showError(input, 'Please provide a valid email.');
      } else {
        showSuccess(input);
      }
    } else if (input.id === 'repass') {
      const pass = document.getElementById('pass');
      if (pass.value !== '') {
        if (!passwordCheck(pass.value, input.value)) {
          showError(input, 'Password did not match');
        } else {
          showSuccess(input);
        }
      }
    } else {
      showSuccess(input);
    }
  });
}

function properMessage(inputId) {
  return inputId.charAt(0).toUpperCase() + inputId.slice(1);
}

function passwordCheck(firstPass, secondPass) {
  return firstPass === secondPass;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = [fname, lname, username, email, pass, repass];
  check(inputs);
});

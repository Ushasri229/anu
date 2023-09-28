const formOpenBtn = document.querySelector('#form-open'),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginForm = document.querySelector("#login-form"),
  signupForm = document.querySelector("#signup-form");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => {
  home.classList.remove("show");
  resetForms(); // Reset the forms when closing
});
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    togglePasswordVisibility(icon);
  });
});

// Simulated user database
const users = [];

// Function to hash a password (not secure for production)
function hashPassword(password) {
  // In a real application, use a proper hashing library like bcrypt
  return password;
}

// Function to check if an email is already registered
function isEmailRegistered(email) {
  return users.some((user) => user.email === email);
}

// Function to reset forms
function resetForms() {
  loginForm.reset();
  signupForm.reset();
}

// Function to show a message
function showMessage(message) {
  alert(message);
}

// Function to handle user registration
function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Check if the email is already registered
  if (isEmailRegistered(email)) {
    showMessage('Email is already registered. Please use a different email.');
    return;
  }

  // Hash the password (in a real application, use bcrypt)
  const hashedPassword = hashPassword(password);

  // Create a new user object and add it to the user database
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  showMessage('Signup successful. You can now log in.');
  resetForms();
}

// Function to handle user login
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Find the user by email
  const user = users.find((u) => u.email === email);

  // Check if the user exists and the password matches (in a real application, compare hashed passwords)
  if (user && user.password === hashPassword(password)) {
    showMessage('Login successful.');
    resetForms();
  } else {
    showMessage('Login failed. Please check your email and password.');
  }
}

// Event listeners for signup and login buttons
document.getElementById('signup-button').addEventListener('click', (e) => {
  e.preventDefault();
  signup();
});

document.getElementById('login-button').addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

// Function to toggle password visibility
function togglePasswordVisibility(icon) {
  let getPwInput = icon.parentElement.querySelector("input");
  if (getPwInput.type === "password") {
    getPwInput.type = "text";
    icon.classList.replace("uil-eye-slash", "uil-eye");
  } else {
    getPwInput.type = "password";
    icon.classList.replace("uil-eye", "uil-eye-slash");
  }
}

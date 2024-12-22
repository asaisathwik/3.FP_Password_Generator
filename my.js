const length = document.getElementById("passwordLength");
const button = document.querySelector("button");
const passwords = document.querySelectorAll(".input--password");

const specialchar = document.getElementById("special-char");
const uppercase = document.getElementById("uperrcase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");

const message = document.querySelector(".error-message");

// Helper function to pick a random character from an array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate a random character based on the active options
function randomChar() {
  let charSet = "";

  // Include characters from selected sliders
  if (specialchar.value == 1) charSet += "!@#$%^&*()_+{}[]<>?";
  if (uppercase.value == 1) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase.value == 1) charSet += "abcdefghijklmnopqrstuvwxyz";
  if (numbers.value == 1) charSet += "0123456789";

  // Return empty string if no character set is selected
  if (charSet.length === 0) return "";

  // Return a random character from the combined character set
  return randomItem(charSet);
}

// Generate a password of the specified length
function makePassword(length, word) {
  for (let i = 0; i < length; i++) {
    const char = randomChar();
    if (!char) {
      return "Please select at least one option!"; // No options selected
    }
    word += char;
  }
  return word;
}

// Main function to generate passwords and display them
function generatePassword() {
  let word = "";
  message.classList.remove("visibility");

  // Validate password length input
  if (length.value <= 0) {
    return displayErrorMessage("Password must have at least one character.");
  } else if (length.value > 20) {
    return displayErrorMessage(
      "Password length must not exceed 20 characters."
    );
  } else {
    // Generate passwords for all input fields
    passwords.forEach((password) => {
      const generatedPassword = makePassword(length.value, word);
      if (generatedPassword.includes("Please select")) {
        displayErrorMessage(generatedPassword); // Display error if no options
      } else {
        password.value = generatedPassword; // Set the generated password
      }
    });
  }
}

// Display error messages
function displayErrorMessage(text) {
  message.classList.add("visibility");
  message.textContent = text;
}

// Display success message when a password is copied
function coppyMessage() {
  message.classList.add("visibility");
  message.textContent = "Password copied!";
}

// Copy password to clipboard
function copyToClipboard() {
  this.select();
  this.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(this.value);

  if (this.value != "") {
    coppyMessage();
  }
}

// Attach event listeners
button.addEventListener("click", generatePassword);
passwords.forEach((password) => {
  password.addEventListener("click", copyToClipboard);
});

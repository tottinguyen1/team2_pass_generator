/*const lengthSlider = document.querySelector(".pass-length input"),
      options = document.querySelectorAll(".option input"),
      copyIcon = document.querySelector(".input-box span"),
      passwordInput = document.querySelector(".input-box input"),
      passIndicator = document.querySelector(".pass-indicator"),
      generateBtn = document.querySelector(".generate-btn");

const characters = { // object of letters, numbers & symbols
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}:<>?;,-=~`"
}
/* ************** */
/*const generatePassword = () => {
  let staticPassword = "",
      randomPassword = "",
      excludeDuplicate = false,
      passLength = lengthSlider.value;
  
  options.forEach(option => { // looping through each option's checkbox
    if(option.checked) { // if checkbox is checked
      // if checkbox id isn't exc-duplicate && spaces
      if(option.id !== "exc-duplicate" && option.id !== "spaces") {
        // adding particular key value from character object to staticPassword
        staticPassword += characters[option.id];
      } else if(option.id === "spaces") { // if checkbox id is spaces
        staticPassword += " "; // adding space at the beginning of staticPassword
      } else { // else pass true value to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      if (!randomPassword.includes(randomChar)) {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
};
/* ************** */
/*const updatePassIndicator = () => {
  // if lengthSlider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider 
  // value is less than 16 then pass "medium" as id else pass "strong" as id
  passIndicator.id = lengthSlider.value < 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}
/* ************** */
/*const updateSlider = () => {
  // passing slider value as counter text
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}
/* ************** */
//updateSlider();
/* ************** */
/*const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // copying random password
  copyIcon.innerText = "check"; // changing copy icon to tick
  copyIcon.style.color = "#4285F4";
  setTimeout(() => { // after 1500 ms, changing tick icon back to copy
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#050a30"
  }, 1500);
}
/* ************** */
/*copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
*/

// Get references to HTML elements
const lengthSlider = document.getElementById("length");
const generateButton = document.getElementById("generate-btn");
const copyIcon = document.getElementById("icon");
const passwordIndicator = document.querySelector(".pass-indicator");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = lowercaseLetters.toUpperCase();
const digits = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:'<>,.?/";

/**
 * Generates a password based on user-selected options.
 */
function generatePassword() {
  // Retrieve user-selected options
  const length = document.getElementById("length").value;
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;
  const spaces = document.getElementById("spaces").checked;
  const excludeDuplicate = document.getElementById("exc-duplicate").checked;

  // If all options are unchecked, default to including all types and excluding duplicates and spaces
  if (!uppercase && !lowercase && !numbers && !symbols && !spaces) {
      const password = generatePasswordString(length, true, true, true, true, false, true);
      document.getElementById("generatedPassword").value = password;
      document.getElementById("displayLength").innerText = length;
      return;
  }
  // Generate password based on user-selected options
  const password = generatePasswordString(length, uppercase, lowercase, numbers, symbols, spaces, excludeDuplicate);
  document.getElementById("generatedPassword").value = password;
  document.getElementById("displayLength").innerText = length;
}

/**
 * Generates a password string based on specified options.
 */
function generatePasswordString(length, uppercase, lowercase, numbers, symbols, spaces, excludeDuplicate) {
  // Get the character set based on the specified options
  let characterSet = getCharacterSet(uppercase, lowercase, numbers, symbols, spaces);
  // Initialize an empty password string
  let password = "";
  // Generate the password by randomly selecting characters from the character set
  for (let i = 0; i < length; i++) {
      password += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
  }
  // If excludeDuplicate is true, ensure that the password does not contain duplicate characters
  if (excludeDuplicate) {
      while (hasDuplicate(password)) {
          password = generatePasswordString(length, uppercase, lowercase, numbers, symbols, spaces, excludeDuplicate);
      }
  }
  // If spaces are included and password does not contain a space, add one space
  if (spaces && !password.includes(' ')) {
      const index = Math.floor(Math.random() * length);
      password = password.substring(0, index) + ' ' + password.substring(index);
  }
  // Return the generated password string
  return password;
}

/**
 * Generates a character set based on the specified options.
 */
function getCharacterSet(includeUppercase, includeLowercase, includeNumbers, includeSymbols, includeSpaces) {
  let characterSet = "";
  // Add uppercase letters if specified
  if (includeUppercase) {
    characterSet += uppercaseLetters;
  }
  // Add lowercase letters if specified
  if (includeLowercase) {
    characterSet += lowercaseLetters;
  }
  // Add numbers if specified
  if (includeNumbers) {
    characterSet += digits;
  }
  // Add symbols if specified
  if (includeSymbols) {
    characterSet += symbols;
  }
  // Add space if specified
  if (includeSpaces) {
    characterSet += " ";
  }
  // Return the generated character set
  return characterSet;
}

/**
 * Checks if a password contains duplicate characters.
*/
function hasDuplicate(password) {
  // Convert the password string to a Set to automatically remove duplicate characters
  const set = new Set(password);
  // If the size of the Set is not equal to the length of the original password string,
  // it means there were duplicate characters
  return set.size !== password.length;
}

/**
 * Copies the generated password to the clipboard.
 */
function copyToClipboard() {
  // Get the generated password from the input field
  const generatedPassword = document.getElementById("generatedPassword").value;
  // Write the generated password to the clipboard
  navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        // If successful, show an alert and change the copy icon to a tick
          alert("Password copied to clipboard!");
          copyIcon.innerText = "check"; // changing copy icon to tick
          copyIcon.style.color = "#4285F4";
          setTimeout(() => { // after 1500 ms, changing tick icon back to copy
            copyIcon.innerText = "copy_all";
            copyIcon.style.color = "#050a30"
          }, 1500);
      })
      .catch(err => {
        // If there's an error, log it to the console
          console.error('Could not copy text: ', err);
      });
}
/**
 * Updates the password strength indicator based on the value of length. 
 */
function updatePassIndicator(){
  //passwordIndicator.id = lengthSlider.value < 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
  // Check the value of password length and set the password indicator accordingly
  if(lengthSlider.value <= 8){
    // If password length is less than or equal to 8, set password indicator to "weak"
    passwordIndicator.id = "weak";
  }
  else if(lengthSlider.value <= 16 ){
    // If password length is less than or equal to 16, set password indicator to "medium"
    passwordIndicator.id = "medium";
  }
  else if (lengthSlider.value <= 24) {
    // If password length is less than or equal to 24, set password indicator to "high"
    passwordIndicator.id = "high";
  }
  else
  // If password length is greater than 24, set password indicator to "strong"
  passwordIndicator.id = "strong";
}
/**
 * Adds an event listener to the 'load' event of the window to generate a password when the page loads.
 */
window.addEventListener('load', generatePassword);
/**
 * Adds an event listener to the 'load' event of the window to update a password indicator when the page loads.
 */
window.addEventListener('load', updatePassIndicator);
/**
 * Adds an event listener to the 'click' event of the generateButton element to generate a password when the button is clicked.
 */
generateButton.addEventListener("click", generatePassword);
/**
 * Adds an event listener to the 'click' event of the copyIcon element to copy the generated password to the clipboard when the icon is clicked.
 */
copyIcon.addEventListener("click", copyToClipboard);
/**
 * Adds an event listener to the 'input' event of the lengthSlider element to update the display of password length when the slider value changes.
 */
lengthSlider.addEventListener("input", function() {
  document.getElementById("displayLength").innerText = this.value;
});
/**
 * Adds an event listener to the 'input' event of the lengthSlider element to update the display of password indicator when the slider value changes.
 */
lengthSlider.addEventListener("input", updatePassIndicator);
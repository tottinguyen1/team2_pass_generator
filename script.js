// Wait for the entire HTML document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  
  // Define character sets used for password generation
  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+{}:<>?;,-=~`"
  };
  
  // Select key elements from the document for later manipulation
  const lengthSlider = document.querySelector(".pass-length input"),
        options = document.querySelectorAll(".option input"),
        copyIcon = document.querySelector(".input-box span"),
        passwordInput = document.querySelector(".input-box input"),
        passIndicator = document.querySelector(".pass-indicator"),
        generateBtn = document.querySelector(".generate-btn");
  
  // Function to generate a password based on selected options
  function generatePassword() {
    let availableCharacters = "",
        // Check if duplicates should be excluded    
        excludeDuplicates = document.getElementById("exc-duplicate").checked,
        // Check if spaces should be included
        includeSpaces = document.getElementById("spaces").checked,
        // Get desired password length from slider
        randomPassword = "";
        passLength = parseInt(lengthSlider.value, 10),
        randomPassword = "";

    // Build string of available characters by concatenating the selected character sets 
    if (document.getElementById("lowercase").checked) availableCharacters += characters.lowercase;
    if (document.getElementById("uppercase").checked) availableCharacters += characters.uppercase;
    if (document.getElementById("numbers").checked) availableCharacters += characters.numbers;
    if (document.getElementById("symbols").checked) availableCharacters += characters.symbols;
    if (includeSpaces) availableCharacters += " ";

    // Handling empty selection
    if (availableCharacters.length === 0) {
      passwordInput.value = "Please select at least one character type.";
      return;
    }

    // Handling exclusion of duplicates with insufficient unique characters
    if (excludeDuplicates && passLength > availableCharacters.length) {
      passwordInput.value = "Cannot generate password with unique characters due to length.";
      return;
    }

    // Shuffle available characters to randomize their order
    let charactersArray = shuffleArray(availableCharacters.split(''));

    // Generate the password by selecting characters from the shuffled array
    for (let i = 0; i < passLength; i++) {
      // When excluding duplicates, ensure there are enough characters
      if (excludeDuplicates && i >= charactersArray.length) {
        break;
      }
      let charIndex = excludeDuplicates ? i : getRandomNumber(charactersArray.length);
      randomPassword += charactersArray[charIndex];
    }

    // Ensure at least one space is included if the "Include Spaces" option is checked
    if (includeSpaces && !randomPassword.includes(" ")) {
      let spaceIndex = getRandomNumber(randomPassword.length);
      randomPassword = randomPassword.substring(0, spaceIndex) + " " + randomPassword.substring(spaceIndex);
    }
    
    // Display the generated password in the input field
    passwordInput.value = randomPassword;
  }

  // Function to shuffle an array using the Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = getRandomNumber(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to obtain a cryptographically secure random number
  function getRandomNumber(max) {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  
  // Function to update the password strength indicator based on the slider value
  function updatePassIndicator() {
    passIndicator.id = lengthSlider.value < 11 ? "weak" : lengthSlider.value <= 15 ? "medium" : "strong";
  }

  // Function to handle updates to the slider and refresh the password strength indicator
  function updateSlider() {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    updatePassIndicator();
  }

  // Function to handle copying the password to the clipboard and providing user feedback
  function copyPassword() {
    navigator.clipboard.writeText(passwordInput.value).then(() => {
      copyIcon.innerText = "check";
      copyIcon.style.color = "#4285F4";
      setTimeout(() => {
        copyIcon.innerText = "content_copy";
        copyIcon.style.color = "#050a30";
      }, 1500);
    });
  }

  // Event listeners for users interactions
  copyIcon.addEventListener("click", copyPassword);
  lengthSlider.addEventListener("input", updateSlider);
  generateBtn.addEventListener("click", generatePassword);

  // Initialize the UI elements based on current settings
  updateSlider();
});
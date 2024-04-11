const lengthSlider = document.querySelector(".pass-length input"),
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
const generatePassword = () => {
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
const updatePassIndicator = () => {
  // if lengthSlider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider 
  // value is less than 16 then pass "medium" as id else pass "strong" as id
  passIndicator.id = lengthSlider.value < 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}
/* ************** */
const updateSlider = () => {
  // passing slider value as counter text
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}
/* ************** */
updateSlider();
/* ************** */
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // copying random password
  copyIcon.innerText = "check"; // changing copy icon to tick
  copyIcon.style.color = "#4285F4";
  setTimeout(() => { // after 1500 ms, changing tick icon back to copy
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#050a30"
  }, 1500);
}
/* ************** */
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);


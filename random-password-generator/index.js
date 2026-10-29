const copyButton = document.getElementById("copy");
const lengthInput = document.getElementById("length");
const statusElement = document.getElementById("status");
const passwordInput = document.getElementById("password");
const generateButton = document.getElementById("generate");
const lengthValue = document.getElementById("length-value");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const textButton = () => {
  copyButton.textContent = "Copy";
  statusElement.textContent = "Uses letters, numbers, and symbols.";
};

const generatePassword = () => {
  let password = "";
  const random = new Uint32Array(1);

  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;

  for (let i = 0; i < Number(lengthInput.value); i++) {
    do {
      crypto.getRandomValues(random);
    } while (random[0] >= limit);

    password += characters[random[0] % characters.length];
  }

  passwordInput.value = password;
  defaultText();
};

lengthInput.addEventListener("input", () => {
  lengthValue.value = lengthInput.value;
  generatePassword();
});

generateButton.addEventListener("click", generatePassword);

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(passwordInput.value);

  copyButton.textContent = "Copied!";
  statusElement.textContent = "Password copied to clipboard.";

  setTimeout(textButton, 1500);
});

generatePassword();
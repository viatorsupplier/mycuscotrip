const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function updateButtonState() {
  if (emailInput.value.trim() !== "") {
    submitBtn.classList.add("active");
  } else {
    submitBtn.classList.remove("active");
  }
}

emailInput.addEventListener("input", () => {
  errorMsg.textContent = "";
  updateButtonState();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    errorMsg.textContent = "Por favor, ingrese su correo electrónico.";
    emailInput.focus();
    return;
  }

  if (!validateEmail(email)) {
    errorMsg.textContent = "Ingrese un correo electrónico válido.";
    emailInput.focus();
    return;
  }

  errorMsg.textContent = "";

  // Aquí puedes redirigir al siguiente paso del login
  // window.location.href = "password.html";

  alert("Correo válido. Aquí puedes continuar con el siguiente paso.");
});

updateButtonState();

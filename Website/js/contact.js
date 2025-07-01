const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

// Validate individual fields with real-time error display
function validateField(input, pattern, errorElement, errorMessage) {
  if (input.value.trim() === "") {
    errorElement.textContent = ""; // Clear error for empty fields
    return false; // Empty fields are considered invalid
  } else if (!pattern.test(input.value)) {
    errorElement.textContent = errorMessage; // Show error if invalid
    return false;
  } else {
    errorElement.textContent = ""; // Clear error when valid
    return true;
  }
}

document.getElementById("name").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Restricts numbers & special characters
});

function validateForm() {
  let isValidName = validateField(
    nameInput,
    /.+/,
    nameError,
    "Name is required."
  );
  let isValidEmail = validateField(
    emailInput,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    emailError,
    "Invalid email format."
  );
  let isValidPhone = validateField(
    phoneInput,
    /^\d{10}$/,
    phoneError,
    "Phone number must be 10 digits."
  );
  let isValidMessage = validateField(
    messageInput,
    /.+/,
    messageError,
    "Message is required."
  );

  submitBtn.disabled = !(
    isValidName &&
    isValidEmail &&
    isValidPhone &&
    isValidMessage
  );
}

// Attach real-time validation for every field
nameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
phoneInput.addEventListener("input", validateForm);
messageInput.addEventListener("input", validateForm);

phoneInput.addEventListener("input", function () {
  let phone = this.value;
  phone = phone.replace(/\D/g, ""); // Remove non-numeric characters
  this.value = phone;
  validateForm();
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Disable the submit button immediately upon form submission
  submitBtn.disabled = true;

  // Send the form data to Web3Forms API
  const formData = new FormData(this);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Show success message with Sweet Alert
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        });

        document.getElementById("contactForm").reset(); // Reset the form
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an error sending your message. Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
        });

        document.getElementById("contactForm").reset(); // Reset the form
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Error!",
        text: "Error submitting the form: " + error,
        icon: "error",
        confirmButtonText: "Okay",
      });

      document.getElementById("contactForm").reset(); // Reset the form
    })
    .finally(() => {
      submitBtn.disabled = false; // Re-enable the submit button once the process is complete
    });
});

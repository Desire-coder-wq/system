document.getElementById("productForm").addEventListener("submit", function (e) {
  let valid = true;
  document.querySelectorAll(".error-message").forEach(msg => msg.remove());

  // Check required inputs
  ["name", "category", "price", "quantity", "color", "image"].forEach(id => {
    const field = document.getElementById(id);
    if (!field.value || field.value.trim() === "") {
      valid = false;
      field.classList.add("error-field");
      const errorMsg = document.createElement("div");
      errorMsg.classList.add("error-message");
      errorMsg.style.color = "red";
      errorMsg.style.fontSize = "12px";
      errorMsg.style.marginTop = "5px";
      errorMsg.innerText = "Invalid field";
      field.parentElement.appendChild(errorMsg);
    } else {
      field.classList.remove("error-field");
    }
  });

  if (!valid) {
    e.preventDefault(); // stop form submit
  }
});

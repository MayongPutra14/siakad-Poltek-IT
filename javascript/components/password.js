const passwordInput = document.getElementById("password");
const openIcon = document.getElementById("open-password");
const closeIcon = document.getElementById("close-password");

function openPassword() {
  passwordInput.type = "text";
  openIcon.style.display = "none";
  closeIcon.style.display = "block";
}

function closePassword() {
   passwordInput.type = "password";
  closeIcon.style.display = "none";
  openIcon.style.display = "block";

}

openIcon.addEventListener("click", openPassword);
closeIcon.addEventListener("click", closePassword);

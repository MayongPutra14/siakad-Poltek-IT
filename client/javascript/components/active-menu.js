const menuList = document.querySelectorAll(".sidebar-menu ul li a");

function menuActive(event) {
  // remove class .selected from all links
  menuList.forEach((menu) => {
    menu.classList.remove("selected"); // remove .selected class form li elements
  });

  // add class .selected for element that just clicked
  event.target.classList.add("selected");
}

menuList.forEach((menu) => {
  menu.addEventListener("click", menuActive);
});

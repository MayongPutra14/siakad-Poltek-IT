const menuToggle = document.querySelector('.menu-toggle'); // take menu icon(hamburger menu).
const sidebar = document.querySelector('.sidebar');// take sidebar includ it children(aside element)
const closeBtn = document.querySelector('.close-btn') // take close icon(X button) 

function openSidebar() {
  sidebar.classList.toggle('active') // add .active when menu-toggle is cliked.
}
menuToggle.addEventListener('click', openSidebar);

function closeSidebar() {
  sidebar.classList.remove('active') // close sidebar when X button is clicked.
}
closeBtn.addEventListener('click', closeSidebar)

// code to close navbar when clicked outside
function closeNavbarOutsideClick(event) {
  const targetElment = event.target; //take menu icon(hamburger menu).
  const isNavbar =  sidebar.contains(targetElment); //navbar condition open or close.
  const isMenubar = menuToggle.contains(targetElment);// hamburger menu cliked or not
  const isNavbarOpen = sidebar.classList.contains('active'); // check weather sidebar contains .active or not.
  
  // If the navbar is open and the clicked element is outside both the navbar and menubar, close the navbar
  if(isNavbarOpen && !isNavbar && !isMenubar ) {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
  }
}
document.addEventListener('click', closeNavbarOutsideClick)

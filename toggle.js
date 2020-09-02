var btn = document.getElementById("toggle");
var menu = document.getElementById("menu");
btn.addEventListener("click", toggleMenu)
menu.addEventListener("click", toggleMenu)

function toggleMenu() {
  if (menu.classList.contains('open')) {
    menu.classList.remove('open')
  } else {
    menu.classList.add('open')

  }
  }

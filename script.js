// Плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    var id = link.getAttribute("href");
    if (id && id.startsWith("#")) {
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        closeMenu();
      }
    }
  });
});

// Бургер-меню
var burger = document.querySelector(".burger");
var nav = document.getElementById("nav");

function closeMenu() {
  if (!nav) return;
  nav.classList.remove("open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}

if (burger && nav) {
  burger.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// Закрыть меню при клике вне его
document.addEventListener("click", function (e) {
  if (!nav || !burger) return;
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});

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

// LLM demo: POST to local FastAPI proxy (llm-demo/app.py)
(function () {
  const form = document.getElementById('llm-form');
  if (!form) return;
  const input = document.getElementById('llm-input');
  const out = document.getElementById('llm-out');
  const API = 'http://localhost:8000';
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    out.textContent = '...';
    try {
      const r = await fetch(API + '/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const data = await r.json();
      out.textContent = data.response || data.answer || JSON.stringify(data, null, 2);
    } catch (err) {
      out.textContent = 'Ошибка: ' + err.message + '\n(Проверьте, что llm-demo запущен на :8000)';
    }
  });
})();

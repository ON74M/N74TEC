/* =====================================================
   N74 TEC - SYSTEM JS
   FULL ULTRA MATRIX EDITION
   ===================================================== */

/* =========================
   MATRIX BACKGROUND
   ========================= */

(function () {
  const canvas = document.getElementById("matrix");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let fontSize = 15;
  let chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";
  let columns = 0;
  let drops = [];

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      let text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += 0.75;
    }
  }

  window.addEventListener("resize", init);

  init();
  setInterval(draw, 45);
})();

/* =========================
   MENU SYSTEM
   ========================= */

(function () {
  const menuButton = document.getElementById("menuButton");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!menuButton || !sideMenu || !menuOverlay) return;

  function openMenu() {
    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");
  }

  function closeMenu() {
    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
  }

  menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    openMenu();
  });

  menuOverlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();

/* =========================
   UI ENHANCEMENTS (FUTURO SAAS READY)
   ========================= */

(function () {
  // efeito leve de clique nos cards (feedback visual)
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("touchstart", () => {
      card.style.transform = "scale(0.99)";
    });

    card.addEventListener("touchend", () => {
      card.style.transform = "scale(1)";
    });
  });
})();

/* =========================
   AUTO SYSTEM CHECK
   ========================= */

console.log("%cN74 TEC SYSTEM LOADED", "color:#00ff41; font-size:14px; font-weight:bold;");

// 2. Diminuir partículas no celular
const isMobile = window.innerWidth < 768;
const drops = isMobile ? 50 : 100; // metade das colunas no mobile

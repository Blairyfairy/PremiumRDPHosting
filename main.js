document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll(".hero-slide");
  const hero = document.querySelector(".hero");

  let current = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let autoTimer;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function startAuto() {
    autoTimer = setInterval(nextSlide, 6500);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  /* ========== TOUCH EVENTS ========== */
  hero.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAuto();
  }, { passive: false });

  hero.addEventListener("touchmove", e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: false });

  hero.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    handleSwipe();
    startAuto();
  });

  /* ========== MOUSE EVENTS ========== */
  hero.addEventListener("mousedown", e => {
    startX = e.clientX;
    isDragging = true;
    stopAuto();
  });

  hero.addEventListener("mousemove", e => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    handleSwipe();
    startAuto();
  });

  /* ========== SWIPE DECISION ========== */
  function handleSwipe() {
    const distance = startX - currentX;
    const threshold = 60;

    if (Math.abs(distance) < threshold) return;

    distance > 0 ? nextSlide() : prevSlide();
  }

  showSlide(current);
  startAuto();

  /* ================= TESTIMONIAL SLIDER ================= */
  const testimonials = document.querySelectorAll(".testimonial");
  let t = 0;

  setInterval(() => {
    testimonials[t].classList.remove("active");
    t = (t + 1) % testimonials.length;
    testimonials[t].classList.add("active");
  }, 6500);

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }

  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
    toggle.textContent = dark ? "☀️" : "🌙";
  };

});

/* ================= FORCE FOOTER NAVY BACKGROUND ================= */
const forceFooterBlue = () => {
  const footer = document.querySelector("footer");
  if (!footer) return;

  // Force the main footer background
  footer.style.setProperty("background-color", "#061a3a", "important");
  footer.style.setProperty("color", "#cbd5e1", "important");

  // Force all children
  footer.querySelectorAll("*").forEach(el => {
    el.style.setProperty("background-color", "inherit", "important");
    el.style.setProperty("color", "inherit", "important");
  });

  // Footer highlights specific
  const highlights = footer.querySelectorAll(".footer-highlights, .footer-highlights ul, .footer-highlights li");
  highlights.forEach(el => {
    el.style.setProperty("background", "rgba(255,255,255,0.06)", "important");
    el.style.setProperty("color", "#e6edff", "important");
  });

  // Footer links
  const links = footer.querySelectorAll("a, a *");
  links.forEach(a => {
    a.style.setProperty("color", "#9fb9ff", "important");
  });

  // Footer legal strip
  const legal = footer.querySelector(".footer-legal");
  if (legal) {
    legal.style.setProperty("background-color", "#061a3a", "important");
    legal.style.setProperty("color", "#9fb9ff", "important");
  }
};

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  forceFooterBlue();
});



document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".hero-slide");
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove("active");
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
  }, 9000);

  const testimonials = document.querySelectorAll(".testimonial");
  let t = 0;
  setInterval(() => {
    testimonials[t].classList.remove("active");
    t = (t + 1) % testimonials.length;
    testimonials[t].classList.add("active");
  }, 6000);

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

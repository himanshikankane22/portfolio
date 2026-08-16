document.addEventListener("DOMContentLoaded", () => {

  /* ---- Hamburger ---- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("open");
  });

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
    });
  });

  /* ---- Rotating Text ---- */
  const words = ["Himanshi Kankane", "a Junior Endpoint Support Analyst", "an ECE Engineer", "a Problem Solver"];
  const el = document.getElementById("rotating-text");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function typeEffect() {
    const current = words[wordIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
      delay = 60;
    } else {
      el.textContent = current.substring(0, charIndex++);
      delay = 120;
    }

    if (!isDeleting && charIndex === current.length + 1) {
      delay = 1800;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  /* ---- Counter Animation ---- */
  const stats = document.querySelectorAll(".stats__num");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.dataset.target;
          let current = 0;
          const step = Math.ceil(target / 50);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target + "+";
              clearInterval(timer);
            } else {
              el.textContent = current;
            }
          }, 30);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((s) => observer.observe(s));

  /* ---- Form ---- */
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn");
    btn.textContent = "Sent!";
    btn.style.pointerEvents = "none";
    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.style.pointerEvents = "";
      form.reset();
    }, 2500);
  });
});
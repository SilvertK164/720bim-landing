// Minimal cursor — universal dot with mix-blend-mode: exclusion
// Works on any background without detection logic
if (window.matchMedia("(pointer: fine)").matches) {
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow
  function animate() {
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    dot.style.left = `${dotX - 5}px`;
    dot.style.top = `${dotY - 5}px`;
    requestAnimationFrame(animate);
  }
  animate();

  // Grow on interactive elements
  const interactives = 'a, button, .tech-card, .service-card, .swiper-slide, input, textarea';
  document.querySelectorAll(interactives).forEach((el) => {
    el.addEventListener("mouseenter", () => dot.classList.add("cursor-dot-hover"));
    el.addEventListener("mouseleave", () => dot.classList.remove("cursor-dot-hover"));
  });

  document.addEventListener("mouseleave", () => dot.style.opacity = "0");
  document.addEventListener("mouseenter", () => dot.style.opacity = "1");
}

// Premium cursor follower effect — fast & responsive
// Only on desktop (no touch devices)
if (window.matchMedia("(pointer: fine)").matches) {
  const cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector(".cursor-dot") as HTMLElement;
  const ring = cursor.querySelector(".cursor-ring") as HTMLElement;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  // Dot follows instantly via CSS translate
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot is instant — no lerp
    dot.style.left = `${mouseX - 4}px`;
    dot.style.top = `${mouseY - 4}px`;
  });

  // Ring follows with slight elastic delay (0.25 = fast, 0.12 = slow)
  const LERP_SPEED = 0.25;
  function animateRing() {
    ringX += (mouseX - ringX) * LERP_SPEED;
    ringY += (mouseY - ringY) * LERP_SPEED;
    ring.style.left = `${ringX - 20}px`;
    ring.style.top = `${ringY - 20}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects on interactive elements
  const interactiveSelectors = 'a, button, [data-cursor="pointer"], .swiper-slide, .tech-card, .service-card, input, textarea';

  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.classList.add("cursor-hover");
      dot.classList.add("cursor-dot-hover");
    });
    el.addEventListener("mouseleave", () => {
      ring.classList.remove("cursor-hover");
      dot.classList.remove("cursor-dot-hover");
    });
  });

  // Text hover — cursor becomes blend mode circle
  document.querySelectorAll("h1, h2, .hero-title").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.classList.add("cursor-text");
    });
    el.addEventListener("mouseleave", () => {
      ring.classList.remove("cursor-text");
    });
  });

  // Hide on mouse leave window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
}

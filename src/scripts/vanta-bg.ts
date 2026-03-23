// Minimal particles background for CTA section
function initParticles() {
  const el = document.getElementById("vanta-cta");
  if (!el || el.querySelector("canvas")) return;

  import("@tsparticles/slim").then(async ({ loadSlim }) => {
    const { tsParticles } = await import("@tsparticles/engine");
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "cta-particles",
      element: el,
      options: {
        fullScreen: false,
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, width: 800, height: 500 } },
          color: { value: "#6366f1" },
          opacity: { value: { min: 0.1, max: 0.4 } },
          size: { value: { min: 1, max: 3 } },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none" as const,
            outModes: "out" as const,
          },
          links: {
            enable: true,
            distance: 140,
            color: "#6366f1",
            opacity: 0.08,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.2 } },
          },
        },
        detectRetina: true,
      },
    });
  }).catch((err) => {
    console.log("Particles fallback:", err.message);
  });
}

const ctaEl = document.getElementById("vanta-cta");
if (ctaEl) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initParticles();
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "200px" }
  );
  observer.observe(ctaEl);
}
